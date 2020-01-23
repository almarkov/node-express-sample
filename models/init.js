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
    last_name              TEXT,
    first_name             TEXT,
    password               VARCHAR(1024) NOT NULL,
    status                 INT DEFAULT 1
)`)
.then(() => {

    db.query(`INSERT INTO users (login, last_name, first_name, password, status)
            VALUES ('test', 'test', 'test', '098f6bcd4621d373cade4e832627b4f6', 1 )
    )`)
    .then(() => {

        console.log('done, press Ctrl-C')

    })


})
