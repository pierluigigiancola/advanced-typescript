// Define the testingFrameworks object
const testingFrameworks = {
  vitest: { label: "Vitest" },
  jest: { label: "Jest" },
  mocha: { label: "Mocha" },
};

// Extract the union type of the keys using 'typeof' and 'keyof'
type TestingFramework = keyof typeof testingFrameworks;

// Now 'TestingFramework' is a union type: 'vitest' | 'jest' | 'mocha'

// Example usage:

// Function that accepts only valid testing framework keys
function runTests(framework: TestingFramework) {
  console.log(`Running tests with ${framework}`);
}

// Valid usage
runTests("vitest"); // Running tests with vitest
runTests("jest"); // Running tests with jest

// Invalid usage
runTests("unknown"); // Error: Argument of type '"unknown"' is not assignable to parameter of type 'TestingFramework'
