$(function() {
    $("#add-btn").click(function() {
        var fnameField = $('#fname').val();
        var lnameField = $('#lname').val();
        var yearField = $('#year').val();
        $("#listBody").append('<li><span class="fname">' + fnameField + ' </span>' +
        '<span class="lname">' + lnameField + ' </span>' +
        '<span class="year">' + yearField + '</span></li>');
    });
});
