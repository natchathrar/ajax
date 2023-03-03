let list = [];
let student = {};
$(document).ready(function () {

    $('#form').submit(function get(event) {
        event.preventDefault()
        var username = $("#names").val();
        var password = $("#pwd").val();

        var isvalid = true;
        if (!username) {
            $("#err").text("* Please Enter Your Name");
            isvalid = false;
        } else {
            $("#err").text("");
        }
 
        if (!password) {
            $("#err1").text("* Please Enter Your password");
            isvalid = false;
        } else if (password.length < 6) {
            $("#err1").text("** Password must be 6 characters.");
            isvalid = false;
        } else {
            $("#err1").text("");
        }

        if (isvalid) {
            let result = {
                'Names': username,
                'Password': password
            };
            console.log(result);
            redirectoLogin();
        }
    });
});
function redirectoLogin()
{
    window.location.replace("http://127.0.0.1:5500/college%20project/home.html")
}