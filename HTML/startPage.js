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
async function jsGetPatients(url) {
    var xhr = new XMLHttpRequest();
    //  On successful request -> popup
    xhr.onreadystatechange = async function() {
        if (this.readyState === 4 && this.status === 200) {
            swal.fire({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 2000,
                type: 'success',
                title: "Liste erfolgreich geladen"
            });
            var patArr = await JSON.parse(xhr.responseText);
            await patArr.forEach(function(item) {
                $("#notes").append('<p class="text-center">' + item["Vorname"] + " " + item["Nachname"] + " " +
                    item["Notiz"] + '</p>');
            });
        }
        else if (this.readyState === 4 && this.status === 401) {
            document.write(xhr.responseText);
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

    xhr.send();
}


    var url = "https://localhost:8080/getPats";
    jsGetPatients(url);



