{
  // A simple union type
  type Fruit = "apple" | "banana" | "orange";

  /**
   * We want a type that extracts only "apple" or "banana" from Fruit.
   * One might naïvely write:
   */
  type AppleOrBanana_Failing = Fruit extends "apple" | "banana" ? Fruit : never;

  // Let's see what AppleOrBanana_Failing evaluates to:
  //
  // Instead of giving us "apple" | "banana", it becomes `never`.
  // Because it checks the entire union ("apple"|"banana"|"orange") at once
  // and sees that "orange" is also in the union, so the condition fails.

  // A generic type that *distributes* (iterate) over each member of the union:
  type GetAppleOrBanana<T> = T extends "apple" | "banana" ? T : never;

  /**
   * Now, if we pass our Fruit into this generic type,
   * TypeScript will check each member of the union individually:
   *  - "apple" extends "apple"|"banana"? Yes => "apple"
   *  - "banana" extends "apple"|"banana"? Yes => "banana"
   *  - "orange" extends "apple"|"banana"? No => never
   */
  type AppleOrBanana_Working = GetAppleOrBanana<Fruit>; // "apple" | "banana"

  /**
   * By writing 'Fruit extends infer T', we're effectively capturing
   * the union 'Fruit' as a new type variable T.
   * Once T is introduced (like a generic), each member of the union
   * is checked individually.
   */
  type AppleOrBanana_Infer = Fruit extends infer T
    ? T extends "apple" | "banana"
      ? T
      : never
    : never;
}
