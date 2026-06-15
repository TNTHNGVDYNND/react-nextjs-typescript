// ─────────────────────────────────────────────
//  Arrays and Objects in TypeScript
// ─────────────────────────────────────────────

// =====================
//  PART 1 — ARRAYS
// =====================

// ----- 1. Typed arrays (number[] and string[]) -----
let prices: number[] = [175, 42];
prices.push(34); // valid — 34 is a number
console.log('Prices:', prices);

// prices.push('hello'); // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'.

const fruits: string[] = ['apple', 'orange'];
console.log('Fruits:', fruits);

// fruits.push(true); // ❌ Error: Argument of type 'boolean' is not assignable to parameter of type 'string'.

// ----- 2. Empty array gotchas -----
// Be careful with an untyped empty array — TypeScript infers it as 'never[]' (can't add anything)
// const emptyFixed: [] = [];
// emptyFixed.push(1); // ❌ Error: Property 'push' does not exist on type '[]'.

// Be careful with an untyped empty array — TypeScript infers it as 'any[]' (loses all type safety)
const values: any[] = [];
values.push('hello'); // valid
values.push(42); // valid — but this is dangerous, the array has no consistent type
values.push(false); // valid — same problem
console.log('Values (any[]):', values);

// The fix: explicitly type the empty array
const scores: number[] = [];
scores.push(100);
scores.push(200);
console.log('Scores:', scores);

// ----- 3. Type inference with arrays (the gotcha) -----
const names = ['Peter', 'Susan'];
console.log('Names (inferred as string[]):', names);
// TypeScript infers names as string[] — but it's mutable, so you can break it

// names.push(42); // ❌ Error: Argument of type 'number' is not assignable to parameter of type 'string'.

// HOWEVER — if you assign a non-initial value with a different type, TS widens the inferred type:
// This is the gotcha the instructor warned about:
// const mixed = ['hello', 42];
// TypeScript infers this as (string | number)[] — the union type sneaks in.
// So be careful: TypeScript infers based on ALL values you put in, not just the first one.

// ----- 4. Union type arrays -----
let mixedArray: (string | boolean)[] = ['apple', true, 'orange', false];
console.log('Mixed array:', mixedArray);

// mixedArray.push(42); // ❌ Error: Argument of type 'number' is not assignable to parameter of type 'string | boolean'.

// ----- 5. Array challenge: temperatures, colors, mixed -----
const temperatures: number[] = [20, 25, 30];
// temperatures.push('hot'); // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'.
console.log('Temperatures:', temperatures);

const colors: string[] = ['red', 'green', 'blue'];
// colors.push(true); // ❌ Error: Argument of type 'boolean' is not assignable to parameter of type 'string'.
console.log('Colors:', colors);

const mixedChallenge: (number | string)[] = [1, 2, 3];
// mixedChallenge.push(true); // ❌ Error: Argument of type 'boolean' is not assignable to parameter of type 'number | string'.
console.log('Mixed challenge:', mixedChallenge);

// =====================
//  PART 2 — OBJECTS
// =====================

// ----- 6. Object type annotations (inline) -----
const car: { brand: string; year: number } = {
  brand: 'Toyota',
  year: 2024,
};
console.log('Car:', car);

// car.color = 'blue'; // ❌ Error: Property 'color' does not exist on type '{ brand: string; year: number }'.
// car.year = 'old'; // ❌ Error: Type 'string' is not assignable to type 'number'.

const car1: { brand: string; year: number } = {
  brand: 'Ford',
  year: 2022,
};
console.log('Car1:', car1);

// ----- 7. Objects challenge: bike, laptop -----
const bike: { brand: string; year: number } = {
  brand: 'Giant',
  year: 2023,
};
console.log('Bike:', bike);

const laptop: { brand: string; year: number } = {
  brand: 'Dell',
  year: 2024,
};
console.log('Laptop:', laptop);

// bike.year = 'old'; // ❌ Error: Type 'string' is not assignable to type 'number'.

// This should fail — laptop2 is missing 'year', which is required:
// const laptop2: { brand: string; year: number } = {
//   brand: 'HP',
// };
// ❌ Error: Property 'year' is missing in type '{ brand: string }' but required in type '{ brand: string; year: number }'.

// =====================
//  PART 3 — ARRAYS OF OBJECTS
// =====================

// ----- 8. Typing an array of objects -----
// Instead of typing each variable separately, we type the array once:
const items: { title: string; cost: number }[] = [];

const book = { title: 'Book', cost: 20 };
const pen = { title: 'Pen', cost: 10 };
const notebook = { title: 'Notebook' }; // no cost — this will cause an error below
console.log('Notebook (no cost):', notebook);

items.push(book);
items.push(pen);
// items.push(notebook); // ❌ Error: Property 'cost' is missing in type '{ title: string }' but required in type '{ title: string; cost: number }'.
console.log('Items:', items);

// ----- 9. Optional properties (cost?) -----
// The fix for notebook: make cost optional with '?'
const itemsFixed: { title: string; cost?: number }[] = [];

const bookFixed = { title: 'Book', cost: 20 };
const penFixed = { title: 'Pen', cost: 10 };
const notebookFixed = { title: 'Notebook' }; // cost is optional, so this is fine now

itemsFixed.push(bookFixed);
itemsFixed.push(penFixed);
itemsFixed.push(notebookFixed);
console.log('Items (with optional cost):', itemsFixed);

// ----- 10. Readonly properties -----
const itemsReadonly: { readonly title: string; cost?: number }[] = [];

itemsReadonly.push({ title: 'Book', cost: 20 });
itemsReadonly.push({ title: 'Pen', cost: 10 });

// itemsReadonly[0].title = 'New Book'; // ❌ Error: Cannot assign to 'title' because it is a read-only property.
console.log('Items (readonly title):', itemsReadonly);

// ----- 11. Products challenge -----
const product1 = { title: 'Shirt', price: 20 };
const product2 = { title: 'Pants' }; // price is optional

const products: { title: string; price?: number }[] = [];
products.push(product1);
products.push(product2);
console.log('Products:', products);

// Even though price is optional, if you provide it, it must be the correct type:
products.push({ title: 'Shoes', price: 50 }); // valid
// products.push({ title: 'Hat', price: 'cheap' }); // ❌ Error: Type 'string' is not assignable to type 'number'.

// ----- 12. Pushing objects with optional properties -----
products.push({ title: 'Socks' }); // valid — price is optional
products.push({ title: 'Jacket', price: 100 }); // valid — price is a number
console.log('Products (final):', products);

console.log(
  'All tests completed. Check for any TypeScript errors in the editor or terminal.',
);
