"use strict";

// Part C - JSON handling and output-based debugging

const order = {
    orderId: 501,
    customer: "Rahul",
    amount: 5000,
    deliveryDate: undefined,
    discount: null,
    calculateTax() {
        return 500;
    }
};

const orderJSON = JSON.stringify(order);
const parsedOrder = JSON.parse(orderJSON);

console.log("Original order:", order);
console.log("JSON string:", orderJSON);
console.log("Parsed order:", parsedOrder);
console.log("Parsed order has deliveryDate:", Object.hasOwn(parsedOrder, "deliveryDate"));
console.log("Parsed order has calculateTax:", Object.hasOwn(parsedOrder, "calculateTax"));

// Q1: undefined object properties are omitted.
console.log("\nQ1:", JSON.stringify({ name: "Rahul", age: undefined }));

// Q2: undefined array entries become null.
console.log("Q2:", JSON.stringify([10, undefined, 30]));

// Q3: NaN and Infinity become null in JSON.
console.log("Q3:", JSON.stringify({ price: NaN, discount: Infinity }));

// Q4: JSON requires double-quoted property names and string values.
try {
    console.log("Q4:", JSON.parse("{name: 'Rahul', age: 25}"));
} catch (error) {
    console.log("Q4 error:", error.name);
}

// Q5: circular references cannot be converted with JSON.stringify().
const user = { name: "Rahul" };
user.self = user;

try {
    console.log("Q5:", JSON.stringify(user));
} catch (error) {
    console.log("Q5 error:", error.name);
}

// Q6: Date objects use their ISO string representation.
console.log("Q6:", JSON.stringify({ createdAt: new Date("2026-01-01") }));
