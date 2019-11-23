var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' })
})

router.get( '/login', (req, res, next) => {

    var user = req.session.user || {}

    res.render( 'login', {
        title: 'Login',
    })

})

module.exports = router
