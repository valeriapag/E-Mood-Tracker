/*
    Logout script (JS)
    --
    For all logout attempts made by the user and for redirecting to login page after logout
    Function to alert the server which then deletes user´s cookies
 */
function jsCancel (url) {
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
        $("#cancel").removeAttr('disabled').html('Login');
        $("#login").removeAttr('disabled').html('Login');
    };
    xhr.send();
}

function jsCreate (url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url,true);
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
        $("#cancel").removeAttr('disabled').html('Login');
        $("#login").removeAttr('disabled').html('Login');
    };
    xhr.send(data);
}


$(function () {
    //  On click: start logout procedure
    $('#cancel').click(function(){
        var $this = $(this);
        //  Change to loading icon and disable button
        $this.attr('disabled', 'disabled').html("<span " +
            "class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\"></span>");
        //  Send logout info to server
        //  server url /logout
        var url = "https://httpbin.org/get";
        jsCancel(url);
    });
    $("#genUser").click(function(){
        var $this = $(this);
        //  Change to loading icon and disable button
        $this.attr('disabled', 'disabled').html("<span " +
            "class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\"></span>");
        //  Get patient data input
        var map = {};
        $(".form-control").each(function() {
            map[$(this).attr("name")] = $(this).val();
        });

        //  Add key/values for gender and medicine
        var meds = $("#dm2 option:selected").val();
        var gender = $("#dm1 option:selected").text();
        map["medicine"] = meds;
        map["gender"] = gender;
        delete map["meds"];
        delete map["gen"];

        //  server url
        var url = "https://httpbin.org/post";
        var reqJson = JSON.stringify(map);

        jsCreate(url, reqJson);
    });
});