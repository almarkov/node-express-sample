exports.ymd_date = function(date) {
    var dt = date || new Date()
    dt = new Date(dt.getTime() + (dt.getTimezoneOffset() / 60) * -1)
    return dt.getFullYear()
        + '-' + ('0' + (dt.getMonth() + 1)).slice(-2)
        + '-' + ('0' + dt.getDate()).slice(-2)
}

exports.ymd_coh_date = function(date) {
    var dt = date || new Date()
    dt = new Date(dt.getTime() + (dt.getTimezoneOffset() / 60) * -1)
    return dt.getFullYear()
        + ('0' + (dt.getMonth() + 1)).slice(-2)
        + ('0' + dt.getDate()).slice(-2)
}
exports.hms_coh_date = function(date) {
    var dt = date || new Date()
    dt = new Date(dt.getTime() + (dt.getTimezoneOffset() / 60) * -1)
    return ('0' + dt.getHours()).slice(-2)
        + ('0' + dt.getMinutes()).slice(-2)
        + ('0' + dt.getSeconds()).slice(-2)
}

exports.ymdhms_date = function(date) {
    var dt = date || new Date()
    dt = new Date(dt.getTime() + (dt.getTimezoneOffset() / 60) * -1)
    return dt.getFullYear()
        + '-' + ('0' + (dt.getMonth() + 1)).slice(-2)
        + '-' + ('0' + dt.getDate()).slice(-2)
        + ' ' + ('0' + dt.getHours()).slice(-2)
        + ':' + ('0' + dt.getMinutes()).slice(-2)
        + ':' + ('0' + dt.getSeconds()).slice(-2)
        + '.' + ('00' + dt.getMilliseconds()).slice(-3)
}

exports.get_random_int = function(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}