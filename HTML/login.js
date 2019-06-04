/*
    Login script (JS)
    --
    Contains function to get inputs for username and password, then checks against saved password Hash and connected
    username by sending to server. It then waits for server response:
    1. On login button click -> set to loading icon (spinner)
    2. username and pw found -> server redirects to start page, small popup 'Erfolgreich eingeloggt!'
    3. not found -> output error message "Falsches Passwort" as popup, reset button
    4. no connection -> output error message "Keine Verbindung" as popup, reset button
    --
 */

/*
    Function for http POST request to server
 */
function jsPost(postUrl, data) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 401) {
            Swal.fire({
                title: 'Falsches Passwort!',
                type: 'error',
                backdrop: 'true',
                confirmButtonText: 'Ok'
            });
            $("#load").removeAttr('disabled').html('Login');
        }
        else if (this.readyState == 4 && this.status == 200) {
            swal.fire({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 2000,
                type: 'success',
                title: 'Erfolgreich eingeloggt!'
            });
            document.write(xhr.responseText);
        }
    };
    xhr.open("POST", postUrl,true);
    xhr.setRequestHeader("Content-type", "application/json");
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

/*
    Calls POST function if button clicked, changes to loading icon and back
 */
$(function(){
    //  Get button element
    var $btn = $('#load');
    //  On click: start authentication
    $btn.click(function(){
        var $this = $(this);
        //  Change to loading icon and disable button
        $this.attr('disabled', 'disabled').html("<span " +
            "class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\"></span>");
        //  Get user and password inputs
        var usr = $("#usr").val();
        var pw = $("#pw").val();
        //  server url
        var url = "https://httpbin.org/post";
        var req = JSON.stringify({
            user: usr,
            password: pw
        });
        jsPost(url, req);
    });
});