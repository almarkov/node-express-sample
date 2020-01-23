var express           = require('express')
var path              = require('path')
var favicon           = require('serve-favicon')
var logger            = require('morgan')
var session           = require('express-session')
    , pgSession       = require('connect-pg-simple')(session)
var cookieParser      = require('cookie-parser')
var bodyParser        = require('body-parser')
var FileStreamRotator = require('file-stream-rotator')
var fs                = require('fs')
var monk              = require('monk')
var fileUpload        = require('express-fileupload')
var Pool              = require('pg-pool')

var index        = require('./routes/index')
var api          = require('./routes/api')
var cms          = require('./routes/cms')
var auth         = require('./routes/auth')
var users        = require('./routes/users')
var social_users = require('./routes/social_users')

var app       = express()
var server    = require('http').Server(app)
var expressWs = require('express-ws')(app, server)

// TODO: log для мультипроцессной версии
var log = require('./log.js')
log.reset()


var logDirectory = path.join(__dirname, 'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})
app.use(logger('combined', {stream: accessLogStream}))


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


var pool = new Pool({
    database: 'sample',
    user: 'sample',
    password: 'sample_password',
    port: 5432,
    // ssl: true,
    max: 20, // set pool max size to 20
    min: 4, // set min pool size to 4
    idleTimeoutMillis: 1000, // close idle clients after 1 second
    connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
})

var psql    = require('./psql.js').init()
var sql     = require('./sql.js')
var mongodb = monk('localhost:27017/sample')

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// app.use(logger('dev'))
app.use(bodyParser.json(/* {limit: '50mb'} */))
app.use(bodyParser.urlencoded({ extended: false }/* {limit: '50mb', extended: true}*/))
app.use(cookieParser())
app.use(session({
    // store: new pgSession({
    //     // pool : pgPool,                // Connection pool
    //     pgPromise: psql.db,
    //     tableName : 'user_sessions'   // Use another table-name than the default "session" one
    // }),
    secret: process.env.FOO_COOKIE_SECRET || 'puzdosia',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(fileUpload())




app.use(function(req,res,next){
    req.sql     = sql
    req.db      = psql
    req.mongodb = mongodb
    next()
})



app.use('/', index)
app.use('/users', users)
app.use('/social_users', social_users)


// auth
app.all('/cms',function(req,res,next){

    if ( req.url === '/auth/login' || req.url === '/login') {
        next()
        return
    }

    if ( req.session.user ) {
        // req.session.touch()
        next()
    } else {
        res.redirect('/login')
    }

})

app.use('/cms', cms)

app.use('/api', api)
var api_users = require('./routes/api/users')
api.use('/users', api_users)
var api_social_users = require('./routes/api/social_users')
api.use('/social_users', api_social_users)

app.use('/auth', auth)

app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})


app.use(function(err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.render('error')
})


module.exports = { app: app, server: server }
