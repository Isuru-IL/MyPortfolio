let demoItemDB = [];
function placeOrderInitialize() {
    setDemoItemDB();
    loadAllCustomerIds();
    loadAllItemCodes();
    setDataToOrderDate();
    clearAllTxtFields();
}
setDemoItemDB();
loadAllCustomerIds();
loadAllItemCodes();
setDataToOrderDate();
getAllCartData();
generateNextOrderId("");


function setDemoItemDB() {
    demoItemDB = [];
    for (let i = 0; i < itemDB.length; i++) {
        let demoItem = Object.assign({}, item);
        demoItem.code = itemDB[i].code;
        demoItem.description = itemDB[i].description;
        demoItem.qtyOnHand = itemDB[i].qtyOnHand;
        demoItem.unitPrice = itemDB[i].unitPrice;

        demoItemDB.push(demoItem);
    }
}

function generateNextOrderId(currentOrderId) {
    if (currentOrderId == ""){
        $('#txtOrderId').val("OD-0001");
    } else {
        const [prefix, numericPart] = currentOrderId.split('-');
        const nextNumericPart = String(parseInt(numericPart) + 1).padStart(numericPart.length, '0');
        const nextOrderId = `${prefix}-${nextNumericPart}`;

        $('#txtOrderId').val(nextOrderId);
    }
}

function setDataToOrderDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    let orderDate = `${day}-${month}-${year}`;
    $('#txtOrderDate').val(orderDate);
}

$('#cmbCustomerIds').click(function () {
    //setCustomerDetails ///////////////////////////////////////////////////
    let id = $('#cmbCustomerIds').val();

    for (let customer of customerDB) {
        if (customer.id == id) {
            $('#lblCustomerName').text(customer.name);
            $('#lblCustomerAddress').text(customer.address);
        }
    }
});

$("#cmbItemCodes").click(function () {
    //setItemDetails ///////////////////////////////////////////////////
    let code = $("#cmbItemCodes").val();

    for (let item of demoItemDB) {
        if (item.code == code) {
            $('#lblItemName').text(item.description);
            $('#lblItemUnitPrice').text(item.unitPrice);
            $('#lblQtyOnHand').text(item.qtyOnHand);
        }
    }
});

function loadAllCustomerIds(){
    $("#cmbCustomerIds").empty();
    $("#cmbCustomerIds").append(`<option selected></option>`);
    for (let customer of customerDB) {
        $("#cmbCustomerIds").append(`<option value="${customer.id}">${customer.id}</option>`);
    }
}

function loadAllItemCodes(){
    $("#cmbItemCodes").empty();
    $("#cmbItemCodes").append(`<option selected></option>`);
    for (let item of demoItemDB) {
        $("#cmbItemCodes").append(`<option value="${item.code}">${item.code}</option>`);
    }
}

// Add To Cart ////////////////////////////////////////////////////////////////////////////////////////
$('#btnAddToCart').click(function () {
    let qtyOnHand = parseInt($('#lblQtyOnHand').text());
    let orderQty = parseInt($('#txtOrderQty').val());

    if (qtyOnHand >= orderQty) {
        setDataToCartTable();
        $("#btnAddToCart").prop("disabled", true);
    } else {
        swal("Out of Stock!", "This Item is out of stock!", "error");
    }

});

function searchItemIsExits(code) {
    return CartDB.find(function (cart) {
        return cart.itemCode == code;
    });
}

function getAllCartData() {
    $('#tbody-orderCart').empty();
    for (let cartRow of CartDB) {
        let row = `<tr>
            <th>${cartRow.itemCode}</th>
            <td>${cartRow.itemName}</td>
            <td>${cartRow.unitPrice}</td>
            <td>${cartRow.quantity}</td>
            <td>${cartRow.total}</td>
        </tr>`;

        $('#tbody-orderCart').append(row);
        bindOrderCartTblDblClickEvent();
    }
}

function setDataToCartTable() {

    let itemCode = $('#cmbItemCodes').val();
    let itemName = $('#lblItemName').text();
    let unitPrice = parseFloat($('#lblItemUnitPrice').text());
    let quantity = parseInt($('#txtOrderQty').val());

    let exitsItem = searchItemIsExits(itemCode);

    if (exitsItem != undefined) {
        updateItemQtyAfterAddToCart(itemCode,quantity);
        exitsItem.quantity = (exitsItem.quantity + quantity);
        exitsItem.total = exitsItem.quantity * unitPrice;

        clearItemDetailTxtFields();
        calcTotal();
        getAllCartData();
    } else {
        let newCartOb = Object.assign({}, cartTMObject);
        newCartOb.itemCode = itemCode;
        newCartOb.itemName = itemName;
        newCartOb.unitPrice = unitPrice;
        newCartOb.quantity = quantity;
        newCartOb.total = unitPrice*quantity;

        CartDB.push(newCartOb);
        updateItemQtyAfterAddToCart(itemCode,quantity);
        clearItemDetailTxtFields();
        calcTotal();
        getAllCartData();
    }
}
//updateItemQtyAfterAddToCart//////////////////////////////////
function updateItemQtyAfterAddToCart(code,quantity) {
    for (let item of demoItemDB) {
        if (item.code == code) {
            item.qtyOnHand = item.qtyOnHand - quantity;
        }
    }
}

