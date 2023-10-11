let password = "";

function checkLogInUserDetails() {
    if ($('#txtLogInUserName').val() == "" || $('#txtLogInPassword').val() == ""){
        alert("Please fill the input fields");
    } else {
        if (searchInvalidUserName($('#txtLogInUserName').val())) {
            if ($('#txtLogInPassword').val() == password ) {
                clearLogInInputFields();
                alert("Login Successful");
                return true
            } else {
                alert("Invalid Password");
            }
        } else {
            alert("Invalid User Name");
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