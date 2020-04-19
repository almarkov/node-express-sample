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

db.query(`CREATE TABLE IF NOT EXISTS users (
    id                     SERIAL PRIMARY KEY,
    login                  VARCHAR(1024) NOT NULL,
    last_name              TEXT,
    first_name             TEXT,
    password               VARCHAR(1024) NOT NULL,
    status                 INT DEFAULT 1
)`)
.then(() => {

db.query(`INSERT INTO users (id, login, last_name, first_name, password, status)
        VALUES (1, 'test', 'test', 'test', '098f6bcd4621d373cade4e832627b4f6', 1)
        ON CONFLICT DO NOTHING
`)
.then(() => {

db.query(`CREATE TABLE IF NOT EXISTS  articles (
    id                     SERIAL PRIMARY KEY,
    title                  TEXT,
    text                   TEXT,
    author_id              BIGINT REFERENCES users(id),
    created_at             TIMESTAMP NOT NULL DEFAULT NOW(),
    modified_at            TIMESTAMP NOT NULL DEFAULT NOW()
)`)
.then(() => {

    console.log('done, press Ctrl-C')

})
})
})
