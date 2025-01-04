{
  /**
   * Step 1: The basic conditional type.
   *
   * This version does NOT guard against invalid inputs.
   */
  type YouSayGoodbyeAndISayHelloSimple<T> = T extends "hello"
    ? "goodbye"
    : "hello";

  /**
   * Step 2: Let's add the check so that if T isn't "hello" or "goodbye",
   * we return never.
   */
  type YouSayGoodbyeAndISayHelloGuarded<T> = T extends "hello" | "goodbye"
    ? "wow"
    : never;

  /**
   * Now if we try:
   */
  type Example1 = YouSayGoodbyeAndISayHelloGuarded<"hello">; // "wow"
  type Example2 = YouSayGoodbyeAndISayHelloGuarded<"goodbye">; // "wow"
  type Example3 = YouSayGoodbyeAndISayHelloGuarded<"random">; // never

  /**
   * Step 3 (Final): Combine both ideas:
   *  1) Guard: T must be "hello" or "goodbye", otherwise never.
   *  2) If T is "hello", return "goodbye". If T is "goodbye", return "hello".
   */
  type YouSayGoodbyeAndISayHello<T> = T extends "hello" | "goodbye"
    ? T extends "hello"
      ? "goodbye"
      : "hello"
    : never;

  /**
   * Test it out:
   */
  type HelloCase = YouSayGoodbyeAndISayHello<"hello">; // "goodbye"
  type GoodbyeCase = YouSayGoodbyeAndISayHello<"goodbye">; // "hello"
  type RandomCase = YouSayGoodbyeAndISayHello<"random">; // never
  type NumberCase = YouSayGoodbyeAndISayHello<42>; // never
}
