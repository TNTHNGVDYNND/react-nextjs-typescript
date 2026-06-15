// Union Types and any Type in TypeScript
let tax: number | string = 10; // tax can be either a number or a string
tax = 100; // valid
tax = '10%'; // 'string' is also valid

let requestStatus: 'pending' | 'success' | 'error' = 'pending'; // requestStatus can only be one of these three string literals
requestStatus = 'success'; // valid

console.log('Tax:', tax);
console.log('Request Status:', requestStatus);

// NOTE: The 'any' type is a powerful escape hatch that allows you to opt out of type checking.
// Use it sparingly, as it can lead to runtime errors if not used carefully.
// "Wild fire" of types, it can be assigned any value and can be used in any way without type checking.
let notSure: any = 4; // notSure can be of any type

notSure = 'maybe a string instead'; // valid
notSure = false; // valid, can be a boolean as well

// When you use 'any', it loses all the benefits of type checking, so be cautious when using it.
console.log('notSure:', notSure); // to avoid/silent typescript errors, but it can lead to runtime errors if not used carefully.

// --─────────────────────────────────────────────

const books = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { title: '1984', author: 'George Orwell' },
  { title: 'Brave New World', author: 'Aldous Huxley' },
];

let foundBook: { title: string; author: string } | undefined;

for (let book of books) {
  if (book.title === 'To Kill a Mockingbird') {
    foundBook = book;

    foundBook.title = foundBook.title.toUpperCase();
    break;
  }
}

console.log(foundBook?.title);
console.log(foundBook?.author); // This will work because 'author' is a property of the book objects, and foundBook is not undefined at this point.
// However, if the property that doesn't exist on the book objects, it will get an error (below) because of the type definition of foundBook (which is { title: string; author: string } | undefined).
console.log(foundBook?.publisher); // This will be undefined, as 'publisher' is not a property of the book objects.
