"use strict";

// Part B - Array methods, Map, Set and object methods

const cart = [
    { id: 101, name: "Laptop", price: 50000, qty: 1, category: "Electronics" },
    { id: 102, name: "Mouse", price: 800, qty: 2, category: "Accessories" },
    { id: 103, name: "Keyboard", price: 1500, qty: 1, category: "Accessories" },
    { id: 104, name: "Monitor", price: 12000, qty: 1, category: "Electronics" },
    { id: 105, name: "Headphones", price: 2500, qty: 2, category: "Accessories" }
];

const productsWithTotals = cart.map(({ name, price, qty }) => ({
    name,
    totalPrice: price * qty
}));

const productsAbove2000 = cart.filter((product) => product.price > 2000);

const totalCartValue = cart.reduce(
    (total, product) => total + product.price * product.qty,
    0
);

console.log("Names with total item price:");
console.table(productsWithTotals);

console.log("Products with unit price above ₹2,000:");
console.table(productsAbove2000);

console.log("Total cart value:", `₹${totalCartValue}`);

console.log("Cart item details:");
cart.forEach(({ name, category, qty }) => {
    console.log(`${name} | ${category} | Quantity: ${qty}`);
});

const electronicsTotal = cart
    .filter((product) => product.category === "Electronics")
    .reduce((total, product) => total + product.price * product.qty, 0);

console.log("Total value of Electronics products:", `₹${electronicsTotal}`);

// Map inventory: product ID is the key and product details are the values.
const inventory = new Map(cart.map((product) => [product.id, { ...product }]));

console.log("\nProduct with ID 101:", inventory.get(101));

const mouse = inventory.get(102);
if (mouse) {
    mouse.qty += 3;
    inventory.set(102, mouse);
}

inventory.delete(105);

console.log("Updated inventory:");
for (const [productId, productDetails] of inventory) {
    console.log(productId, productDetails);
}

// Set keeps only one copy of each email address.
const emailList = [
    "rahul@gmail.com",
    "priya@gmail.com",
    "rahul@gmail.com",
    "arjun@gmail.com",
    "priya@gmail.com"
];

const uniqueEmails = [...new Set(emailList)];
console.log("\nUnique email addresses:", uniqueEmails);

// Compare freeze and seal on separate copies.
const productConfig = { name: "Laptop", price: 50000, stock: 20 };
const frozenProduct = Object.freeze({ ...productConfig });
const sealedProduct = Object.seal({ ...productConfig });

console.log("\nObject.freeze() test:");
try {
    frozenProduct.price = 52000;
    frozenProduct.color = "Silver";
    delete frozenProduct.stock;
} catch (error) {
    console.log("Frozen object change:", error.message);
}
console.log(frozenProduct);

console.log("\nObject.seal() test:");
try {
    sealedProduct.price = 52000; // Existing properties can still be changed.
    sealedProduct.color = "Silver";
    delete sealedProduct.stock;
} catch (error) {
    console.log("Sealed object change:", error.message);
}
console.log(sealedProduct);
