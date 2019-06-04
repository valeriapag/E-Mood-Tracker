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
        //  Send logout info to server
        //  server url
        var url = "https://httpbin.org/get";
        jsLogout(url);
    });
});