var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {

    req.db.any( req.sql.users.all )
    .then( data => {
        res.json(data)
    })
    .catch( error => {
        console.log(error)
        log.error(`route ${req.originalUrl}, db query error: ${error}`)
        res.json({ error: error })
    })

})

router.post('/create', function(req, res, next) {

    req.db.any(
        req.sql.users.create,
        req.body
    )
    .then( data => {
        console.log(data)
        res.json({ success: 1 })
    })
    .catch( error => {
        console.log(error)
        log.error(`route ${req.originalUrl}, db query error: ${error}`)
        res.json({ error: error })
    })

})

router.post('/:id', function(req, res, next) {

    req.db.any(
        req.sql.users.update,
        Object.assign( {}, req.body, req.params )
    )
    .then( data => {
        res.json({ success: 1 })
    })
    .catch( error => {
        console.log(error)
        log.error(`route ${req.originalUrl}, db query error: ${error}`)
        res.json({ error: error })
    })

})

router.get('/:id', function(req, res, next) {

    req.db.oneOrNone(
        req.sql.users.find,
        req.params
    )
    .then( user => {
        res.json( user )
    })
    .catch( error => {
        console.log(error)
        log.error(`route ${req.originalUrl}, db query error: ${error}`)
        res.json({ error: error })
    })

})

router.post('/:id/delete', function(req, res, next) {

    req.db.any(
        req.sql.users.delete,
        req.params
    )
    .then( data => {
        res.json({ success: 1 })
    })
    .catch( error => {
        console.log(error)
        log.error(`route ${req.originalUrl}, db query error: ${error}`)
        res.json({ error: error })
    })

})


module.exports = router
