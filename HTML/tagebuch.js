/*
    Patient log script (JS)
    --
    For filling out the patient log and sending it to the server
 */
function jsLog (url) {
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
    });
});