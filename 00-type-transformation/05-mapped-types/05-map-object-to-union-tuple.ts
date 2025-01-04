interface Values {
  email: string;
  firstName: string;
  lastName: string;
  //   age: number; // Uncomment to test adding another property
}

// Step 2: Create the “object-of-tuples” type
type ValuesAsObject = {
  [K in keyof Values]: [K, Values[K]];
};

// Step 3: Extract the union of tuples
type ValuesAsUnionOfTuples = ValuesAsObject[keyof ValuesAsObject];

// Example usage:
function processValue(value: ValuesAsUnionOfTuples) {
  const [key, val] = value;
  console.log("Key:", key);
  console.log("Value:", val);
}

// This could be called with any valid tuple in the union:
processValue(["email", "someone@example.com"]);
processValue(["firstName", "Alice"]);
// processValue(["age", 42]); // Valid only if `age: number` is in Values
