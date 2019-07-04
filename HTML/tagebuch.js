/*
    Patient log script (JS)
    --
    For filling out the patient log and sending it to the server
 */
function jsLog (url, data) {
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
                title: 'Erfolgreich ausgeloggt!'
            });
			document.write(xhr.responseText);

        }
    };
	
	xhr.open("POST", url,true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.timeout = 3000;

    //  Define function on timeout -> Show popup "Keine Verbindung"
    xhr.ontimeout = function () {
        swal.fire({
            title: 'Keine Verbindung!',
            type: 'error',
            backdrop: 'true',
            confirmButtonText: 'Ok'
        });
        $("#save").removeAttr('disabled').html('Login');
        $("#patientLogout").removeAttr('disabled').html('Login');
    };
    xhr.send(data);
}

function jsPatLogout (url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url,true);
    //  Set timeout duration
    xhr.timeout = 5000;
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
        $("#logout").removeAttr('disabled').html('Login');
        $("#logoutDrop").removeAttr('disabled').html('Login');
    };
    xhr.send();
}

$(function (){
    $('#save').click(function(){
        var radioId1 = $('input[name=optradio1]:checked').val();
        var radioId2 = $('input[name=optradio2]:checked').val();
        swal.fire({
            title: radioId1 + radioId2,
            type: 'success',
            backdrop: 'true',
            confirmButtonText: 'Ok'
        });
        $("#save").attr('disabled', 'disabled');
        //  Send logout info to server
        //  server url
        //var url = "https://httpbin.org/get";
		var url = "https://localhost:8080/getSave";
		var jsonreq = JSON.stringify({
            stimmung: radioId1,
            schlafstimmung: radioId2
        });
        jsLog(url, jsonreq);
    });
    $('#patientLogout').click(function(){
        $("#patientLogout").attr('disabled', 'disabled');
        //  Send logout info to server
        //  server url
        var url = "https://httpbin.org/get";
        jsPatLogout(url);
    });
});