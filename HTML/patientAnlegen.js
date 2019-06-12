/*
    Patient create script (JS)
    --
    Contains function to get inputs for patient data, then sends it to the server. It then waits for server response:
    1. On search button click -> set to loading icon (spinner)
    2. patients found -> server redirects to search list
    3. nothing found -> output error message "Keine Patienten gefunden!"
    4. no connection -> output error message "Keine Verbindung" as popup, reset button
    --
 */

/*
    Function for http POST request to server
 */
function jsCreate(postUrl, data) {
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
        $("#genUser").removeAttr('disabled').html('suchen');
    };
    xhr.send(data);
}

function getGender() {
    if($('#').prop("checked")){
        return 'W';
    }
    else if ($('#genderM').prop("checked")) {
        return 'M';
    }
    else if ($('#genderD').prop("checked")) {
        return 'U';
    }
    else {
        return null;
    }
}

/*
    Calls POST function if button clicked, changes to loading icon and back
 */
$(function(){
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