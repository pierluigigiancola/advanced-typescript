{// The Maybe type that takes a generic T, which must extend {}
// This means T can be anything that isn't null or undefined.
type Maybe<T extends {}> = T;

// Examples:

// Works fine: string is not null or undefined
const maybeString: Maybe<string> = "Hello World";

// Works fine: number is allowed
const maybeNumber: Maybe<number> = 0;

// Also works: boolean is allowed
const maybeBoolean: Maybe<boolean> = false;

// Objects are allowed
const maybeObject: Maybe<{ wow: boolean }> = { wow: true };

// Arrays are allowed
const maybeArray: Maybe<string[]> = ["apple", "banana"];

// This fails: null is not allowed
const maybeNull: Maybe<null> = null;       // Error!

// This fails: undefined is not allowed
const maybeUndefined: Maybe<undefined> = undefined; // Error!
}