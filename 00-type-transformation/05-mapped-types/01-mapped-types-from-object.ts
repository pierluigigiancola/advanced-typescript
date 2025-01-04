interface Attributes {
  firstName: string;
  lastName: string;
  age: number;
}

/**
 * - K in keyof Attributes iterates over each property key from Attributes.
 * - For each key K, we say the value is () => Attributes[K]—a function returning whatever type Attributes[K] is (e.g., string for firstName and lastName, number for age).
 */
type AttributeGetters = {
  [K in keyof Attributes]: () => Attributes[K];
};

function createGetters(attributes: Attributes): AttributeGetters {
  return {
    firstName: () => attributes.firstName,
    lastName: () => attributes.lastName,
    age: () => attributes.age,
  };
}

const myAttributes: Attributes = {
  firstName: "Alice",
  lastName: "Smith",
  age: 30,
};

const getters = createGetters(myAttributes);

console.log(getters.firstName()); // string
console.log(getters.lastName()); // string
console.log(getters.age()); // number

// Little stretch: combine with generics

type AttributeGettersGeneric<T> = {
  [K in keyof T]: () => T[K];
};

function createGettersGeneric<T extends Record<string, any>>(attributes: T) {
  return Object.fromEntries(
    Object.keys(attributes).map((key) => [key, () => attributes[key]])
  ) as AttributeGettersGeneric<T>;
}

const myAttributesGeneric = {
  firstName: "Alice",
  lastName: "Smith",
  age: 30,
};

const gettersGeneric = createGettersGeneric(myAttributesGeneric);

console.log(gettersGeneric.firstName()); // "string"
console.log(gettersGeneric.lastName()); // "string"
console.log(gettersGeneric.age()); // "number"
