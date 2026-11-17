"use strict";

// Part A - Objects, prototypes and ES6 classes

function Product(productName, price, category) {
    this.productName = productName;
    this.price = price;
    this.category = category;
}

Product.prototype.displayProduct = function () {
    return `${this.productName} - ₹${this.price} (${this.category})`;
};

const firstProduct = new Product("Laptop", 50000, "Electronics");
const secondProduct = new Product("Mouse", 800, "Accessories");
const thirdProduct = new Product("Monitor", 12000, "Electronics");

console.log("Prototype-based products:");
[firstProduct, secondProduct, thirdProduct].forEach((product) => {
    console.log(product.displayProduct());
});

class StoreProduct {
    constructor(productName, price, category) {
        this.productName = productName;
        this.price = price;
        this.category = category;
    }

    getProductDetails() {
        return `${this.productName} costs ₹${this.price} and belongs to ${this.category}.`;
    }
}

class ElectronicProduct extends StoreProduct {
    constructor(productName, price, warrantyYears) {
        super(productName, price, "Electronics");
        this.warrantyYears = warrantyYears;
    }

    showWarranty() {
        return `${this.productName} has a ${this.warrantyYears}-year warranty.`;
    }
}

class ClothingProduct extends StoreProduct {
    constructor(productName, price, size) {
        super(productName, price, "Clothing");
        this.size = size;
    }

    showSize() {
        return `${this.productName} is available in size ${this.size}.`;
    }
}

const laptop = new ElectronicProduct("Laptop", 50000, 2);
const tShirt = new ClothingProduct("T-Shirt", 799, "M");

console.log("\nES6 class examples:");
console.log(laptop.getProductDetails());
console.log(laptop.showWarranty());
console.log(tShirt.getProductDetails());
console.log(tShirt.showSize());

// ES6 syntax used during checkout.
const getFinalPrice = (price, discountPercentage) =>
    price - (price * discountPercentage) / 100;

const customer = {
    name: "Rahul",
    email: "rahul@gmail.com",
    city: "Mumbai"
};

const { name, email } = customer;
const confirmationMessage = `Hello Rahul, your order of Laptop is confirmed. Total: ₹50000.`;

const calculateTotal = (...prices) =>
    prices.reduce((total, price) => total + price, 0);

const originalProduct = { productName: "Laptop", price: 50000, category: "Electronics" };
const discountedProduct = { ...originalProduct, price: getFinalPrice(originalProduct.price, 10) };

console.log("\nCheckout examples:");
console.log("Final price after 10% discount:", getFinalPrice(50000, 10));
console.log(confirmationMessage);
console.log("Customer:", name, email);
console.log("Total of prices:", calculateTotal(50000, 800, 1500));
console.log("Original product:", originalProduct);
console.log("Copied product with new price:", discountedProduct);
