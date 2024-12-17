// Our basic type helper takes two generics: TData and TError.
// Using the comma operator, we can list multiple type parameters.
// For this basic version, we just have two.
type CreateDataShape<TData, TError> = {
    data: TData;
    error: TError;
  };
  
  // Example usage:
  const stringErrorShape: CreateDataShape<string, TypeError> = {
    data: "Hello, World!",
    error: new TypeError("This is a type error.")
  };
  
  const numberErrorShape: CreateDataShape<number, Error> = {
    data: 42,
    error: new Error("A generic error occurred.")
  };
  
  // If we want more generics, we can simply add them.
  type CreateExtendedDataShape<TData, TError, TMetadata> = {
    data: TData;
    error: TError;
    metadata: TMetadata;
  };
  
  // Example usage with three type arguments:
  const extendedShape: CreateExtendedDataShape<boolean, SyntaxError, { source: string }> = {
    data: true,
    error: new SyntaxError("Syntax is incorrect!"),
    metadata: { source: "User input" }
  };
  