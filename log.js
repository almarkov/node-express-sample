var fs           = require('fs')
var util         = require('util')
var helpers      = require('./helpers.js')

exports.info_log_file  = null
exports.error_log_file = null
exports.log_stdout     = null

exports.log_dir      = 'log/'

exports.reset = function(){
    try {

        if (exports.info_log_file) {
            exports.info_log_file.end()
            exports.error_log_file.end()
        }
        exports.info_log_file  = fs.createWriteStream(__dirname + '/' + exports.log_dir + helpers.ymd_date() + 'info.log', {flags : 'a'})
        exports.error_log_file = fs.createWriteStream(__dirname + '/' + exports.log_dir + helpers.ymd_date() + 'error.log', {flags : 'a'})
        exports.log_stdout     = process.stdout

        var retain_files_cnt = 21
        var log_files = fs.readdirSync(exports.log_dir).map(function(v) { return v.toString() }).sort()
        if (log_files.length > retain_files_cnt) {
            for (var i = 0; i < log_files.length - retain_files_cnt; i++) {
                fs.unlinkSync(exports.log_dir + log_files[i])
            }
        }
        setTimeout(exports.reset, 86400)

    } catch (err) {

    }
}

exports.info = function(d, ...params) {
    try {
        exports.info_log_file.write(helpers.ymdhms_date() + "       " + util.format(d, ...params) + '\r\n')
    }
    catch (e) {
    }
}

exports.error = function(d, ...params) {
    try {
        exports.error_log_file.write(helpers.ymdhms_date() + "       " + util.format(d, ...params) + '\r\n')
    }
    catch (e) {
    }
}
