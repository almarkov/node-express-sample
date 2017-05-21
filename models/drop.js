var options = {
};

var pgp = require('pg-promise')(options);
var cn = {
    host: 'localhost', 
    port: 5432,
    database: 'pi',
    user: 'pi',
    password: 'raspberry'
};

var db = pgp(cn);


db.query('DROP TABLE IF EXISTS users')
.then(() => {
    db.query('DROP TABLE IF EXISTS events')
    .then(() => {
        db.query('DROP TABLE IF EXISTS event_types')
        .then(() => {
            db.query('DROP TABLE IF EXISTS batches')
            .then(() => {
                console.log('done, press Ctrl-C')
            });
        });
    })
});

