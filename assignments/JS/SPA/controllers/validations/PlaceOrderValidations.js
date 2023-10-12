const ORDER_QTY_REGEX = /^\d{1,4}$/;
const ORDER_DISCOUNT_REGEX = /^\d{0,2}$/;
const ORDER_CASH_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;


// btnAddToCart validations///////////////////////////////////////////
$('#txtOrderQty').on("keyup",function () {
    validateTxtOrderQty();
    if (ORDER_QTY_REGEX.test($('#txtOrderQty').val()) && $('#cmbItemCodes').val() != ""  && $('#cmbCustomerIds').val() != "") {
        $("#btnAddToCart").prop("disabled", false);
    } else {
        $("#btnAddToCart").prop("disabled", true);
    }
});

$('#cmbItemCodes').on("click",function () {
    if (ORDER_QTY_REGEX.test($('#txtOrderQty').val()) && $('#cmbItemCodes').val() != ""  && $('#cmbCustomerIds').val() != "") {
        $("#btnAddToCart").prop("disabled", false);
    } else {
        $("#btnAddToCart").prop("disabled", true);
    }
});

$('#cmbCustomerIds').on("click",function () {
    if (ORDER_QTY_REGEX.test($('#txtOrderQty').val()) && $('#cmbItemCodes').val() != ""  && $('#cmbCustomerIds').val() != "") {
        $("#btnAddToCart").prop("disabled", false);
    } else {
        $("#btnAddToCart").prop("disabled", true);
    }
});

function validateTxtOrderQty() {
    if (ORDER_QTY_REGEX.test($('#txtOrderQty').val())) {
        $('#txtOrderQty').css("border", "1px solid #ced4da");
    } else {
        $('#txtOrderQty').css("border", "2px solid red");
    }
}


// btnPlaceOrder validations///////////////////////////////////////////
function validateTxtCash() {
    if (ORDER_CASH_REGEX.test($('#txtCash').val())) {
        $('#txtCash').css("border", "1px solid #ced4da");
        return true;
    } else {
        $('#txtCash').css("border", "2px solid red");
        return false;
    }
}

function validateTxtDiscount() {
    if (ORDER_DISCOUNT_REGEX.test($('#txtDiscount').val())) {
        $('#txtDiscount').css("border", "1px solid #ced4da");
        return true;
    } else {
        $('#txtDiscount').css("border", "2px solid red");
        return false;
    }
}