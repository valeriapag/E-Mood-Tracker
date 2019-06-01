/*
    Login script (JS)
    --
    Contains function to get inputs for username and password, then checks against saved password Hash and connected
    username by sending to server. It then waits for server response:
    1. username and pw found -> server redirects to start page
    2. not found -> output error message "Falsche Eingabe" as popup
 */

function _login() {
    $(function(){
        $("p").click(function(){
            $(this).hide();
        });
    });
}
