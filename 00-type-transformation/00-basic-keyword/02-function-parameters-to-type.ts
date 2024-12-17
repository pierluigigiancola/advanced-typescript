// Original function
function makeQuery(
  url: string,
  opts: { method: string; headers?: Record<string, string> }
) {
  // Function implementation (omitted for brevity)
  return [url, opts];
}

// Extract the parameter types of makeQuery using 'typeof' and 'Parameters'
type MakeQueryParameters = Parameters<typeof makeQuery>;

// 'MakeQueryParameters' is now a tuple of the parameters' types:
// type MakeQueryParameters = [string, { method: string; headers?: Record<string, string> }];

// Extract only the second parameter type using index access
type OptionsParameter = MakeQueryParameters[1];

// Now 'OptionsParameter' is { method: string; headers?: Record<string, string> }

// Example usage:

// Function that uses the extracted OptionsParameter type
function logOptions(opts: OptionsParameter) {
  console.log(`Method: ${opts.method}`);
  if (opts.headers) {
    console.log("Headers:", opts.headers);
  }
}

// Creating an object of type OptionsParameter
const optsExample: OptionsParameter = {
  method: "GET",
  headers: { Authorization: "Bearer token" },
};

// Correct usage
logOptions(optsExample);

// This will cause a type error because 'method' should be a string
const invalidOpts: OptionsParameter = { method: 123 };
// Error: Type 'number' is not assignable to type 'string'
