/*
    Script file for all logout attempts made by the user
    Function to delete cookie and alert to server
 */

function jsLogout () {

}

$(function () {
    //  Get button element
    var $btn = $('#logout');
    //  On click: start logout procedure
    $btn.click(function(){
        var $this = $(this);
        //  Change to loading icon and disable button
        $this.attr('disabled', 'disabled').html("<span " +
            "class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\"></span>");
        //  Get user and password inputs
        var usr = $("#usr").val();
        var pw = $("#pw").val();
        //  server url
        var url = "https://httpbin.org/poste";
        var req = JSON.stringify({
            user: usr,
            password: pw
        });
        jsLogout(url, req);
    });
});