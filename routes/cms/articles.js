var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    res.render('cms/articles/list', { title: 'Articles' })
})

router.get('/create', function(req, res, next) {
    res.render('cms/articles/form', { title: 'Create Article' })
})

router.get('/:id', function(req, res, next) {
    res.render('cms/articles/form', { title: 'Edit Article', id: req.params.id })
})

module.exports = router
