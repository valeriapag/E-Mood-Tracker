/*
    Logout script (JS)
    --
    For all logout attempts made by the user and for redirecting to login page after logout
    Function to alert the server which then deletes user´s cookies
 */
function jsLogout (url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url,true);
    //  Set timeout duration
    xhr.timeout = 3000;
    //  On successful request -> popup
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
        }
    };
    //  Define function on timeout -> Show popup "Keine Verbindung"
    xhr.ontimeout = function () {
        swal.fire({
            title: 'Keine Verbindung!',
            type: 'error',
            backdrop: 'true',
            confirmButtonText: 'Ok'
        });
        $("#logoutSearch").removeAttr('disabled');
        $("#logoutDiag").removeAttr('disabled');
        $("#logoutStart").removeAttr('disabled');
        $("#login").removeAttr('disabled').html('Login');
        $("#logoutLayout").removeAttr('disabled');
        $("#patientLogout").removeAttr('disabled').html('Login');
    };
    xhr.send();
}

$(function () {
    //  On click: start logout procedure
    $('#logoutDiag').click(function(){
        var $this = $(this);
        //  Change to loading icon and disable button
        $this.attr('disabled', 'disabled').html("<span " +
            "class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\"></span>");
        //  Send logout info to server
        //  server url /logout
        var url = "https://httpbin.org/get";
        jsLogout(url);
    });
    //  On click: redirect to login page
    $('#login').click(function(){
        var $this = $(this);
        //  Change to loading icon and disable button
        $this.attr('disabled', 'disabled').html("<span " +
            "class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\"></span>");
        // server url
        //var url = "http://www.google.com:81/";
        var url = "https://httpbin.org/get";
        //  Redirect to login page if connection successful
        jsLogout(url);
    });
    //  On click (Dropdown menu): start logout procedure
    $("#logoutStart").click(function(){
        //  Disable dropdown button
        $("#logoutDrop").attr('disabled', 'disabled');
        //  Send logout info to server
        //  server url
        var url = "https://httpbin.org/get";
        jsLogout(url);
    });
    //  On click (Dropdown menu): start logout procedure
    $("#logoutLayout").click(function(){
        //  Disable dropdown button
        $("#diagLogout").attr('disabled', 'disabled');
        //  Send logout info to server
        //  server url
        var url = "https://httpbin.org/get";
        jsLogout(url);
    });
    //  On click (Dropdown menu): start logout procedure
    $("#logoutSearch").click(function(){
        //  Disable dropdown button
        $("#searchLogout").attr('disabled', 'disabled');
        //  Send logout info to server
        //  server url
        var url = "https://httpbin.org/get";
        jsLogout(url);
    });
    $("#patientLogout").click(function(){
        //  Disable button and show spinner
        $("#patientLogout").attr('disabled', 'disabled').html("<span " +
            "class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\"></span>");
        //  Send logout info to server
        //  server url
        var url = "https://httpbin.org/get";
        jsLogout(url);
    });
});