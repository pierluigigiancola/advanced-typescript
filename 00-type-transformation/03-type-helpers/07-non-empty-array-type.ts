// 1. Define a non-empty array type that enforces at least one element:
type NonEmptyArray<T> = [T, ...T[]];

// 2. A sample function that relies on having a non-empty array:
function makeEnum<T extends string>(values: NonEmptyArray<T>) {
  // Here we can confidently operate knowing `values` has at least one element.
  return values.reduce((acc, val) => {
    acc[val] = val;
    return acc;
  }, {} as Record<T, T>);
}

// Usage examples:

// This is allowed:
const colorEnum = makeEnum(["RED", "GREEN", "BLUE"]);

// This is also allowed (just one element is fine):
const singleValueEnum = makeEnum(["ONLY_ONE"]);

// This will produce a type error if uncommented, 
// because an empty array doesn't satisfy NonEmptyArray<T>:
const emptyEnum = makeEnum([]);
