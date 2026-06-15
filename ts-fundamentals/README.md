# Typescript Fundamentals

**TypeScript** is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

TypeScript stands in an unusual relationship to JavaScript. TypeScript offers all of JavaScript’s features, and an additional layer on top of these: TypeScript’s type system.

For example, JavaScript provides language primitives like string and number, but it doesn’t check that you’ve consistently assigned these. TypeScript does.

This means that your existing working JavaScript code is also TypeScript code. The main benefit of TypeScript is that it can highlight unexpected behavior in your code, lowering the chance of bugs.

## Types by Inference

TypeScript knows JavaScript and will generate types for you automatically. When you create a variable and assign a value, TypeScript uses that value as its type.

```typescript
let helloWorld = 'Hello World';
// TypeScript infers: let helloWorld: string
```

This means you get type checking without writing any extra type annotations. Visual Studio Code uses TypeScript under the hood to provide auto-completion and IntelliSense for JavaScript too.

## Defining Types

When inference isn't enough, you can describe the shape of your data explicitly.

### Interfaces

Use `interface` to define the shape of an object:

```typescript
interface User {
  name: string;
  id: number;
}

const user: User = {
  name: 'Hayes',
  id: 0,
};
```

If you provide an object that doesn't match the interface, TypeScript warns you:

```typescript
const user: User = {
  username: 'Hayes', // ❌ Error: 'username' does not exist in type 'User'
  id: 0,
};
```

### Interfaces with Classes

```typescript
interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount('Murphy', 1);
```

### Interfaces in Functions

```typescript
function deleteUser(user: User) {
  // ...
}

function getAdminUser(): User {
  // ...
}
```

### Primitive Types

TypeScript shares JavaScript's primitive types: `boolean`, `bigint`, `null`, `number`, `string`, `symbol`, `undefined`.

TypeScript adds a few more:

- `any` — allow anything (use sparingly)
- `unknown` — ensure the type is checked before use
- `never` — this type can never happen
- `void` — a function that returns nothing

## Composing Types

You can create complex types by combining simple ones.

### Unions

A union type declares that a value can be one of many types:

```typescript
type WindowStates = 'open' | 'closed' | 'minimized';
type LockStates = 'locked' | 'unlocked';
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
```

Functions can accept union types:

```typescript
function getLength(obj: string | string[]) {
  return obj.length;
}
```

Use `typeof` to narrow the type at runtime:

```typescript
function wrapInArray(obj: string | string[]) {
  if (typeof obj === 'string') {
    return [obj]; // TypeScript knows obj is a string here
  }
  return obj; // TypeScript knows obj is string[] here
}
```

### Generics

Generics provide type variables — they describe the types that an array contains:

```typescript
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```

You can declare your own generics:

```typescript
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

declare const backpack: Backpack<string>;
const object = backpack.get(); // TypeScript knows object is a string
```

## Structural Type System

TypeScript focuses on the _shape_ values have — this is called "duck typing" or "structural typing." If two objects have the same shape, they are considered the same type.

```typescript
interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

// The 'point' variable is never declared as 'Point' — but it has the same shape
const point = { x: 12, y: 26 };
logPoint(point); // logs "12, 26"
```

Shape-matching only requires a subset of the object's fields to match:

```typescript
const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"

const color = { hex: '#187ABF' };
logPoint(color); // ❌ Error: Property 'x' is missing
```

Classes and objects behave the same way — TypeScript only checks the shape:

```typescript
class VirtualPoint {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint); // logs "13, 56"
```

## Lessons

| #   | Topic                               | File                      |
| --- | ----------------------------------- | ------------------------- |
| 1   | Basic Types & Type Inference        | `src/lessons/basic-01.ts` |
| 2   | Union Types & the any Type          | `src/lessons/basic-02.ts` |
| 3   | Arrays & Objects                    | `src/lessons/basic-03.ts` |
| 4   | Functions                           | `src/lessons/basic-04.ts` |
| 5   | Functions                           | `src/lessons/basic-04.ts` |
| 5   | Optional, Default & Rest Parameters | `src/lessons/basic-05.ts` |

## Running Lessons

```bash
# Terminal
npm run run -- src/lessons/basic-01.ts

# Or use Code Runner in VS Code
```
