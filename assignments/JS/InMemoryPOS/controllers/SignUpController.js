let txtUserName = $('#txtSignUpUserName');
let txtPassword = $('#txtSignUpPassword');
let txtConfirmPassword = $('#txtSignUpConfirmPassword');

function checkSignUpUserDetails() {
    if (txtUserName.val()=="" || txtPassword.val()=="" || txtConfirmPassword.val()=="") {
        swal("Error!", "Please fill the input fields!", "error");
    } else {
        if (searchValidUserName(txtUserName.val())) {
            if (txtPassword.val() == txtConfirmPassword.val()) {
                addNewUserName(txtUserName.val(), txtPassword.val());
                clearSignUpInputFields();
                swal("Sign Up!", "New User add successfully!", "success");
                return true;
            } else {
                swal("Error!", "Password not same.Check the password again!", "error");
            }
        } else {
            swal("Error!", "This User Name is already exits.! try again", "error");
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