function orderDetailInitialize() {
    getAllOrders();
}

function getAllOrders() {
    $('#tbody-orders').empty();
    for (let order of OrderDB) {
        let row = `<tr>
            <th>${order.orderId}</th>
            <td>${order.customerId}</td>
            <td>${order.orderDate}</td>
            <td>${order.total}</td>
        </tr>`

        $('#tbody-orders').append(row);
    }
}

$('#btnOrderClear').click(function () {
    getAllOrders();
    $('#txtSearchOrder').val("");
});

$('#btnOrderSearch').click(function () {
    if ($('#txtSearchOrder').val() != ""){
        let option = $('#cmbOrderSearch').val();
        if (option == "OrderID"){
            let orderList = searchOrderByOrderId($('#txtSearchOrder').val());
            if (orderList != "") {
                addSearchDataToTable(orderList);
            } else {
                swal("Error", "Invalid Order ID!", "error");
            }
        } else {
            let orderList = searchOrderByCustomerId($('#txtSearchOrder').val());
            if (orderList != "") {
                addSearchDataToTable(orderList);
            } else {
                swal("Error", "Invalid Customer ID!", "error");
            }
        }
    } else {
        swal("Error", "Please input Order ID or Customer ID!", "error");
    }
});

function addSearchDataToTable(orderList) {
    $('#tbody-orders').empty();
    for (let order of orderList) {
        let row = `<tr>
            <th>${order.orderId}</th>
            <td>${order.customerId}</td>
            <td>${order.orderDate}</td>
            <td>${order.total}</td>
        </tr>`

        $('#tbody-orders').append(row);
    }
}

function searchOrderByOrderId(orderId) {
    let orderList = [];
    for (let order of OrderDB) {
        if (order.orderId == orderId) {
            let orderRow = Object.assign({}, orders);
            orderRow.orderId = order.orderId;
            orderRow.customerId = order.customerId;
            orderRow.orderDate = order.orderDate;
            orderRow.total = order.total;

            orderList.push(orderRow);
        }
    }
    return orderList;
}

function searchOrderByCustomerId(customerId) {
    let orderList = [];
    for (let order of OrderDB) {
        if (order.customerId == customerId) {
            let orderRow = Object.assign({}, orders);
            orderRow.orderId = order.orderId;
            orderRow.customerId = order.customerId;
            orderRow.orderDate = order.orderDate;
            orderRow.total = order.total;

            orderList.push(orderRow);
        }
    }
    return orderList;
}

