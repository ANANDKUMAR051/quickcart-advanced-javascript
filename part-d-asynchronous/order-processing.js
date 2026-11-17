"use strict";

// Part D - Asynchronous JavaScript

const wait = (duration) =>
    new Promise((resolve) => setTimeout(resolve, duration));

// Task 1: Event loop output order.
function showEventLoopOrder() {
    console.log("Order Started");
    setTimeout(() => console.log("Payment Processing"), 0);
    Promise.resolve().then(() => console.log("Payment Successful"));
    console.log("Order Completed");
}

// Task 2: Callback-based order steps.
function validateOrder(callback) {
    setTimeout(() => {
        console.log("Order Validated");
        callback();
    }, 1000);
}

function processPayment(callback) {
    setTimeout(() => {
        console.log("Payment Completed");
        callback();
    }, 1000);
}

function sendConfirmation(callback) {
    setTimeout(() => {
        console.log("Confirmation Sent");
        if (callback) callback();
    }, 1000);
}

function placeOrderWithCallbacks() {
    validateOrder(() => {
        processPayment(() => {
            sendConfirmation(() => console.log("Callback order flow finished."));
        });
    });
}

// Task 3: Promise-based versions.
function validateOrderPromise() {
    return wait(1000).then(() => {
        console.log("Order Validated");
        return "Order is valid";
    });
}

function processPaymentPromise() {
    return wait(1000).then(() => {
        console.log("Payment Completed");
        return "Payment is complete";
    });
}

function sendConfirmationPromise() {
    return wait(1000).then(() => {
        console.log("Confirmation Sent");
        return "Confirmation sent";
    });
}

function placeOrderWithPromises() {
    return validateOrderPromise()
        .then(() => processPaymentPromise())
        .then(() => sendConfirmationPromise())
        .then((message) => console.log(message))
        .catch((error) => console.error("Promise order failed:", error));
}

// Task 4: Async/await version.
async function placeOrder() {
    try {
        console.log("\nStarting async order...");
        await wait(1000);
        console.log("Order Validated");
        await wait(1000);
        console.log("Payment Completed");
        await wait(1000);
        console.log("Confirmation Sent");
        console.log("Order placed successfully!");
    } catch (error) {
        console.error("Unable to place order:", error);
    }
}

// Task 5: Mock APIs and Promise combinators.
function productsAPI() {
    return wait(1000).then(() => "Products Loaded");
}

function paymentAPI() {
    return wait(1500).then(() => Promise.reject("Payment Service Failed"));
}

function deliveryAPI() {
    return wait(2000).then(() => "Delivery Loaded");
}

async function runPromiseCombinators() {
    console.log("\nPromise.all():");
    try {
        const allResults = await Promise.all([
            productsAPI(),
            paymentAPI(),
            deliveryAPI()
        ]);
        console.log(allResults);
    } catch (error) {
        console.log("One request failed:", error);
    }

    console.log("\nPromise.allSettled():");
    const settledResults = await Promise.allSettled([
        productsAPI(),
        paymentAPI(),
        deliveryAPI()
    ]);
    console.log(settledResults);

    console.log("\nPromise.race():");
    try {
        const firstSettled = await Promise.race([
            productsAPI(),
            paymentAPI(),
            deliveryAPI()
        ]);
        console.log(firstSettled);
    } catch (error) {
        console.log("First settled request was rejected:", error);
    }

    console.log("\nPromise.any():");
    try {
        const firstSuccessful = await Promise.any([
            productsAPI(),
            paymentAPI(),
            deliveryAPI()
        ]);
        console.log(firstSuccessful);
    } catch (error) {
        console.log("Every request failed:", error.errors);
    }
}

async function runAllExamples() {
    console.log("TASK 1 - EVENT LOOP");
    showEventLoopOrder();

    console.log("\nTASK 2 - CALLBACKS");
    placeOrderWithCallbacks();

    console.log("\nTASK 3 - PROMISE CHAIN");
    await placeOrderWithPromises();

    console.log("\nTASK 4 - ASYNC/AWAIT");
    await placeOrder();

    console.log("\nTASK 5 - PROMISE COMBINATORS");
    await runPromiseCombinators();
}

runAllExamples();
