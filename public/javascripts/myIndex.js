$(function ready() {
    $("#submitForm").submit(function (event) {
        event.preventDefault();

        var newOrder = JSON.stringify({
            size: $('.size').val(),
            crust: $('.crust').val(),
            topping: $('.topping:checked').map(function() { //all checked toppings
                return this.value + " ";
            }).get(),
            name: $('#firstName').val() + " " + $('#lastName').val(),
            address: $('#address1').val(),
            city: $('#city').val(),
            postal: $('#postal').val(),
            phone: $('#phone').val(),
            email: $('#email').val()


            /*
            contact: $('.contact:text').map(function() { // contact information
                return this.value + " ";
            })
            */
        });

        console.log("index.js " + newOrder);

        $.ajax({
            url: '/api/order',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: newOrder,
            success: function (json, status, request) {
                //$('#cost').addClass('alert alert-success');
                $('#statusMsg').html('Added the order');
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-success');
                $('#statusMsg').html('Added the order');
            },

            error: function (request, status) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-danger');
                $('#statusMsg').html('Error adding the order, please refresh the page and try again');
                console.log('Request failed : ', status);
            }
        });

    });
});