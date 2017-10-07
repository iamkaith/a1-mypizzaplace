// Price Calculator Module
// by Kae Ramirez A00923169

const GST = 0.05;
const PST = 0.07;

const pricePerTopping = 3.00;
const small = 8.00;
const medium = 10.00;
const large = 12.00;

module.exports = class PriceCalculator {
    constructor(size, toppings) {
        this.size = size;
        this.toppings = toppings;
    }

    calculateSubtotal(size, toppings) {
        return size + (toppings*pricePerTopping);
    }

    calculateTax(size, toppings) {
        calculateSubtotal(size, toppings) * (GST + PST);
    }

    calculateTotal(size, toppings) {
        return calculateSubtotal(size, toppings) + calculateTax(size, toppings);
    }
}