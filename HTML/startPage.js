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
    //  On successful request -> popup
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            swal.fire({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 2000,
                type: 'success',
                title: 'Erfolgreich gesendet!'
            });
            var patArr = JSON.parse(xhr.responseText);
            return patArr;
        }
    };
    xhr.open("GET", url,true);
    xhr.setRequestHeader("Content-type", "application/json");
    //  Set timeout duration
    xhr.timeout = 5000;
    //  Define function on timeout -> Show popup "Keine Verbindung"

    xhr.ontimeout = function () {
        swal.fire({
            title: 'Keine Verbindung!',
            type: 'error',
            backdrop: 'true',
            confirmButtonText: 'Ok'
        });
    };

    xhr.send(data);
}

/*
    Calls POST function if button clicked, changes to loading icon and back
 */
$(function(){
    var url = "";
    var patArr = jsGetPatients(url);
    patArr.forEach(function(item) {
        $("#notes").append('<p class="text-center" id="notes">' + item["fname"] + " " + item["name"] + " " +
            item["patientId"] + '</p>');
    });
});
