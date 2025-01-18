{
  // keyof
  type Keys = keyof { foo: string; bar: string };

  // ReturnType & Parameters
  const greet = (arg: string) => `hello ${arg}`;
  type Greet = typeof greet;
  type GreetReturnType = ReturnType<typeof greet>;
  type GreetParameters = Parameters<typeof greet>;

  // Pick & Omit
  type TPick = Pick<{ foo: string; bar: string }, "foo">;
  type TOmit = Omit<{ foo: string; bar: string }, "foo">;

  // Extract & Exclude
  type TFoo = Extract<Keys, "foo">;
  type TBar = Exclude<Keys, "foo">;

  // infer
  type Infer<T> = T extends { foo: infer R } ? R : never;
  type Test1 = Infer<{ foo: "foo" }>;
}
