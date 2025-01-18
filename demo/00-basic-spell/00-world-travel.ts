{
  // typeof https://www.typescriptlang.org/docs/handbook/2/typeof-types.html#handbook-content
  const greet = (arg: string) => `hello ${arg}`;
  type Greet = typeof greet;

  // generics https://www.typescriptlang.org/docs/handbook/2/generics.html#working-with-generic-type-variables
  const greet2 = <T>(arg: T) => `hello ${arg}`;
  greet("gg");
  greet2("gg");
  greet2(12);

  // const type parameter: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#const-type-parameters
  const greet3 = <const T>(arg: T) => `hello ${arg}`;
  greet3("gg");

  // as const https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
  const greet4 = <const T extends string>(arg: T) => `hello ${arg}` as const;
  greet4("gg");

  // Module Augmentation: https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
  interface Register {
    // router: Router
  }

  type RegisteredRouter = Register extends {
    router: infer TRouter extends {};
  }
    ? TRouter
    : never;

  type MyComponentProps<TRouter = RegisteredRouter> = {
    // ...
  };
}
