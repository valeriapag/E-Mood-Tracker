/*
    Script file for all logout attempts made by the user
    Function to delete cookie and alert to server
 */

function jsLogout (url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            swal.fire({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 2000,
                type: 'success',
                title: 'Erfolgreich ausgeloggt!'
            });
        };
    };
    xhr.open("GET", url,true);
    //  Set timeout duration
    xhr.timeout = 5000;
    //  Define function on timeout -> Show popup "Keine Verbindung"
    xhr.ontimeout = function () {
        Swal.fire({
            title: 'Keine Verbindung!',
            type: 'error',
            backdrop: 'true',
            confirmButtonText: 'Ok'
        });
        $("#load").removeAttr('disabled').html('Login');
    };
    xhr.send(data);
}

$(function () {
    //  On click: start logout procedure
    $('#logout').click(function(){
        var $this = $(this);
        //  Change to loading icon and disable button
        $this.attr('disabled', 'disabled').html("<span " +
            "class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\"></span>");
        //  Send logout info to server
        //  server url /logout
        var url = "https://httpbin.org/get";
        jsLogout(url);
    });
    $('#').click(function(){
        var $this = $(this);
        //  Change to loading icon and disable button
        $this.attr('disabled', 'disabled').html("<span " +
            "class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\"></span>");
        //  Send logout info to server
        //  server url /logout
        var url = "https://httpbin.org/get";
        jsLogout(url);
    });
});