const ORDER_QTY_REGEX = /^\d{1,4}$/;


// btnAddToCart validations///////////////////////////////////////////
$('#txtOrderQty').on("keyup",function () {
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


// btnPlaceOrder validations///////////////////////////////////////////
