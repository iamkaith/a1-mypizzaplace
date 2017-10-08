const express = require("express");
const serveStatic = require('serve-static');
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const jsonfile = require('jsonfile');
const priceCalc = require(__dirname + '/util/priceCalculator')

const port = 3000;

var config = require(__dirname + "/pizza.json");
const timeStamp = new Date().getTime().toString();

const app = express();

// uses
app.use(serveStatic(__dirname, + "/css"));
app.use(serveStatic(__dirname, + "/js"));
app.use(serveStatic(__dirname, + "/util"));
app.use( bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// create view
app.set("view engine", "ejs");

// home GET
app.get('/', function(req, res){

    // fill out the menu form
    res.render('index', {
        size1: config.size1,
        size2: config.size2,
        size3: config.size3,
        crust1: config.crust1,
        crust2: config.crust2,
        topping1: config.topping1,
        topping2: config.topping2,
        topping3: config.topping3,
        topping4: config.topping4
    });
  });


// POST
app.post('/', [ 
    check("phone", "Phone number invalid").exists().trim(), // tried using isMobilePhone("en-CA") as per documentation but it would throw an error with valid #
    check("apt").isAlphanumeric().trim(),
    check("street").exists().trim(),
    check("postal").isPostalCode("CA").trim(),
    check("email").isEmail(),
    check("size").isAlpha(),
    check("crust").isAlpha(),
    check("topping").exists(),
    check("qty").isNumeric().trim().toInt()  
  ], function (req, res, next) {  
    
    const error = req.validationErrors(req);
    
    // redirect to error page
    if(error) {
        console.log("There were form validation errors!");
        console.log(error);
        res.redirect('error');
        res.send(error)
    }
    
    // write to file, redirect to confirmation page
    if(!error) {
        let pizzaOrder = matchedData(req);
        
        console.log(timeStamp)
        var fileName = "./orders/data" + timeStamp + ".json"; 
        let fileOut = jsonfile.writeFile(fileName, pizzaOrder, function(err) {
            if(err) {
                console.log("Error writing to file!")
                console.log(err);
            }
        })
        res.redirect('order');
    }    
});

// order confirmation page
app.get('/order', function(req, res){
    
    var fileIn = require(__dirname + '/orders/data' + timeStamp + '.json');
    
    // calculator wouldn't work 
    //let calculator = new priceCalc(fileIn.size, fileIn.topping );
    //console.log(calculator)

    //let calcSub = calculator.calculateSubtotal;
    //let calcTax = calculator.calculateTax;
    //let calcTotal = calculator.calculateTotal;

    res.render('order', {
        email: fileIn.email,
        qty: fileIn.qty,
        size: fileIn.size,
        crust: fileIn.crust,
        topping: fileIn.topping,
        apt: fileIn.apt,
        street: fileIn.street,
        postal: fileIn.postal,
        phone: fileIn.phone
        //subtotal: calcSub,
        //tax: calcTax,
        //final: calcTotal
    });

});

// error page
app.get('/error', function(req, res){   
    // let calculator = new priceCalc(fileIn.size, fileIn.topping);

    res.render('error'); 
});

app.listen(port, function ready () {
    console.log("Hi, I am waiting for requests on port " + port);
});