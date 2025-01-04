/* 
  Pattern Matching on Template Literals with Infer
*/

const Names = [
  "Matt Pocock",
  "Jimi Hendrix",
  "Eric Clapton",
  "John Mayer",
  "BB King",
];

/* ---------------------------------------------------
     1) runtime solution `split`
     --------------------------------------------------- */

function getSurnameSplit(fullName: string): string | undefined {
  // Splits on a space and returns the second element
  return fullName.split(" ")[1];
}

Names.forEach((name) => {
  // We lose type information here
  // lastName is a string instead of "Pocock" | "Hendrix" | "Clapton" | "Mayer" | undefined
  const lastName = getSurnameSplit(name);
  console.log("Split:", name, "→", lastName);
});

type GetSurname<T extends string> = T extends `${infer _First} ${infer Last}`
  ? Last
  : never;

/*
    Explanation:
    - T extends `${infer _First} ${infer Last}` checks if T has a space in it.
    - The substring before the space is captured as _First (which we ignore in this example).
    - The substring after the space is captured as Last.
    - If T doesn’t match the pattern (for example, "BB" with no space), then GetSurname<T> becomes never.
  */

function getSurnameWithTypeInfo<T extends string>(fullName: T) {
  // the split return a function and we cast the return type
  // mimic the split function but at type level
  return fullName.split(" ")[1] as GetSurname<T> | undefined;
}

Names.forEach((name) => {
  const lastName = getSurnameWithTypeInfo(name);
  console.log("Infer:", name, "→", lastName);
});
