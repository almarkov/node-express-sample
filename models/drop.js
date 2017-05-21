var options = {
}

var pgp = require('pg-promise')(options)
var cn = {
    host: 'localhost', 
    port: 5432,
    database: 'sample',
    user: 'sample',
    password: 'sample_password'
}

var db = pgp(cn)

db.query('DROP TABLE IF EXISTS users')
.then(() => {

    console.log('done, press Ctrl-C')

})

