/*
    Patient list script (JS)
    --
    Contains function to get patient data from server (as requested from user)
    --
 */

/*
    Function for http POST request to server
 */
/*
function jsSearch(postUrl, data) {
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
            document.write(xhr.responseText);
        }
    };
    xhr.open("POST", postUrl,true);
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
        $("#search").removeAttr('disabled').html('suchen');
    };

    xhr.send(data);
}

$(function() {

    var link = "#";
    var fname = "Dave";
    var lname = "Mueller";
    var bDate = "19.04.1966";
    for (var i = 0; i < 8; i++) {
        $("#listBody").append('<li><a href="' + link + '" class="year"><span class="fname">' + fname + ' </span>' +
            '<span class="lname">' + lname + ' </span>' +
            '<span class="year">' + bDate + '</span>' +
            '</a></li>');
    }

}); */