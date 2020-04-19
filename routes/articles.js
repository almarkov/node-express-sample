var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    res.render('articles/list', { title: 'Articles' })
})

router.get('/:id', function(req, res, next) {
    res.render('articles/form', { title: 'Edit Article', id: req.params.id })
})

module.exports = router
