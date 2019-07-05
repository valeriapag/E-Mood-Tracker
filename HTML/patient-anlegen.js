/*
    Logout script (JS)
    --
    For all logout attempts made by the user and for redirecting to login page after logout
    Function to alert the server which then deletes user´s cookies
 */
function jsCancel (url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url,true);

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


            document.write(xhr.responseText);
        }
    };
    //  Set timeout duration
    xhr.timeout = 3000;
    //  Define function on timeout -> Show popup "Keine Verbindung"
    xhr.ontimeout = function () {
        /*
        swal.fire({
            title: 'Keine Verbindung!',
            type: 'error',
            backdrop: 'true',
            confirmButtonText: 'Ok'
        });

         */
        $("#cancel").removeAttr('disabled').html('Abbrechen');
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
        if (this.readyState === 4 && this.status === 200) {
            /*
            swal.fire({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 2000,
                type: 'success',
                title: 'Erfolgreich ausgeloggt!'
            });

             */
            document.write(xhr.responseText);
        }
        if (this.readyState === 4 && this.status === 500) {
            /*
            swal.fire({
                title: 'Interner Datenbankfehler!',
                type: 'error',
                backdrop: 'true',
                confirmButtonText: 'Ok'
            });

             */
        }
    };
    //  Define function on timeout -> Show popup "Keine Verbindung"
    xhr.ontimeout = function () {
        /*
        swal.fire({
            title: 'Keine Verbindung!',
            type: 'error',
            backdrop: 'true',
            confirmButtonText: 'Ok'
        });

         */
        $("#genUser").removeAttr('disabled').html('Generiere Benutzer');
    };
    xhr.send(data);
}


$(function () {
//  On click: start logout procedure
    $('#cancel').click(function () {
        var $this = $(this);
        //  Change to loading icon and disable button
        $this.attr('disabled', 'disabled').html("<span " +
            "class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\"></span>");
        //  Send logout info to server
        //  server url /logout
        //var url = "https://httpbin.org/get";
        var url = "https://localhost:8080/cancel";
        jsCancel(url);
    });
    $("#genUser").click(function () {
        var $this = $(this);
        //  Change to loading icon and disable button
        $this.attr('disabled', 'disabled').html("<span " +
            "class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\"></span>");
        //  Get patient data input
        var map = {};
        $(".form-control").each(function () {
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
        //var url = "https://httpbin.org/post";
        var url = "https://localhost:8080/toPatientCreate";
        var reqJson = JSON.stringify(map);

        jsCreate(url, reqJson);
    });
});