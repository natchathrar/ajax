let list = [];
let student = {};
$(document).ready(function () {

    let searchParams = new URLSearchParams(window.location.search);
    let param = searchParams.get("id");
    if (param != null) {
        edit(param);
        console.log(param)
    }
    else {

    }

    $('#form').submit(function get(event) {
        event.preventDefault();
        var id = $("#id").val();
        var username = $('#name').val();
        var education = $("#education").val();
        var email = $('#email').val();
        var dob = $('#dob').val();
        var gender = $('input[name="gender"]:checked').val();
        var number = $('#number').val();
        var address = $('#Address').val();

        let phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        function isValidEmail(email) {
            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        }

        var isvalid = true;
        if (!username) {
            $("#err").text("* Please Enter Your Name");
            isvalid = false;
        } else {
            $("#err").text("");
        }
        if (!education) {
            $("#err1").text("* Please Enter Your Qualification");
            isvalid = false;
        } else {
            $("#err1").text("");
        }
        if (!gender) {
            $("#err3").text("* Please Enter Your gender");
            isvalid = false;
        } else {
            $("#err3").text("");
        }
        if (!email) {
            $("#err4").text("* Please Enter Your email");
            isvalid = false;
        } else if (!isValidEmail(email)) {
            $('#err4').text('Please enter a valid email address.');
            isvalid = false;
        } else {
            $("#err4").text("");
        }
        if (!dob) {
            $("#err2").text("* Please Enter Your DOB");
            isvalid = false;
        } else {
            $("#err2").text("");
        }
        if (number.match(phoneNum)) {
            $("#err5").text("");
        }
        else if (number == "") {
            $("#err5").text("* Please Enter your  phonenumber");
        }
        else {
            $("#err5").text("*****  Please Enter valid phonenumber");
        }
        if (!address) {
            $("#err6").text("* Please Enter Your address");
            isvalid = false;
        } else {
            $("#err6").text("");
        }


        if (isvalid) {
            let result = {
                'Name': username,
                'Education': education,
                'Email': email,
                'Dob': dob,
                'gender': gender,
                'Number' :number,
                'Address': address,
            };
            console.log(result);
            if (username && education && email && dob && gender && number && address) {
                list.push(result);
            }
            if (id == "") {
                $.ajax({
                    type: "POST",
                    url: "https://63ef516e271439b7fe6c0386.mockapi.io/user",
                    data: result,
                    dataType: "JSON",
                    endcode: true,
                    success: function () {
                        table()
                        location.reload()
                        window.location.href = "stafflist.html";

                    }

                })


            }
            else {

                $.ajax({
                    type: "PUT",
                    url: "https://63ef516e271439b7fe6c0386.mockapi.io/user/" + student.id,
                    data: result,
                    dataType: "JSON",
                    endcode: true,
                    success: function () {
                        location.reload()
                        window.location.href = "stafflist.html";

                    }

                })


            }
        }
    });
});

function table() {

    $.ajax({
        type: "GET",
        url: "https://63ef516e271439b7fe6c0386.mockapi.io/user",
        dataType: "JSON",
        success: function (response) {
            let list = response

            console.log(list)
            var count = 1;
            for (let i = 0; i < list.length; i++) {

                let row =
                    "<td>" + count++ + "</td>"
                    + "<td>" + list[i].Name + "</td>"
                    + "<td>" + list[i].Education + "</td>"
                    + "<td>" + list[i].Email + "</td>"
                    + "<td>" + list[i].Dob + "</td>"
                    + "<td>" + list[i].gender + "</td>"
                    + "<td>" + list[i].Number + "</td>"
                    + "<td>" + list[i].Address + "</td>"
                    + "<td>" + "<button type='button' class='edit text-white btn btn-sm btn-success' onclick='edit2(" +

                    list[i].id + ")'><i class='bx bxs-edit-alt' ></i></button><button type='button' class='deleteRow btn btn-sm btn-danger ms-2' onclick='deleteRow (" +

                    list[i].id + ")'><i class='bx bxs-trash-alt'></i></button> " + "</td>"


                document.getElementById("myTable1").innerHTML += row;
            }
        }
    })
}
function edit2(id) {
    window.location.href = "staffs.html?id=" + id;

}


function edit(id) {
    $.ajax({
        url: "https://63ef516e271439b7fe6c0386.mockapi.io/user/" + id,
        type: "GET",
        success: function (response) {
            $("#id").val(response.id);
            $("#name").val(response.Name);
            $("#education").val(response.Education);
            $("#email").val(response.Email);
            $("#dob").val(response.Dob);
            $("input[name='gender']").each(function () {
                if ($(this).val() == response.gender) {
                    $(this).prop("checked", true);
                } else {
                    $(this).prop("checked", false);
                }
            });
            $("#number").val(response.Number);
            $("#Address").val(response.Address);
            student = response;
        }
    })
    console.log(student);
}

function update(id) {
    $.ajax({
        type: "PUT",
        url: "https://63ef516e271439b7fe6c0386.mockapi.io/user/" + id,
        // data: result,
        dataType: "JSON",
        endcode: true,
        success: function (response) {
            console.log(response)
            location.reload()

        }
    });
}

function deleteRow(id) {
    $.ajax({
        url: "https://63ef516e271439b7fe6c0386.mockapi.io/user/" + id,
        type: "DELETE",
        success: function (response) {
            location.reload()


        }
    })
}


