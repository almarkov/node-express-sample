var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    req.db.any(`
SELECT
    *
FROM
    users
WHERE
    status = 1
ORDER BY
    users.last_name DESC
    `)
    .then(function(data) {
        res.json(data)
    })
    .catch(function(error) {
    })
})

router.post('/create', function(req, res, next) {
    req.db.any(`
INSERT INTO users(
    login, last_name, first_name
) VALUES (
    $1,    $2,        $3
)
    `, [ req.body.login, req.body.last_name, req.body.first_name ])
    .then(function(data) {
        res.json({ success: 1 })
    })
    .catch(function(error) {
        res.json({ error: error })
    })
})

router.post('/:id', function(req, res, next) {
    req.db.any( `
UPDATE
    users
SET
    login = $1
    , last_name = $2
    , first_name = $3
WHERE
    id = $4
    `, [ req.body.login, req.body.last_name, req.body.first_name, req.params.id ] )
    .then(function(data) {
        res.json({ success: 1 })
    })
    .catch(function(error) {
        res.json({ error: error })
    })
})

router.get('/:id', function(req, res, next) {
    req.db.oneOrNone( `
SELECT
    *
FROM
    users
WHERE
    id = $1
    `, req.params.id )
    .then(user => {
        res.json(user)
    })
    .catch(function(error) {
        res.json({ error: error })
    })
})

router.post('/:id/delete', function(req, res, next) {
    req.db.any( `UPDATE users SET status = 0 WHERE id = $1`, req.params.id )
    .then(function(data) {
        res.json({ success: 1 })
    })
    .catch(function(error) {
        res.json({ error: error })
    })
})


module.exports = router
