{
  type Fruit =
    | { name: "apple"; color: "red" }
    | { name: "banana"; color: "yellow" }
    | { name: "orange"; color: "orange" };

  // 1. Remap the discriminated union to an object
  type FruitMap = {
    [F in Fruit as F["name"]]: F["color"];
  };

  // 2. Produce the union of template-literal strings
  type TransformedFruit = {
    [K in keyof FruitMap]: `${K}-${FruitMap[K]}`;
  }[keyof FruitMap];

  // "TransformedFruit" resolves to: "apple-red" | "banana-yellow" | "orange-orange"
}
