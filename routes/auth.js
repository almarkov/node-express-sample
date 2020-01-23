const express = require('express')
const router = express.Router()

const md5    = require('md5')
const crypto = require('crypto')

router.post('/login', function(req, res) {

    let login    = req.body.login
    let password = req.body.password

    let db = req.db;
    let sql = req.sql

    db.oneOrNone(sql.users.find_by_login, {login:login})
    .then(user => {
        if ( user && ( user.password == md5( password ) ) ) {
            req.session.user = user
            res.send({ msg: '' })
            return;
        }
        res.send({ msg: 'Wrong login/password' })
    });
    
});


router.get('/logout', function(req, res) {

    req.session.destroy(() => {

        res.send({ msg: '' })

    })

})


module.exports = router