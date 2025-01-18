{
  // Uppercase, Lowercase, Capitalize
  const text = "hello world";
  type TUppercase = Uppercase<typeof text>;
  type TLowercase = Lowercase<typeof text>;
  type TCapitalize = Capitalize<typeof text>;

  // Mapped Types
  type ObjectUnion = {
    foo: string;
  } & {
    bar: string;
  };

  type Prettify<T> = {
    [K in keyof T]: T[K];
  };

  type Pretty = Prettify<ObjectUnion>;

  
}
