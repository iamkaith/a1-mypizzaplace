$(function ready() {
    
        $.getJSON("/api/orders", function (data) {
            
            $('#orders').append('<tr><td> Order# </td><td> Size </td><td> Crust </td><td> Toppings </td><td> Contact Name </td></tr>');
            data.forEach(function (order) {

                $('#orders').append('<tr><td>'+ order.number + '</td><td>' + order.size + '</td><td>' + order.crust + '</td><td>' + order.topping + '</td><td>' 
                + order.name +   '</td></tr>' );
            });
        });
    
    });