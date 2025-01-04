type FruitMap = {
  apple: 'red';
  banana: 'yellow';
  orange: 'orange';
};

// Option A: step-by-step approach
type StepOne = {
  [K in keyof FruitMap]: K
};
type StepTwo = {
  [K in keyof FruitMap]: `${K} ${FruitMap[K]}`
};
type TransformedFruitA = StepTwo[keyof StepTwo];

// Option B: inline approach (one-liner)
type TransformedFruit = {
  [K in keyof FruitMap]: `${K} ${FruitMap[K]}`
}[keyof FruitMap];

// TransformedFruit (or TransformedFruitA) is:
// "apple red" | "banana yellow" | "orange orange"
