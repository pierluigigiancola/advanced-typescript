// Original object without 'as const'
{
  const programModeEnumMap = {
    GROUP: "group",
    ANNOUNCEMENT: "announcement",
    ONE_ON_ONE: "one_on_one",
    SELF_DIRECTED: "self_directed",
    PLANNED_ONE_ON_ONE: "planned_one_on_one",
    PLANNED_SELF_DIRECTED: "planned_self_directed",
  };

  // Accessing a property
  const groupProgram = programModeEnumMap.GROUP;
  // Type of 'groupProgram' is inferred as 'string'

  // Attempting to assign a new value (this is allowed without 'as const')
  programModeEnumMap.GROUP = "somethingElse"; // No TypeScript error

  // Now, apply 'as const' to make properties readonly and infer literal types
  const programModeEnumMapConst = {
    GROUP: "group",
    ANNOUNCEMENT: "announcement",
    ONE_ON_ONE: "1on1",
  } as const;

  // Accessing a property
  const groupProgramConst = programModeEnumMapConst.GROUP;
  // Type of 'groupProgramConst' is inferred as the literal type "group"

  // Attempting to assign a new value (this will cause a TypeScript error)
  programModeEnumMapConst.GROUP = "somethingElse"; // Error: Cannot assign to 'GROUP' because it is a read-only property.

  // Demonstrating with arrays
  const arr = [1, 2, 3];
  // Type of 'arr' is inferred as 'number[]'

  arr[0] = 10; // Allowed, since 'arr' is mutable

  const arrConst = [1, 2, 3] as const;
  // Type of 'arrConst' is inferred as 'readonly [1, 2, 3]'

  arrConst[0] = 10; // Error: Cannot assign to '0' because it is a read-only property.

  // Nested objects with 'as const'
  const nestedObj = {
    coolThing: {
      cool: "cool",
    },
  } as const;

  // Accessing nested properties
  const coolValue = nestedObj.coolThing.cool;
  // Type of 'coolValue' is inferred as the literal type "cool"

  // Attempting to modify nested properties (will cause a TypeScript error)
  nestedObj.coolThing.cool = "not cool"; // Error: Cannot assign to 'cool' because it is a read-only property.

  // Comparing with Object.freeze()
  const frozenObj = Object.freeze({
    level1: {
      level2: "value",
    },
  });

  // The top-level properties are readonly, but nested properties are not
  frozenObj.level1 = {}; // Error: Cannot assign to 'level1' because it is a read-only property.
  frozenObj.level1.level2 = "new value"; // Allowed, since 'level2' is not readonly

  // Using 'as const' for deep readonly
  const deepReadonlyObj = {
    level1: {
      level2: "value",
    },
  } as const;

  deepReadonlyObj.level1.level2 = "new value"; // Error: Cannot assign to 'level2' because it is a read-only property.

  // 'as const' does not affect runtime behavior
  console.log(programModeEnumMapConst.GROUP); // Outputs: "group"

  // You can still use the object values at runtime as usual
  if (groupProgramConst === "group") {
    console.log("Group program selected.");
  }
}
