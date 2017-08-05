var express = require('express')
var router = express.Router()

var log    = require('../../log.js')

router.get('/', function(req, res, next) {

    req.mongodb.get('social_users').find({}, {}, (err, social_users) => {
        if (err === null) {
            res.json( social_users )
        }
        else {
            res.json({ success: 0, error: err })
        }
    })

})

router.post('/create', function(req, res, next) {

    req.mongodb.get('social_users').insert(req.body, {}, (err, social_user) => {
        if (err === null) {
            res.json({ success: 1 })
        }
        else {
            console.log(err)
            log.error(`route ${req.originalUrl}, db query error: ${error}`)
            res.json({ success: 0, error: err })
        }
    })

})

router.post('/photo', (req, res, next) => {

    if (!req.files) {
        res.json({ error: 1 })
        return
    }

    var photo = req.files.photo
    var path  = '/images/' + photo.name
    photo.mv(__dirname + '/../../public' + path, function(err) {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.json({ success: 1, path: path })
        }
    })
})

router.post('/:id', function(req, res, next) {

    req.mongodb.get('social_users').findOneAndUpdate({'_id': req.params.id }, {$set: req.body}, {}, (err, social_user) => {
        if ( err === null ) {
            res.json({ success: 1 })
        }
        else {
            console.log(error)
            log.error(`route ${req.originalUrl}, db query error: ${error}`)
            res.json({ error: error })
        }
    })

})

router.get('/:id', function(req, res, next) {

    req.mongodb.get('social_users').findOne({'_id': req.params.id }, {}, (err, social_user) => {
        if (err === null) {
            res.json( social_user )
        }
        else {
            log.error(`route ${req.originalUrl}, db query error: ${error}`)
            res.json({ error: error })
        }
    })

})

router.post('/:id/delete', function(req, res, next) {

    req.mongodb.get('social_users').findOneAndDelete({'_id': req.params.id }, {}, (err, social_user) => {
        if (err === null) {
            res.json({ success: 1 })
        }
        else {
            console.log(error)
            log.error(`route ${req.originalUrl}, db query error: ${error}`)
            res.json({ error: error })
        }
    })

})




module.exports = router
