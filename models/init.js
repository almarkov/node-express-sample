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

db.query(`CREATE TABLE users (
    id                     SERIAL PRIMARY KEY,
    login                  VARCHAR(1024) NOT NULL,
    last_name              VARCHAR(1024) DEFAULT '',
    first_name             VARCHAR(1024) DEFAULT '',
    status                 INT DEFAULT 1
)`)
.then(() => {

    console.log('done, press Ctrl-C')

})
