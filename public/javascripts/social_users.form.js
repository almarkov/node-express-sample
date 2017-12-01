$(document).on('click', '.save', function(e){
    e.preventDefault()
    var id = $('#inp_id').val()
    if (id) {
        $.post(`/api/social_users/${id}`, {
            login:      $('#inp_login').val(),
            last_name:  $('#inp_last_name').val(),
            first_name: $('#inp_first_name').val()
        })
        .done(function(data) {
            if (data.success) {
                document.location = '/social_users'
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
        $.post('/api/social_users/create', {
            login:      $('#inp_login').val(),
            last_name:  $('#inp_last_name').val(),
            first_name: $('#inp_first_name').val()
        })
        .done(function(data) {
            if (data.success) {
                document.location = '/social_users'
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
    $.getJSON( `/api/social_users/${id}`, function( data ) {
        $('#inp_login').val(data.login),
        $('#inp_last_name').val(data.last_name),
        $('#inp_first_name').val(data.first_name)
    })
})

$(document).on('change', '#inp_photo', function() {

    var data = new FormData();
    data.append( 'photo', $('#inp_photo')[0].files[0] )

    $.ajax({
        url: '/api/social_users/photo',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data){
            if ( data.success ) {
                $( '#uploaded_photo').attr('src', data.path )
                $( "#draggable3" ).draggable({ containment: "#drag_target", scroll: false })
            }
        }
    });
})
