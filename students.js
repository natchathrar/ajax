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

    $('#form1').submit(function (event) {
        event.preventDefault();
        var id = $("#id").val();
        var username = $('#names').val();
        var father = $("#fname").val();
        var email = $('#email').val();
        var dob = $('#Dob').val();
        var gender = $('input[name="gender"]:checked').val();
        var course = $('#Course').val();
        var address = $('#Address').val();
        var pincode = $("#pin").val();


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
        if (!father) {
            $("#err1").text("* Please Enter Your Father name");
            isvalid = false;
        } else {
            $("#err1").text("");
        }

        if (!address) {
            $("#err2").text("* Please Enter Your address");
            isvalid = false;
        } else {
            $("#err2").text("");
        }
        if (!gender) {
            $("#err3").text("* Please Enter Your gender");
            isvalid = false;
        } else {
            $("#err3").text("");
        }

        if (!dob) {
            $("#err4").text("* Please Enter Your DOB");
            isvalid = false;
        } else {
            $("#err4").text("");
        }
        if (!pincode) {
            $("#err5").text("* Please Enter Your Area code");
            isvalid = false;
        } else {
            $("#err5").text("");
        }

        if (!course) {
            $("#err6").text("* Please Enter Your Qualification");
            isvalid = false;
        } else {
            $("#err6").text("");
        }

        if (!email) {
            $("#err7").text("* Please Enter Your email");
            isvalid = false;
        } else if (!isValidEmail(email)) {
            $('#err7').text('Please enter a valid email address.');
            isvalid = false;
        } else {
            $("#err7").text("");
        }


        
            let result = {
                'Name': username,
                'Father': father,
                'Email': email,
                'Dob': dob,
                'Gender': gender,
                'Course': course,
                'Pincode': pincode,
                'Address': address,
            };
        
        console.log(result);
        if (username && father && email && dob && gender && course && pincode && address) {
            list.push(result);
        }
        if ((id === "")&&(isvalid)) {
            $.ajax({
                type: "POST",
                url: "https://63ef516e271439b7fe6c0386.mockapi.io/students",
                data: result,
                dataType: "JSON",
                endcode: true,
                success: function (data) {
                    formtable()
                    location.reload()
                    window.location.href = "studentlist.html";

                }

            })


        }
        else {
            $.ajax({
                type: "PUT",
                url: "https://63ef516e271439b7fe6c0386.mockapi.io/students/" + student.id,
                data: result,
                dataType: "JSON",
                endcode: true,
                success: function () {
                    formtable()
                    location.reload()
                    window.location.href = "studentlist.html";

                }

            })

        }
    })
});

function formtable() {

    $.ajax({
        type: "GET",
        url: "https://63ef516e271439b7fe6c0386.mockapi.io/students",
        dataType: "JSON",
        success: function (response) {
            let list = response

            console.log(list)
            var count = 1;
            for (let i = 0; i < list.length; i++) {

                let row =
                    "<td>" + count++ + "</td>"
                    + "<td>" + list[i].Name + "</td>"
                    + "<td>" + list[i].Father + "</td>"
                    + "<td>" + list[i].Email + "</td>"
                    + "<td>" + list[i].Dob + "</td>"
                    + "<td>" + list[i].Gender + "</td>"
                    + "<td>" + list[i].Course + "</td>"
                    + "<td>" + list[i].Pincode + "</td>"
                    + "<td>" + list[i].Address + "</td>"
                    + "<td>" + "<button type='button' class='edit text-white btn btn-sm btn-success' onclick='edit2(" +

                    list[i].id + ")'><i class='bx bxs-edit-alt' ></i></button><button type='button' class='deleteRow btn btn-sm btn-danger ms-2' onclick='deleteRow (" +

                    list[i].id + ")'><i class='bx bxs-trash-alt'></i></button> " + "</td>"


                document.getElementById("myTable").innerHTML += row;
            }
        }
    })
}
function edit2(id) {
    window.location.href = "student.html?id=" + id;

}


function edit(id) {
    $.ajax({
        url: "https://63ef516e271439b7fe6c0386.mockapi.io/students/" + id,
        type: "GET",
        success: function (response) {
            $("#id").val(response.id);
            $("#names").val(response.Name);
            $("#fname").val(response.Father);
            $("#email").val(response.Email);
            $("#Dob").val(response.Dob);
            $("input[name='gender']").each(function () {
                if ($(this).val() == response.Gender) {
                    $(this).prop("checked", true);
                } else {
                    $(this).prop("checked", false);
                }
            });
            $("#Course").val(response.Course);
            $("#pin").val(response.Pincode);
            $("#Address").val(response.Address);
            student = response;
        }
    })
    console.log(student);
}

function update(id) {
    event.preventDefault();
    $.ajax({
        type: "PUT",
        url: "https://63ef516e271439b7fe6c0386.mockapi.io/students/" + id,
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
        url: "https://63ef516e271439b7fe6c0386.mockapi.io/students/" + id,
        type: "DELETE",
        success: function (response) {
            location.reload()


        }
    })
}


