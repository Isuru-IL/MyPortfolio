function itemInitialize() {
    getAllItems();
}
getAllItems();

$('#btnItemSave').click(function () {
    if (checkAll()) {
        saveItem();
    } else {
        swal("Error", "Please check the input fields!", "error");
    }
});

$("#btnItemUpdate").click(function () {
    let code = $("#txtItemCode").val();
    if (checkAll()) {
        updateItem(code);
    } else {
        swal("Error", "Please check the input fields!", "error");
    }
});

$("#btnItemDelete").click(function () {
    let code = $("#txtItemCode").val();

    swal({
        title: "Are you sure?",
        text: "Do you want to delete this item.?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                let response = deleteItem(code);
                if (response) {
                    clearItemInputFields()
                    getAllItems();
                    swal("Deleted", "Item deleted successfully!", "success");
                } else {
                    swal("Error", "Item Not Removed. Invalid Item!", "error");
                }
            } else {
                swal("Item data is safe!");
            }
        });
});

$("#btnItemClear").click(function () {
    clearItemInputFields();
});

function deleteItem(code) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == code) {
            itemDB.splice(i, 1);
            return true;
        }
    }
    return false
}

function updateItem(code) {
    if (searchItem(code) == undefined) {
        swal("Error", "Invalid Item..please check the Code!", "error");
    } else {
        swal({
            title: "Are you sure?",
            text: "Do you want to update this item.?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    let item = searchItem(code);

                    let itemName = $("#txtItemName").val();
                    let qtyOnHand = $("#txtItemQtyOnHand").val();
                    let unitPrice = $("#txtItemPrice").val();

                    item.description = itemName;
                    item.qtyOnHand = qtyOnHand;
                    item.unitPrice = unitPrice;

                    getAllItems();
                    clearItemInputFields()
                    swal("Updated", "Item updated successfully!", "success");
                } else {
                    swal("Item data is safe!");
                }
            });
    }
}

function saveItem() {
    let itemCode = $("#txtItemCode").val();

    if (searchItem(itemCode.trim()) == undefined) {

        let itemName = $("#txtItemName").val();
        let qtyOnHand = $("#txtItemQtyOnHand").val();
        let unitPrice = $("#txtItemPrice").val();

        let newItem = Object.assign({}, item);

        newItem.code = itemCode;
        newItem.description = itemName;
        newItem.qtyOnHand = qtyOnHand;
        newItem.unitPrice = unitPrice;

        itemDB.push(newItem);
        clearItemInputFields()
        getAllItems();
        loadAllItemCodes();
        swal("Saved", "Item saved successfully!", "success");

    } else {
        swal("Error", "Item already exits!", "error");
    }
}

$("#btnItemSearch").click(function () {
    if ($("#txtItemSearch").val() != "") {
        let option = $("#cmbItemSearch").val();

        $("#btnItemDelete").prop("disabled", false);
        $("#btnItemUpdate").prop("disabled", false);

        if (option == "Code"){
            let itemByID = searchItemByCode($("#txtItemSearch").val());
            if (itemByID != null){
                setItemTextFieldValues(itemByID.code, itemByID.description, itemByID.qtyOnHand, itemByID.unitPrice);
            } else {
                swal("Error", "Invalid Item code!", "error");
            }
        } else if (option == "Name") {
            let itemByName = searchItemByName($("#txtItemSearch").val());
            if (itemByName != null){
                setItemTextFieldValues(itemByName.code, itemByName.description, itemByName.qtyOnHand, itemByName.unitPrice);
            } else {
                swal("Error", "Invalid Item name!", "error");
            }
        }

    } else {
        swal("Error", "Please input Item code or Item name!", "error");
    }

});

function searchItem(code) {
    return itemDB.find(function (item) {
        return item.code == code;
    });
}

function searchItemByCode(code) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == code) {

            let selectItem = Object.assign({}, item);
            selectItem.code = itemDB[i].code;
            selectItem.description = itemDB[i].description
            selectItem.qtyOnHand = itemDB[i].qtyOnHand
            selectItem.unitPrice = itemDB[i].unitPrice

            return selectItem;
        }
    }
    return null;
}

function searchItemByName(name) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].description == name) {

            let selectItem = Object.assign({}, item);
            selectItem.code = itemDB[i].code;
            selectItem.description = itemDB[i].description
            selectItem.qtyOnHand = itemDB[i].qtyOnHand
            selectItem.unitPrice = itemDB[i].unitPrice

            return selectItem;
        }
    }
    return null;
}

function getAllItems() {
    $("#tbody-item").empty();
    for (let i = 0; i < itemDB.length; i++) {
        let row = `<tr>
                <th>${itemDB[i].code}</th>
                <td>${itemDB[i].description}</td>
                <td>${itemDB[i].qtyOnHand}</td>
                <td>${itemDB[i].unitPrice}</td>
            </tr>`
        $("#tbody-item").append(row);
        bindItemEvents();
    }
    bindItemEvents();
}

function bindItemEvents() {
    $('#tbody-item>tr').click(function () {

        let itemRow = $(this);

        let itemCode = itemRow.children().eq(0).text();
        let itemName = itemRow.children().eq(1).text();
        let qtyOnHand = itemRow.children().eq(2).text();
        let unitPrice = itemRow.children().eq(3).text();

        setItemTextFieldValues(itemCode, itemName, qtyOnHand, unitPrice);
        $("#btnItemDelete").prop('disabled', false);
    });
}

function setItemTextFieldValues(code, name, qtyOnHand, unitPrice){
    $('#txtItemCode').val(code);
    $('#txtItemName').val(name);
    $('#txtItemQtyOnHand').val(qtyOnHand);
    $('#txtItemPrice').val(unitPrice);
}