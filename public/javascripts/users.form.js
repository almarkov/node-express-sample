$(document).on('click', '.save', function(e){
    e.preventDefault()
    var id = $('#inp_id').val()
    if (id) {
        $.post(`/api/users/${id}`, {
            login:      $('#inp_login').val(),
            last_name:  $('#inp_last_name').val(),
            first_name: $('#inp_first_name').val()
        })
        .done(function(data) {
            if (data.success) {
                document.location = '/users'
            }
            else {
                alert(data.error)
            }
        })
        .fail(function() {
        })
        .always(function() {
        })
    }
    else {
        $.post('/api/users/create', {
            login:      $('#inp_login').val(),
            last_name:  $('#inp_last_name').val(),
            first_name: $('#inp_first_name').val()
        })
        .done(function(data) {
            if (data.success) {
                document.location = '/users'
            }
            else {
                alert(data.error)
            }
        })
        .fail(function() {
        })
        .always(function() {
        })
    }
})

$(document).ready(function(){
    var id = $('#inp_id').val()
    $.getJSON( `/api/users/${id}`, function( data ) {
        $('#inp_login').val(data.login),
        $('#inp_last_name').val(data.last_name),
        $('#inp_first_name').val(data.first_name)
    })
})
  