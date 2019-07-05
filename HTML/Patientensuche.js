/*
    Patient search script (JS)
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

function getId(id) {
    let url = "https://localhost:8080/patientDiag";
    let jsonId = JSON.stringify({
        PatientId: id
    });
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url,true);
    xhr.setRequestHeader("Content-type", "application/json");
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
                title: 'Erfolgreich gesendet!'
            });
            */
            //let patData = JSON.parse(xhr.responseText);
            let patData = {
                Stimmung: [0,1,2,3,4,5,6],
                SchlafStimmung: [7,6,5,4,3,2,1]
            };
            let HTM = "<div class=\"container-canvas\" >\n" +
                "    <canvas class=\"chart\" id=\"lineChart\" height=\"400\" width=\"400\"></canvas>\n" +
                "</div>\n" +
                "\n" +
                "<div id=\"patNote\">\n" +
                "    <p>Notizen</p>\n" +
                "\n" +
                "</div>";
            $("#divCont").html(HTM);
            let patientSchlafStimmung = patData["SchlafStimmung"];
            let patientStimmung = patData["Stimmung"];
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
                            data: patientSchlafStimmung
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
                            data: patientStimmung
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
        }
        else if (this.readyState === 4 && this.status === 401) {
            /*
            swal.fire({
                title: 'Bitte Daten eingeben!',
                type: 'error',
                backdrop: 'true',
                confirmButtonText: 'Ok'
            });
            */
            $("#search").removeAttr('disabled').html('suchen');
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
        $("#search").removeAttr('disabled').html('suchen');
    };

    xhr.send(data);
}

function jsSearch(postUrl, data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", postUrl,true);
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
                title: 'Erfolgreich gesendet!'
            });
            */
            let patData = JSON.parse(xhr.responseText);
            $("#rem").html("");
            $("#divCont").append("<ul class=\"list-group\" id=\"liste\"></ul>");
            for (item in patData) {
                let i = patData[item];
                let patId = i["PatientenID"];
                $("#liste").append("<li class=\"list-group-item\"" + "id=\"" + patId +"\">" + i["Vorname"] + " - " + i["Nachname"] + " - " + i["Geschlecht"] + " - " + i["Krankheit"] + " - " + "<a href='#'>Auswaehlen</a></li><br>");
            }
        }
        else if (this.readyState === 4 && this.status === 401) {
            /*
            swal.fire({
                title: 'Bitte Daten eingeben!',
                type: 'error',
                backdrop: 'true',
                confirmButtonText: 'Ok'
            });
            */
            $("#search").removeAttr('disabled').html('suchen');
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
        $("#search").removeAttr('disabled').html('suchen');
    };

    xhr.send(data);
}

/*
    Calls POST function if button clicked, changes to loading icon and back
 */
$(function () {
    $("#search").click(function () {
        var $this = $(this);
        //  Change to loading icon and disable button
        $this.attr('disabled', 'disabled').html("<span " +
            "class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\"></span>");
        //  Map object with all values except for gender
        var map = {};
        $(".form-control").each(function () {
            map[$(this).attr("name")] = $(this).val();
        });

        //  Add gender key/value
        var gender = $("#dm2 option:selected").text();
        map["Geschlecht"] = gender;
        delete map["gen"];

        //  server url
        //var url = "https://httpbin.org/post";
        var url = "https://localhost:8080/patientSearch/";
        var reqJson = JSON.stringify(map);

        jsSearch(url, reqJson);
    });
    $("#liste").click(getId(this.id));
});

