let txtUserName = $('#txtSignUpUserName');
let txtPassword = $('#txtSignUpPassword');
let txtConfirmPassword = $('#txtSignUpConfirmPassword');

function checkSignUpUserDetails() {
    if (txtUserName.val()=="" || txtPassword.val()=="" || txtConfirmPassword.val()=="") {
        alert("Please fill the input fields");
    } else {
        if (searchValidUserName(txtUserName.val())) {
            if (txtPassword.val() == txtConfirmPassword.val()) {
                addNewUserName(txtUserName.val(), txtPassword.val());
                clearSignUpInputFields();
                alert("New User add successful");
                return true;
            } else {
                alert("Password not same.Check the password again");
            }
        } else {
            alert("This User Name is already exits");
        }
    }
    return false;
}

function searchValidUserName(userName) {
    for (let user of UserDB) {
        if (user.userName == userName) {
            return false;
        }
    }
    return true;
}

function addNewUserName(userName, password) {
    let newUser = Object.assign({}, userObject);
    newUser.userName = userName;
    newUser.password = password;

    UserDB.push(newUser);
}

function clearSignUpInputFields() {
    $('#txtSignUpUserName').val("");
    $('#txtSignUpPassword').val("");
    $('#txtSignUpConfirmPassword').val("");
}