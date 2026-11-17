"use strict";

// Part F - Final QuickCart order integration

class Product {
    constructor(id, name, price, qty) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.qty = qty;
    }

    getTotal() {
        return this.price * this.qty;
    }
}

const products = [
    new Product(1, "Laptop", 50000, 1),
    new Product(2, "Mouse", 1000, 2),
    new Product(3, "Monitor", 15000, 1),
    new Product(4, "Keyboard", 2000, 1)
];

const customer = {
    name: "Rahul",
    email: "rahul@gmail.com"
};

const { name: customerName, email: customerEmail } = customer;

// map() calculates each line total from the product data.
const productTotals = products.map(({ name, price, qty }) => ({
    name,
    total: price * qty
}));

// filter() selects products whose unit price is greater than ₹5,000.
const higherPricedProducts = products.filter((product) => product.price > 5000);

// reduce() calculates the complete order amount.
const orderTotal = products.reduce(
    (total, product) => total + product.getTotal(),
    0
);

const uniqueProductIds = new Set(products.map((product) => product.id));
const inventory = new Map(products.map((product) => [product.id, product]));

const orderConfig = Object.freeze({
    currency: "INR",
    deliveryType: "Standard",
    customerEmail
});

const order = {
    orderId: 501,
    customer: customerName,
    items: productTotals,
    total: orderTotal,
    status: "Processing"
};

const orderJSON = JSON.stringify(order);

async function confirmOrder() {
    console.log("Order Status: Processing...");

    try {
        // Mock asynchronous confirmation from the order service.
        await new Promise((resolve) => setTimeout(resolve, 1000));
        order.status = "Confirmed Successfully!";
        console.log(`Order Status: ${order.status}`);
    } catch (error) {
        order.status = "Confirmation Failed";
        console.error("Order confirmation failed:", error);
    }
}

async function displayOrderSummary() {
    console.log("====== QUICKCART ORDER SUMMARY ======");
    console.log(`Customer: ${customerName}`);
    console.log("Products:");

    productTotals.forEach(({ name, total }) => {
        console.log(`${name} - ₹${total}`);
    });

    console.log(`Total Order Amount: ₹${orderTotal}`);
    console.log(`Unique Products: ${uniqueProductIds.size}`);

    // These values are calculated above and kept available for inspection.
    console.log("Products above ₹5,000:", higherPricedProducts.map((product) => product.name));
    console.log("Inventory entries:", inventory.size);
    console.log("Frozen order configuration:", Object.isFrozen(orderConfig));
    console.log("Order JSON:", orderJSON);

    await confirmOrder();
    console.log("=====================================");
}

displayOrderSummary();
