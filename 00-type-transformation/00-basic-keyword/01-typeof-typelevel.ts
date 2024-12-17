// Value Level: Define a constant object
const person = {
  name: "Alice",
  age: 30,
};

// Type Level: Use 'typeof' to bring 'person' into the type level
type Person = typeof person;

// Now 'Person' is a type that can be used elsewhere
const anotherPerson: Person = {
  name: "Bob",
  age: 25,
};

// This will cause a type error because 'age' should be a number
const invalidPerson: Person = {
  name: "Charlie",
  age: "thirty-five", // Error: Type 'string' is not assignable to type 'number'
};
