var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    res.render('users/list', { title: 'Users' })
})

router.get('/create', function(req, res, next) {
    res.render('users/form', { title: 'Create User' })
})

router.get('/:id', function(req, res, next) {
    res.render('users/form', { title: 'Edit User', id: req.params.id })
})

// router.post('/:id', function(req, res, next) {
//     res.render('users/form', { title: 'Edit User', id: req.params.id })
// })


module.exports = router
