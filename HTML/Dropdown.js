/*
    Dropdown button script (JS)
    --
    For all click events on dropdown buttons (except logout)
    1. On click sends get request to server
    2. Handles timeout and successful connections via popups
    3. Server redirects to page (search patients or create patients) on successful request
 */
function jsSearchPage (url) {
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
        $("#searchPage1").removeAttr('disabled');
        $("#searchPage2").removeAttr('disabled');
        $("#searchPage3").removeAttr('disabled');
    };
    xhr.send();
}

function jsCreatePage (url) {
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
        $("#createPage1").removeAttr('disabled');
        $("#createPage2").removeAttr('disabled');
        $("#createPage3").removeAttr('disabled');
    };
    xhr.send();
}

$(function () {
    //  On click: redirect to search patient page
    $('#searchPage1').click(function(){
        var $this = $(this);
        //  Disable dropdown button
        $this.attr('disabled', 'disabled');
        //  Send request to server
        //  server url /logout
        var url = "https://httpbin.org/get";
        jsSearchPage(url);
    });
    $("#searchPage2").click(function(){
        //  Disable dropdown button
        $("#searchPage2").attr('disabled', 'disabled');
        var url = "https://httpbin.org/get";
        jsSearchPage(url);
    });
    $("#searchPage3").click(function(){
        //  Disable dropdown button
        $("#searchPage3").attr('disabled', 'disabled');
        var url = "https://httpbin.org/get";
        jsSearchPage(url);
    });
    //  On click: redirect to create patient page
    $('#createPage1').click(function(){
        var $this = $(this);
        $this.attr('disabled', 'disabled');
        // server url
        var url = "https://httpbin.org/get";
        jsCreatePage(url);
    });
    $("#createPage2").click(function(){
        //  Disable dropdown button
        $("#createPage2").attr('disabled', 'disabled');
        var url = "https://httpbin.org/get";
        jsCreatePage(url);
    });
    $("#createPage3").click(function(){
        //  Disable dropdown button
        $("#createPage3").attr('disabled', 'disabled');
        var url = "https://httpbin.org/get";
        jsCreatePage(url);
    });

});