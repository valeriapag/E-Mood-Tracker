/*
   plotting diagramm with chart.js
 */

//  Get patient Data to plot
function jsGetData (url, req) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url,true);
    //  Set timeout duration
    xhr.timeout = 3000;
    //  On successful request -> popup
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            swal.fire({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 2000,
                type: 'success',
                title: 'Erfolgreich ausgeloggt!'
            });
            var json = JSON.parse(xhr.responseText);
            return json;
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
    };
    xhr.send(req);
}

//  Function on page ready, plot diagram with patient data
$(function() {
    var patId = "";
    //var url = "https://httpbin.org/post";
    var url = "https://localhost:8080/patientList";
    //  Request JSON with patient id
    var req = JSON.stringify({
        patient: patId
    });
    //  Get data
    //var json = jsGetData(url,req);
    //var patData = [0,1,2,3,2,1,0];//json["patientData"];
    //var note = json["note"];
    new Chart(document.getElementById("lineChart"), {
        type: 'line',
        data: {
            labels: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
            datasets: [
                {
                    label: "Stimmung",
                    fill: false,
                    lineTension: 0.1,
                    backdropColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'mitter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 6,
                    pointHitRadius: 10,
                    data: [null,4,null,5,null,null,null]
                },
                {
                    label: "Schlafstimmung",
                    fill: false,
                    lineTension: 0.1,
                    backdropColor: "rgba(255,165,0,0.4)",
                    borderColor: "rgba(255,165,0,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'mitter',
                    pointBorderColor: "rgba(255,165,0,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255,165,0,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 6,
                    pointHitRadius: 10,
                    data: [null,null,null,3,null,2,null]
                }]
        },
        options: {
            legend: {display: true},
            title: {
                display: true,
                responsive: true,
                mode: 'nearest',
                text: 'Patienten Tagebuch'
            }
        }
    });
    /*
    var i = 0;
    note.forEach(function(item) {
        i = i + 1;
        $("#patNote").append('<p>' + i + '. ' + item["note"] + '</p>');
    });
    */
});