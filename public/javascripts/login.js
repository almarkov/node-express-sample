$( function() {
    var dialog, form,

    login = $( "#login" ),
    password = $( "#password" ),
    allFields = $( [] ).add( login ).add( password ),
    tips = $( ".validateTips" );

    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
            updateTips( "Length of " + n + " must be between " +
                min + " and " + max + "." );
                return false;
        } else {
            return true;
        }
    }

    function checkRegexp( o, regexp, n ) {
        if ( !( regexp.test( o.val() ) ) ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }

    function login_submit() {
        var valid = true;
        allFields.removeClass( "ui-state-error" );

        valid = valid && checkLength( login, "login", 3, 36 );
        valid = valid && checkLength( password, "password", 4, 36 );

        valid = valid && checkRegexp( login, /^[a-z]([0-9a-z_\s\-])+$/i, "Login may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
        valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );

        if ( valid ) {
            var login_data = {
                login:    login.val(),
                password: password.val(),
            }

            $.ajax({
                type: 'POST',
                data: login_data,
                url: '/auth/login',
                dataType: 'JSON'
            }).done(function( response ) {

                if (response.msg === '') {
                    window.location = "/cms";
                }
                else {
                    login.addClass( 'ui-state-error' )
                    password.addClass( 'ui-state-error' )
                    updateTips( "Wrong login or password" );
                }
            });
        }
        return valid;
    }

    dialog = $( "#dialog-login-form" ).dialog({
        autoOpen: true,
        height: 230,
        width: 350,
        modal: false,
        buttons: {
            "Sign in": login_submit,
        },
        closeOnEscape: false,
        draggable: false,
        dialogClass: 'no-close',
        resizable: false
    });

    form = dialog.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        login_submit();
    });

    $( '#Login').on( "click", function(e) {
        e.preventDefault()
        dialog.dialog( "open" );
    });
});
