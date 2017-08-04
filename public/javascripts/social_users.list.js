function populateUsersTable() {
    var html = ''
    $.getJSON( '/api/social_users', function( data ) {
        data.map((datum) =>{
            html += `
            <tr>
                <td>${datum.login}</td>
                <td>${datum.last_name}</td>
                <td>${datum.first_name}</td>
                <td><a href='/social_users/${datum._id}'>Изменить</a></td>
                <td><a href='' data-id='${datum._id}' class='remove'>Удалить</a></td>
            </tr>
            `
        })
        $('#users tbody').append(html)
    })
}

$(document).on('click', '.remove', function(){
    var id = $(this).data('id')
    $.post(`/api/social_users/${id}/delete`, {
    })
    .done(function(data) {
        if (data.success) {
            populateUsersTable()
        }
        else {
            alert(data.error)
        }
    })
    .fail(function() {
    })
    .always(function() {
    })
})

$(document).ready(function() {
    populateUsersTable()
})