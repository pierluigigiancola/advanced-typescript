type Maybe<T> = T | null | undefined;

// Step 2: Create an Example type to test Maybe
type Example = Maybe<string>;

// Example should now be string | null | undefined
// You can also try other types:
type AnotherExample = Maybe<number>; // number | null | undefined
type CrazyExample = Maybe<any>;     // any (since any absorbs the union)
type UnknownExample = Maybe<unknown>; // unknown (since unknown absorbs the union)