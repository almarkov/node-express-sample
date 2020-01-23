var pgp      = require('pg-promise')(/*options*/)

exports.db

exports.init = function() {

    exports.db = pgp('postgres://sample:sample_password@localhost:5432/sample')
    
    return exports.db

}
