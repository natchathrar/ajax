let list = [];
let student = {};
$(document).ready(function () {
    var editId = null;

    $('#form1').submit(function get(event) {
        event.preventDefault();
        var id = $("#id").val();
        var names = $("#names").val();
        var email = $("#email").val();
        var password = $("#pwd").val();

        function isValidEmail(email) {
            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        }
        var isvalid = true;
      
        if (!email) {
            $("#err1").text("* Please Enter Your email");
            isvalid = false;
        } else if (!isValidEmail(email)) {
            $('#err1').text('Please enter a valid email address.');
            isvalid = false;
        } else {
            $("#err1").text("");
        }
        if (!password) {
            $("#err2").text("* Please Enter Your password");
            isvalid = false;
        } else if (password.length < 6) {
            $("#err2").text("** Password must be 6 characters.");
            isvalid = false;
        } else {
            $("#err2").text("");
        }

        if (isvalid) {
            let result = {
                'Names': names,
                'Email':email,
                'Password': password
            };
            console.log(result);
          redirectoSignup();

        }
    });
});
 function redirectoSignup()
 {
    window.location.replace("http://127.0.0.1:5500/college%20project/login.html")
 }