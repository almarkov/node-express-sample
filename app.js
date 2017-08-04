var express           = require('express')
var path              = require('path')
var favicon           = require('serve-favicon')
var logger            = require('morgan')
var session           = require('express-session')
var cookieParser      = require('cookie-parser')
var bodyParser        = require('body-parser')
var FileStreamRotator = require('file-stream-rotator')
var fs                = require('fs')
var monk              = require('monk')

var index        = require('./routes/index')
var api          = require('./routes/api')
var users        = require('./routes/users')
var social_users = require('./routes/social_users')


var app       = express()
var server    = require('http').Server(app)
var expressWs = require('express-ws')(app, server)

// TODO: log для мультипроцессной версии
var log = require("./log.js")
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


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// app.use(logger('dev'))
app.use(bodyParser.json(/* {limit: '50mb'} */))
app.use(bodyParser.urlencoded({ extended: false }/* {limit: '50mb', extended: true}*/))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


var psql    = require('./psql.js').init()
var sql     = require('./sql.js')
var mongodb = monk('localhost:27017/sample')

app.use(function(req,res,next){
    req.sql     = sql
    req.db      = psql
    req.mongodb = mongodb
    next()
})


app.use('/', index)
app.use('/users', users)
app.use('/social_users', social_users)


app.use('/api', api)
var api_users = require('./routes/api/users')
api.use('/users', api_users)
var api_social_users = require('./routes/api/social_users')
api.use('/social_users', api_social_users)


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
