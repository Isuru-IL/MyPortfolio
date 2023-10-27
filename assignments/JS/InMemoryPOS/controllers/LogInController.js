let password = "";

function checkLogInUserDetails() {
    if ($('#txtLogInUserName').val() == "" || $('#txtLogInPassword').val() == ""){
        swal("Error!", "Please fill the input fields!", "error");
    } else {
        if (searchInvalidUserName($('#txtLogInUserName').val())) {
            if ($('#txtLogInPassword').val() == password ) {
                clearLogInInputFields();
                swal("Login!", "Login Successfully!", "success");
                return true
            } else {
                swal("Error!", "Invalid Password.! try again", "error");
            }
        } else {
            swal("Error!", "Invalid User Name.! try again", "error");
        }
        return false;
    }
    return false;
}

function searchInvalidUserName(userName) {
    for (let user of UserDB) {
        if (user.userName == userName) {
            password = user.password;
            return true;
        }
    }
    return false;
}

function clearLogInInputFields() {
    $('#txtLogInUserName').val("");
    $('#txtLogInPassword').val("");
}