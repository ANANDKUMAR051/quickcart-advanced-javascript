# QuickCart - Advanced JavaScript Practical Assignment

## Overview
This project implements the six parts of the Advanced JavaScript Practical Assignment. It uses the QuickCart shopping and order-management scenario to demonstrate modern JavaScript, asynchronous programming, performance techniques and DOM events.

## Technologies
- HTML5
- CSS3
- Modern JavaScript (ES6+)
- Node.js (for running the JavaScript exercises)
- No frameworks or external libraries

## Project structure
```text
quickcart-advanced-javascript/
├── part-a-objects-classes/
│   └── products.js
├── part-b-array-methods/
│   └── shopping-cart.js
├── part-c-json-debugging/
│   └── json-handling.js
├── part-d-asynchronous/
│   └── order-processing.js
├── part-e-optimization-events/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── part-f-integration/
│   └── quickcart.js
└── README.md
```

## How to run

### Parts A, B, C, D and F
Install Node.js if it is not already installed. Open a terminal in the project folder and run each file separately:

```bash
node part-a-objects-classes/products.js
node part-b-array-methods/shopping-cart.js
node part-c-json-debugging/json-handling.js
node part-d-asynchronous/order-processing.js
node part-f-integration/quickcart.js
```

Part D contains timers and runs several asynchronous examples, so it takes a little longer to finish.

### Part E
Open `part-e-optimization-events/index.html` in a browser. Try typing in the search box, scrolling inside the scroll panel, clicking the memoization button and removing products from the list. Open the browser developer console to see the memoization messages.

## Part-by-part notes

### Part A - Objects, Prototypes and ES6 Classes
- Creates products with a constructor function.
- Adds `displayProduct()` to the constructor's prototype so instances share the method.
- Demonstrates a base class and two child classes using `extends` and `super()`.
- Uses arrow functions, template literals, destructuring, rest parameters and spread syntax.

**Concept checks**
1. A prototype method is shared by instances instead of creating a separate function on every instance.
2. `prototype` is a property on constructor functions used when creating instances. `__proto__` refers to an object's prototype (the accessor is legacy; `Object.getPrototypeOf()` is preferred).
3. If a property is not found on an object, JavaScript checks its prototype chain. If it is not found there either, the result is `undefined` (or a `ReferenceError` for an undeclared identifier).
4. `extends` sets up class inheritance. In a derived constructor, `super()` initializes the parent part and must run before accessing `this`.
5. ES6 classes use JavaScript's prototype-based inheritance; they provide cleaner syntax rather than a separate inheritance system.

### Part B - Higher-Order Functions, Map, Set and Object Methods
- Uses `map`, `filter`, `reduce` and `forEach` on the provided cart.
- Builds an inventory `Map` and removes duplicate emails with `Set`.
- Compares a frozen object with a sealed object.

**Concept checks**
1. `map()` returns a new array containing transformed values; `forEach()` runs a callback for each item and returns `undefined`.
2. `filter()` does not modify the original array; it returns a new array containing matching items.
3. `reduce()` combines array values into one accumulated result, which is useful for totals.
4. `map()` and `filter()` both return new arrays; `map()` transforms each item while `filter()` selects items.
5. A `Map` accepts keys of any type, including objects, and has methods such as `get`, `set` and `delete`. A plain object uses property keys (strings or symbols).
6. A `Set` stores unique values and preserves insertion order.
7. `Object.freeze()` prevents adding, removing or changing own properties. `Object.seal()` prevents adding or removing properties, but existing writable properties can still change.
8. A normal freeze is shallow: nested objects are not automatically frozen. Shallow freezing applies only to the object's own top-level properties.

### Part C - JSON Handling and Output-Based Debugging
- Converts an order object to JSON and parses it again.
- Shows the behavior of `undefined`, `NaN`, `Infinity`, invalid JSON, circular references and Date objects.

**Output notes**
- An `undefined` object property and function-valued property are omitted by `JSON.stringify()`.
- An `undefined` array element becomes `null`.
- `NaN` and `Infinity` become `null`.
- The invalid JSON example throws a `SyntaxError` because JSON requires double quotes around property names and string values.
- A circular reference throws a `TypeError`.
- A Date is serialized as an ISO date-time string.

### Part D - Asynchronous JavaScript
- Shows the event-loop ordering of synchronous code, Promise microtasks and timer callbacks.
- Runs sequential callback, Promise-chain and async/await order flows.
- Compares `Promise.all`, `Promise.allSettled`, `Promise.race` and `Promise.any`.

**Concept checks**
1. Promise reactions are microtasks; `setTimeout` callbacks are tasks (often called macrotasks). The microtask queue is processed before the next timer task.
2. The call stack runs synchronous JavaScript. The event loop coordinates when queued callbacks can run after the stack is clear.
3. Callback hell is difficult to maintain because nested callbacks make control flow, error handling and reuse harder to follow.
4. `Promise.all()` fulfills when all fulfill and rejects as soon as one rejects. `Promise.allSettled()` waits for every input to settle and reports each result.
5. `Promise.race()` settles with the first input to settle, whether fulfilled or rejected. `Promise.any()` fulfills with the first fulfilled input and rejects with an `AggregateError` if all inputs reject.

### Part E - Performance Optimization and DOM Events
- Debounces search input by 500 milliseconds.
- Throttles the scroll handler to at most once per 1,000 milliseconds.
- Memoizes discount calculations using a `Map` held in a closure.
- Uses a single parent click listener for product removal (event delegation).

**Concept checks**
1. Debouncing waits until events stop for the specified delay. Throttling limits how often a callback can run during repeated events.
2. Debouncing is useful for search suggestions; throttling is useful for frequent scroll and resize events.
3. Memoization stores previous results so repeated calls with the same arguments can reuse a result. The closure keeps the cache available between calls.
4. Event bubbling moves an event from the target element up through its ancestors. Event delegation handles child events from a parent listener and is useful for elements added later.
5. `event.stopPropagation()` prevents the event from continuing through the propagation path. `event.target` is the original event target; `event.currentTarget` is the element whose listener is currently running.

### Part F - Final Integration Challenge
- Uses a `Product` class, destructuring and the requested array methods.
- Creates a `Set` of unique IDs and a `Map` for inventory.
- Freezes the order configuration, serializes the order and confirms it asynchronously with `async`/`await` and `try`/`catch`.
- Computes the order total from the product data; it does not hardcode the expected total.

## Notes
- Run each Node.js file separately so the output for each assignment part is easy to review.
- The Part E page is a browser exercise; use the developer console to inspect its messages.
- Review the code and make sure you can explain each concept and output before submitting. Follow your instructor's rules for attribution and submission.
