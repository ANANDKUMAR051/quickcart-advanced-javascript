"use strict";

// Part E - Debouncing, throttling, memoization and DOM events

// Debounce waits until the user has stopped triggering an event.
function debounce(callback, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback.apply(this, args), delay);
    };
}

// Throttle allows a callback to run once during each time interval.
function throttle(callback, delay) {
    let lastRun = 0;

    return function (...args) {
        const now = Date.now();

        if (now - lastRun >= delay) {
            lastRun = now;
            callback.apply(this, args);
        }
    };
}

// The cache stays private inside the returned function's closure.
function memoize(callback) {
    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            console.log("Memoization: result from cache");
            return cache.get(key);
        }

        console.log("Memoization: fresh calculation");
        const result = callback.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

function calculateDiscount(price, percentage) {
    return price - (price * percentage) / 100;
}

const cachedDiscount = memoize(calculateDiscount);

// Task 1: Search runs after 500ms without typing.
const searchInput = document.querySelector("#searchInput");
const searchStatus = document.querySelector("#searchStatus");

const runSearch = debounce((event) => {
    const searchTerm = event.target.value.trim();
    searchStatus.textContent = searchTerm
        ? `Searching for: ${searchTerm}`
        : "Start typing to search.";
}, 500);

searchInput.addEventListener("input", runSearch);

// Task 2: Scroll event is limited to one run per 1000ms.
const scrollPanel = document.querySelector(".scroll-content");
const scrollStatus = document.querySelector("#scrollStatus");
let scrollCount = 0;

const updateScrollCount = throttle(() => {
    scrollCount += 1;
    scrollStatus.textContent = `Throttled scroll events: ${scrollCount}`;
}, 1000);

scrollPanel.addEventListener("scroll", updateScrollCount);

// Task 3: Run the same calculation twice to show the cache.
const memoButton = document.querySelector("#memoButton");
const memoStatus = document.querySelector("#memoStatus");

memoButton.addEventListener("click", () => {
    const firstResult = cachedDiscount(5000, 10);
    const secondResult = cachedDiscount(5000, 10);

    memoStatus.textContent =
        `First result: ₹${firstResult}; second result: ₹${secondResult}. Open the console to see cache messages.`;
});

// Task 4: Event bubbling demonstration.
const productList = document.querySelector("#productList");
const eventStatus = document.querySelector("#eventStatus");

// A listener on the parent receives clicks that bubble up from its children.
// Delegation also works for list items added after this listener is registered.
productList.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".remove-button");

    if (!removeButton || !productList.contains(removeButton)) {
        return;
    }

    const productItem = removeButton.closest("li");
    const productName = productItem.dataset.product;

    eventStatus.textContent = `${productName} was removed. Parent listener handled the button click.`;
    productItem.remove();
});
