const express = require("express");
const serveStatic = require('serve-static');
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const jsonfile = require("jsonfile");

const port = 8080;

var config = require(__dirname + "/pizza.json");

const app = express();

// uses
app.use(serveStatic(__dirname, + "/css"));
app.use( bodyParser.urlencoded({ extended: false }))
app.use(expressValidator());


// create view
app.set("view engine", "ejs");

// map form 
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
        topping4: config.topping4,
        errors: null
    });
  });


// POST
app.post('/', [
    check("phone", "Phone number invalid").isMobilePhone("en-CA").trim(),
    check("apt").exists().trim(),
    check("street").exists("en-CA").trim(),
    check("postal").isPostalCode("CA").trim(),
    check("email").isEmail(),
    check("size").isAlpha(),
    check("crust").isAlpha(),
    check("topping").exists(),
    check("qty").isNumeric().trim().toInt()  
  ], (req, res, next) => {
    
    const error = validationErrors(req);
    if(!error.isEmpty()) {
        console.log("There were form validation errors!")
        console.log(error)
    }
    
    let pizzaOrder = matchedData(req);
    
    var fileName = "./orders/data" + new Date().getMilliseconds() + ".json"; 
    var fileIO = jsonfile.writeFile(fileName, pizzaOrder, function(err) {
        if(err) {
            console.log("Error writing to file!")
            console.log(err);
        }
    })
    
})


app.listen(port, function ready () {
    console.log("I am waiting for requests on port 8080....");
});