// Price Calculator Module
// by Kae Ramirez A00923169

const GST = 0.05;
const PST = 0.07;

const pricePerTopping = 3.00;

module.exports = class PriceCalculator {
    constructor(size, toppings) {
        if(size == "Small") {
            this.size = 8.00;
        }

        if(size == "Medium") {
            this.size = 10.00;
        }
        
        if(size == "Large") {
            this.size = 12.00;
        }

        this.numOfToppings = toppings.length + 1;
    }

    get calculateSubtotal() {
        return Math.round(this.size + ( this.numOfToppings * this.pricePerTopping), 2);
    }

    get calculateTax() {
        return Math.round(calculateSubtotal(this.size, this.numOfToppings) * (GST + PST), 2);
    }

    get calculateTotal() {
        return Math.round(calculateSubtotal(this.size, this.numOfToppings) + calculateTax(this.size, this.numOfToppings), 2);
    }
}
