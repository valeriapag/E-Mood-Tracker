/*
    Start page (JS)
    --
    Contains function to handle patient notes:
    1. Get patients that wrote notes
    2. Create new html elements per patient
    --
 */

/*
    Function for http POST request to server
 */
function jsGetPatients(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url,true);
    xhr.setRequestHeader("Content-type", "application/json");
    //  On successful request -> popup
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /*
            swal.fire({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 2000,
                type: 'success',
                title: "Liste erfolgreich geladen"
            });

             */
            var patArr = JSON.parse(xhr.responseText);
            patArr.forEach(function(item) {
                $("#notes").append('<p class="text-center">' + item["Vorname"] + " " + item["Nachname"] + " " +
                    item["Notiz"] + '</p>');
            });
        }
        else if (this.readyState == 4 && this.status == 401) {
            document.write(xhr.responseText);
        }
    };
    //  Set timeout duration
    xhr.timeout = 5000;
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
    };

    xhr.send();
}

$(function () {
    var url = "https://localhost:8080/getPats";
    jsGetPatients(url);
});