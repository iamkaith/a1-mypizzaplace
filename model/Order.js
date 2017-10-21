module.exports = class Order {
    constructor(body) {
        this.number = body.number;
        this.size = body.size;
        this.crust = body.crust;
        this.topping = body.topping;
        this.name = body.name;
        this.address = body.address1;
        this.city = body.city;
        this.postal = body.postal;
        this.phone = body.phone;
        this.email = body.email;
    }
}