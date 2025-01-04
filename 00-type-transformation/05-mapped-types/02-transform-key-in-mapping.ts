{
  // 1. Define the Attributes type
  type Attributes = {
    firstName: string;
    lastName: string;
    age: number;
  };

  // 2. Use 'as' to remap Keys (K) to a new key: `get${Capitalize<K>}`
  //    This will create types like { getFirstName: () => string; getLastName: () => string; getAge: () => number }
  type AttributeGetters = {
    [K in keyof Attributes as `get${Capitalize<K>}`]: () => Attributes[K];
  };

  // 3. Example usage
  const myAttributes: Attributes = {
    firstName: "Jane",
    lastName: "Doe",
    age: 25,
  };

  // Create an object that satisfies AttributeGetters
  const attributeGetters: AttributeGetters = {
    getFirstName: () => myAttributes.firstName,
    getLastName: () => myAttributes.lastName,
    getAge: () => myAttributes.age,
  };

  // 4. Demonstrate calling the getters
  console.log(attributeGetters.getFirstName());
  console.log(attributeGetters.getLastName());
  console.log(attributeGetters.getAge());
}