function clearItemDetailTxtFields() {
    $('#lblItemName,#lblQtyOnHand,#lblItemUnitPrice').text("");
    $('#txtOrderQty,#cmbItemCodes').val("");
    loadAllItemCodes();
}

function calcTotal() {
    let total = 0.00;
    for (let cartRow of CartDB) {
        total+=cartRow.total;
    }
    $('#lblTotal').text(total);
    calculateSubTotal();
    calculateBalance();
}

//Place Order ////////////////////////////////////////////////////////////////////////////////////////////////////

//calculate balance////////////////////////////////////////
$('#txtCash').on("keyup",function (){
    if (validateTxtCash()) {
        calculateBalance();
    } else {
        $('#lblBalance').text("");
    }
});

function calculateBalance() {
    let subTotal = parseFloat($('#lblSubTotal').text());
    let cash = parseFloat($('#txtCash').val());

    if (subTotal <= cash) {
        let balance = cash - subTotal;
        $('#lblBalance').text(balance);
        $("#btnPlaceOrder").prop("disabled", false);
    } else {
        $('#lblBalance').text("");
        $("#btnPlaceOrder").prop("disabled", true);
    }
}

//calculate sub total //////////////////////////////////////
$('#txtDiscount').on("keyup",function () {
    if (validateTxtDiscount()) {
        calculateSubTotal();
    } else {
        $('#lblSubTotal').text("");
        $("#btnPlaceOrder").prop("disabled", true);
    }
});

function calculateSubTotal() {
    let total = parseFloat($('#lblTotal').text());
    if (!$('#txtDiscount').val()== "" ) {
        let discountPercentage = parseInt($('#txtDiscount').val());

        let discount = total*discountPercentage/100;
        let subTotal = total - discount
        $('#lblSubTotal').text(subTotal);
        calculateBalance();
    } else {
        $('#lblSubTotal').text(total);
        calculateBalance();
    }
}

//btnPlaceOrder /////////////////////////////////////////////
$('#btnPlaceOrder').click(function () {
    let orderId = $('#txtOrderId').val();
    let customerId = $('#cmbCustomerIds').val();
    let orderDate = $('#txtOrderDate').val();
    let total = parseFloat($('#lblSubTotal').text());

    let newOrder = Object.assign({}, orders);
    newOrder.orderId = orderId;
    newOrder.customerId = customerId;
    newOrder.orderDate = orderDate;
    newOrder.total = total;
    newOrder.cartList = CartDB;

    OrderDB.push(newOrder);
    updateItemQuantity();
    generateNextOrderId($('#txtOrderId').val());
    clearAllTxtFields();
    CartDB = [];
    swal("Order placed", "Order placed successfully!", "success");
});

function updateItemQuantity() {
    for (let cartRow of CartDB) {
        for (let item of itemDB) {
            if (cartRow.itemCode == item.code) {
                item.qtyOnHand = item.qtyOnHand - cartRow.quantity;
            }
        }
    }
    getAllItems();
}

function clearAllTxtFields() {
    clearAllCustomerTxtFields();
    clearAllItemTxtFields();

    $('#lblSubTotal').text("");
    $('#lblTotal').text("");
    $('#lblBalance').text("");
    $('#txtCash').val("");
    $('#txtDiscount').val("");

    $('#tbody-orderCart').empty();

    $('#btnPlaceOrder').prop("disabled", true);
}
function clearAllCustomerTxtFields() {
    $('#cmbCustomerIds').val("");
    $('#lblCustomerName').text("");
    $('#lblCustomerAddress').text("");
}
function clearAllItemTxtFields() {
    $('#cmbItemCodes').val("");
    $('#txtOrderQty').val("");
    $('#lblItemName').text("");
    $('#lblItemUnitPrice').text("");
    $('#lblQtyOnHand').text("");
}

//bind table events ////////////////////////////////////////////////////////////////
function bindOrderCartTblDblClickEvent() {
    $('#tbody-orderCart>tr').on("dblclick",function () {

        swal({
            title: "Are you sure?",
            text: "Do you want to delete this order.?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    let itemCode = $(this).children().eq(0).text();
                    let itemQuantity = parseInt($(this).children().eq(3).text());

                    updateItemQtyAfterRemoveTheCart(itemCode,itemQuantity);
                    deleteOrderInCartDB(itemCode);
                    swal("Deleted", "Order deleted successfully!", "success");
                } else {
                    swal("This data is safe!");
                }
            });
    });
}

//updateItemQtyAfterRemoveTheCart////////////////////////
function updateItemQtyAfterRemoveTheCart(code,quantity) {
    for (let item of demoItemDB) {
        if (item.code == code) {
            item.qtyOnHand = item.qtyOnHand + quantity;
        }
    }
    clearAllItemTxtFields();
}

function deleteOrderInCartDB(code) {
    for (let i = 0; i < CartDB.length; i++) {
        if (CartDB[i].itemCode == code) {
            CartDB.splice(i, 1);
        }
    }
    getAllCartData();
    calcTotal();
}

