// ─────────────────────────────────────────────
//  Optional, Default & Rest Parameters
// ─────────────────────────────────────────────

// =====================
//  PART 1 — OPTIONAL PARAMETERS
// =====================

// ----- 1. Optional parameter with fallback -----
// Add `?` to make a parameter optional.
// The function MUST still work when the optional param is not supplied.

function calculatePrice(price: number, discount?: number): number {
  // discount could be undefined, so we provide a fallback
  const discountValue = discount || 0;
  return price - discountValue;
}

const priceAfterDiscount = calculatePrice(100, 20);
console.log('Price after discount (100 - 20):', priceAfterDiscount); // 80

const priceWithoutDiscount = calculatePrice(100);
console.log('Price without discount:', priceWithoutDiscount); // 100

// =====================
//  PART 2 — DEFAULT PARAMETERS
// =====================

// ----- 2. Default parameter value -----
// Unlike optional (?), default parameters don't need a fallback in the body.
// TypeScript uses the default when the argument is omitted.

function calculateScore(initialScore: number, penaltyPoints = 0): number {
  return initialScore - penaltyPoints;
}

const scoreAfterPenalty = calculateScore(100, 20);
console.log('Score after penalty (100 - 20):', scoreAfterPenalty); // 80

const withoutPenalty = calculateScore(100);
console.log('Score without penalty:', withoutPenalty); // 100

// Key difference: optional needs a fallback in the body,
// default handles it automatically.

// =====================
//  PART 3 — REST PARAMETERS
// =====================

// ----- 3. Rest parameter collects multiple arguments into an array -----
// Syntax: `...name: type[]`
// All arguments after the named ones are collected into the array.

function sum(message: string, ...numbers: number[]): string {
  const total = numbers.reduce((previous, current) => previous + current, 0);
  return `${message} ${total}`;
}

const result = sum('The total is:', 1, 2, 3, 4, 5);
console.log('Sum result:', result); // "The total is: 15"

// ----- 4. TypeScript is smart in callbacks -----
// Inside the sum function, TypeScript knew `numbers` was a number[]
// and inferred each callback parameter automatically.
// We can see this when we call .map() or .reduce() — no explicit types needed.

function doubleNumbers(...nums: number[]): number[] {
  return nums.map((n) => n * 2); // TypeScript infers n is number
}

console.log('Doubled [1, 2, 3]:', doubleNumbers(1, 2, 3));

// =====================
//  PART 4 — VOID RETURN TYPE
// =====================

// ----- 5. void means the function returns nothing -----
// void is a special type representing the absence of a value.

function logMessage(message: string): void {
  console.log(message);
}

logMessage('Hello TypeScript');

// If you accidentally return something, TypeScript catches it:
// function logMessage(message: string): void {
//   return 'hello world'; // ❌ Error: Type 'string' is not assignable to type 'void'.
// }

// =====================
//  PART 5 — UNION TYPES & TYPE GUARDS
// =====================

// ----- 6. Function with union parameter and type guard -----
// When a parameter can be multiple types, use typeof to narrow it at runtime.

function processInput(input: string | number): void {
  if (typeof input === 'number') {
    // TypeScript knows input is a number here
    console.log(input * 2);
  } else {
    // TypeScript knows input is a string here
    console.log(input.toLowerCase());
  }
}

processInput(42); // 84
processInput('Hello'); // 'hello'

console.log(
  'All tests completed. Check for any TypeScript errors in the editor or terminal.',
);
