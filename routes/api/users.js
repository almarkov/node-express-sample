var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    req.db.any(`
SELECT
    *
FROM
    users
ORDER BY
    users.last_name DESC
    `)
    .then(function(data) {
        res.json(data)
    })
    .catch(function(error) {
    })
})

module.exports = router
