// ─────────────────────────────────────────────
//  Challenge: TypeScript Type Operations
// ─────────────────────────────────────────────

// ----- 1. STRING variable + string method -----
let greeting: string = 'Hello, TypeScript!';
console.log('Uppercase:', greeting.toUpperCase());

// ----- 2. NUMBER variable + math operation -----
const score: number = 42;
console.log('Score + 8 =', score + 8);

// ----- 3. BOOLEAN variable + logical operation -----
const isReady: boolean = true;
console.log('isReady AND false =', isReady && false);

// ----- 4. BOOLEAN variable + logical operation -----
let age: number = 25;
age = age + 5; // This is fine because 'age' is declared with 'let' and can be reassigned.
const isGrownUp: boolean = age >= 18;
console.log('Is grown up:', isGrownUp);
// isGrownUp = true; // This will cause an error because 'isGrownUp' is a constant (const) and cannot be reassigned.
let isAdult: boolean = age >= 18;
isAdult = true; // This is fine because 'isAdult' is declared with 'let' and can be reassigned.
console.log('Is adult:', isAdult);

// ----- 5. Type inference (same tests, no annotation) -----
const inferredString = 'inferred';
const inferredNumber = 100;
const inferredBool = false;

console.log(inferredString.length); // string method
console.log(inferredNumber * 3); // math operation
console.log(inferredBool || true); // logical operation

// ----- 6. TYPE MISMATCH assignments (errors) -----
// Uncomment the lines below one at a time to see TypeScript's compiler errors.
// The errors appear in your editor or when running `tsc` / `npx tsc --noEmit`.

// ❌ const badString: string = 42;
//    → Type 'number' is not assignable to type 'string'.

// ❌ const badNumber: number = "hello";
//    → Type 'string' is not assignable to type 'number'.

// ❌ const badBool: boolean = 123;
//    → Type 'number' is not assignable to type 'boolean'.

// ❌ const alsoBad: boolean = "true";
//    → Type 'string' is not assignable to type 'boolean'.

// ❌ const inferredMismatch = "text";
//    inferredMismatch = 42;
//    → Type 'number' is not assignable to type 'string'.

// ----- 6. Type operations with potential errors -----
function greet(name: string | undefined) {
  console.log(name.toUpperCase()); // Error: Object is possibly 'undefined'.
}
// line 58 — name.toUpperCase() where name is typed as string | undefined.
// With strict: true and validation now enabled, VS Code should show a red squiggle right under .toUpperCase().

// To fix the error, Add a check for undefined:
function greetFixed(name: string | undefined) {
  if (name) {
    console.log(name.toUpperCase());
  }
}
// Lines 64-68 show the fix: the greetFixed
// function checks if (name) before calling .toUpperCase(), so no error there.

// NOTE: If you run npm run build now, you'll see the error from the original greet function, but not from greetFixed. That's because the build process runs tsc, which checks for type errors and stops if it finds any. The error in greet will cause tsc to exit with a non-zero code, preventing Vite from running and building the project. This is intentional to ensure that you don't ship code with type errors.
// npm run build
// typesscript-01@0.0.0 build
// tsc && vite build
// src/test-01.ts:58:15 - error TS18048: 'name' is possibly 'undefined'.

// 58   console.log(name.toUpperCase());
// The build script runs tsc && vite build — the && means Vite only runs if tsc exits cleanly.
// Since the error on line 58 causes tsc to exit with a non-zero code, the build stops there.
// That's actually the intended behavior in a well-configured project.
// It prevents you from shipping code with type errors. To fix it, you'd either:
// 1. Fix the type error (as shown in greetFixed), or
// 2. Use a type assertion:
function greetWithAssertion(name: string | undefined) {
  console.log((name as string).toUpperCase());
}

const maybeName: string = 'Alice';
greet(maybeName); // This call is fine (string is assignable to string | undefined).
                  // The compile-time error is inside the function body on line 58.
greetFixed(maybeName);
greetWithAssertion(maybeName);

console.log(
  'All tests completed. Check for any TypeScript errors in your editor or terminal.',
);

// The pipeline works like this:
// Write code → tsc checks types → build fails if errors → fix errors → build passes → ship with confidence
// Every red squiggle during development or build failure in CI is TypeScript saving you from a potential runtime crash.
// That's why large projects (and increasingly small ones too) treat TypeScript as a standard part of the toolchain — not just for the safety, but for the developer experience too.
// Autocomplete, Go to Definition, and Refactor all work much better when the editor knows exactly what shape every value has.
