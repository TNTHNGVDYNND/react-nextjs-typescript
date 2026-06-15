// ─────────────────────────────────────────────
//  Functions in TypeScript
// ─────────────────────────────────────────────

// =====================
//  PART 1 — FUNCTION PARAMETERS
// =====================

// ----- 1. Why we MUST use TypeScript in functions -----
// With strict: true (default), TypeScript requires type annotations on parameters.
// Without a type, TypeScript complains: "Parameter 'name' implicitly has an 'any' type."

// ❌ This would cause a compile error in strict mode:
// function sayHi(name) {
//   console.log(`Hello, ${name}`);
// }
// Error: Parameter 'name' implicitly has an 'any' type.

// ----- 2. Three options for handling parameter types -----

// Option A: Set type to any (works, but defeats the purpose of TypeScript)
// function sayHi(name: any) {
//   console.log(`Hello, ${name}`);
// }
// With 'any', you can pass anything — no type safety at all.

// Option B: Disable strict mode in tsconfig.json (set "strict": false)
// TypeScript won't complain about implicit any, but you lose all type checking.
// NOT recommended.

// Option C (best): Set the proper type annotation ✅
function sayHi(name: string) {
  console.log(`Hello there, ${name.toUpperCase()}`);
}

sayHi('John');
// sayHi(3); // ❌ Error: Argument of type 'number' is not assignable to parameter of type 'string'.

// ----- 3. Extra parameters cause errors -----
// sayHi('John', 'extra'); // ❌ Error: Expected 1 arguments, but got 2.

// ----- 4. Inside the function body, only type-safe operations are allowed -----
function processValue(value: string) {
  console.log(value.toUpperCase()); // ✅ string method
  // console.log(value.toFixed(2)); // ❌ Error: Property 'toFixed' does not exist on type 'string'.
}

processValue('hello');

// =====================
//  PART 2 — FUNCTION RETURN TYPES
// =====================

// ----- 5. Explicit return type annotation -----
// Syntax: after the parentheses, add `: returnType` before the opening brace.

function calculateDiscount(price: number): number {
  return price * 0.9;
}

const finalPrice = calculateDiscount(200);
console.log('Final price:', finalPrice); // 180

// ----- 6. TypeScript infers the return type -----
// Even without the explicit `: number`, TypeScript infers it from the return statement.
// But explicit return types are still a good practice because:

// Reason 1: Catches forgotten or wrong returns
function calculateDiscountSafe(price: number): number {
  // const hasDiscount = true;
  // if (hasDiscount) {
  //   return 'discount applied'; // ❌ Error: Type 'string' is not assignable to type 'number'.
  // }
  return price * 0.9;
}

console.log('Safe discount:', calculateDiscountSafe(100));

// Reason 2: Makes the function contract clear to other developers
// Anyone reading the signature knows exactly what goes in and what comes out.

// ----- 7. Return type with multiple paths -----
function getDiscountMessage(hasDiscount: boolean): string | number {
  if (hasDiscount) {
    return 'discount applied';
  }
  return 0;
}

console.log(getDiscountMessage(true)); // 'discount applied'
console.log(getDiscountMessage(false)); // 0

// =====================
//  PART 3 — THE `any` TRICKLE-DOWN GOTCHA
// =====================

// ----- 8. How `any` spreads through your code -----
// This is a demonstration of why `any` is dangerous.

function addThree(input: any): any {
  const number: number = 3;
  return input + number;
}

const result = addThree(3); // result is type 'any'
const someValue = result; // someValue is also type 'any'
console.log('someValue:', someValue);

// someValue.myMethod(); // Compiles fine with 'any', but crashes at runtime!
// "someValue.myMethod is not a function"

// The chain: input (any) → result (any) → someValue (any)
// Even though the math is clearly number + number = number,
// TypeScript can't help you because `any` poisons the entire chain.

// console.log('someValue:', someValue.myMethod); // undefined — runtime error if called as a function

// =====================
//  PART 4 — CHALLENGE: isNameInList
// =====================

// ----- 9. Challenge: check if a name is in an array -----
const names: string[] = ['John', 'Jane', 'Jim', 'Jill'];

function isNameInList(name: string): boolean {
  return names.includes(name);
}

const nameToCheck = 'Jane';

if (isNameInList(nameToCheck)) {
  console.log(`${nameToCheck} is in the list`);
} else {
  console.log(`${nameToCheck} is not in the list`);
}

// Test with a name not in the list
const nameToCheck2 = 'Peter';

if (isNameInList(nameToCheck2)) {
  console.log(`${nameToCheck2} is in the list`);
} else {
  console.log(`${nameToCheck2} is not in the list`);
}

console.log(
  'All tests completed. Check for any TypeScript errors in the editor or terminal.',
);
