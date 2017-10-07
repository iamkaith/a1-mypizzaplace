const {check, result } = require("express-validator/check");
const matchedData = require("express-validator/filter")

module.exports.pizzaOrder = function(req, callback) {
    check("phone").isMobilePhone().trim(),
    check("street").isAlphanumeric().trim(),
    check("postal").isPostalCode().trim(),
    check("email").isEmail().trim().normalizeEmail()
    check("size").isAlpha().trim(),
    check("crust").isAlpha().trim(),
    check("topping").isNumeric().trim().toInt(),
    check("qty").isNumeric().trim().toInt()  
}