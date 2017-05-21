function populateUsersTable() {
    var html = ''
    $.getJSON( '/api/users', function( data ) {
        data.map((datum) =>{
            html += `<tr><td>${datum.login}</td><td>${datum.last_name}</td><td>${datum.first_name}</td></tr>`
        })
        $('#users tbody').append(html)
    })
}

$(document).ready(function() {
    populateUsersTable()
})