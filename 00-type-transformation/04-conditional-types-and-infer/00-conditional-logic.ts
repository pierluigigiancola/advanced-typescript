// 1. Define the type helper with a type parameter `T`
type YouSayGoodbyeAndISayHello<T> = T extends "hello" ? "goodbye" : "hello";

// 2. Use the type helper by passing in different string literals
type ExampleHello = YouSayGoodbyeAndISayHello<"hello">; // "goodbye"
type ExampleGoodbye = YouSayGoodbyeAndISayHello<"goodbye">; // "hello"
type ExampleRandom = YouSayGoodbyeAndISayHello<"random">; // "hello"

// 3. You can also pass in any other string or type to see what happens
type ExampleBlah = YouSayGoodbyeAndISayHello<"blah">; // "hello"
type ExampleNumber = YouSayGoodbyeAndISayHello<number>; // "hello"
