// Previously, we needed two type arguments whenever we used CreateDataShape.
// For example:
// type CreateDataShape<TData, TError> = {
//   data: TData;
//   error: TError;
// };

// This forced us to write something like:
// const result: CreateDataShape<string, undefined> = {
//   data: "Some data",
//   error: undefined
// };
{
// By adding `= undefined` to TError, we give it a default type.
// Now TError is optional, and if not provided, it defaults to undefined.
type CreateDataShape<TData, TError = undefined> = {
    data: TData;
    error: TError;
  };
  
  // Example usage without specifying TError:
  const resultWithoutError: CreateDataShape<string> = {
    data: "Hello",
    // TError defaults to undefined, so we must provide an undefined value here
    error: undefined
  };
  
  // Example usage with a specified TError type:
  const resultWithError: CreateDataShape<string, string> = {
    data: "Hello",
    error: "Something went wrong"
  };
  
  // Another example with a more complex data type and a custom error type:
  interface User {
    id: number;
    name: string;
  }
  
  type UserError = {
    message: string;
    code: number;
  };
  
  // Using the CreateDataShape with both generics:
  const userResult: CreateDataShape<User, UserError> = {
    data: { id: 1, name: "Alice" },
    error: { message: "Invalid request", code: 400 }
  };
  
  // Using the CreateDataShape without an explicit error, relying on the default:
  const userResultNoError: CreateDataShape<User> = {
    data: { id: 2, name: "Bob" },
    // No explicit error type was provided, so error defaults to undefined
    error: undefined
  };
  }