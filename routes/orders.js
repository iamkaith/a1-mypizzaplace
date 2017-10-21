let express = require('express');
let order = require('../model/Order');
const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');



let router = express.Router();
let orders = [];

var orderNumber = 1;

// order page index
router.get('/', function(req, res){

    console.log("i am first");

    var vm = {title : "Place Your Order"};
    res.render('index', vm);
});

// order list
router.get('/orders', function(req, res){

    console.log("i am second");

    var vm = {title : "Orders List"};
    res.render('orders', vm);
});

//REST Endpoint

router.post('/api/order', [
    check("size").isAlpha(),
    check("crust").isAlpha(),
    check("topping").exists(),
    check("name").exists().trim(),
    check("address").exists().trim(),
    check("city").isAlpha().trim(),
    check("postal").isPostalCode("CA").trim(),
    check("phone", "Phone number invalid").exists().trim(), 
    check("email").isEmail().trim()
    
    ], function(req, res, next){
    
    const error = req.validationErrors(req);
    
    // redirect to error page
    if(error) {
        console.log("ERROR: form validation errors!");
        console.log(error);
    }    

    if(!error) {
        //var order = req.body;
        console.log("NOTE: no validation errors");
        var order = matchedData(req);
        order.number = orderNumber;

        console.log("Received add order request", order);
        
        orders.push(order);
        res.json({status : "Successfully added a order"});
    
        orderNumber++;
    }    
});


router.get('/api/orders', function(req, res){
    console.log("getting order list");
    res.json(orders);
});

router.get('/api/orders/:orderid', function(req, res){
    // todo
});

module.exports = router;