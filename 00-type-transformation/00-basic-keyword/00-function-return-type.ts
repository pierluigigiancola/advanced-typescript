function greet(arg: string) {
  return "hello " + arg;
}

// Extract the type of myFunc
type MyFunc = typeof greet;

// ReturnType<T> is a built-in TypeScript utility type that extracts the return type of a function type T
// Use ReturnType to get the return type of myFunc
type ReturnValue = ReturnType<MyFunc>;
