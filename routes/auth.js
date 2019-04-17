const express = require('express')
const router = express.Router()

const md5    = require('md5')
const crypto = require('crypto')

router.post('/login', function(req, res) {

    var login    = req.body.login
    var password = req.body.password

    // var db = req.db;
    // var users = db.get('users').find({}, {}, function(err, users) {
    //     if (err === null) {

    //         var user = users.find( user => {
    //             return user.login == login
    //         })

    //         if ( user && ( user.pass_hash == md5( password ) ) ) {
    //             req.session.user = user
    //             res.json({ msg: ''})
    //             return;
    //         }

    //         res.json({ msg: 'Wrong login/password' })
    //     }
    // })

    if ( login != 'admin' && login != 'user' ) {
        res.send({ msg: 'Wrong login/password' })
        return
    }

    req.session.user = {
        login: req.body.login,
        role: login,
    }
    res.send({ msg: '' })

});


router.get('/logout', function(req, res) {

    req.session.destroy(() => {

        res.send({ msg: '' })

    })

})


module.exports = router