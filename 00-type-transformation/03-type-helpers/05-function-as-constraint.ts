// The goal: Extract parameters and return type from a given function type T.
// The challenge: Ensure that T is known to be a function type, otherwise TypeScript may complain about constraints.

// We start by constraining T to be a function type that can take any number of arguments (of any type)
// and return any type. The type signature (...) => any ensures T is a function.
type GetParametersAndReturnType<T extends (...args: any) => any> = {
    parameters: Parameters<T>;
    returnType: ReturnType<T>;
  };
  
  // ---- Example Usage ----
  
  // A function with no arguments that returns a string
  type FnNoArgs = () => string;
  type ExtractedNoArgs = GetParametersAndReturnType<FnNoArgs>;
  // ExtractedNoArgs is { parameters: []; returnType: string }
  
  // A function with one argument (a string) that returns void
  type FnOneArg = (s: string) => void;
  type ExtractedOneArg = GetParametersAndReturnType<FnOneArg>;
  // ExtractedOneArg is { parameters: [string]; returnType: void }
  
  // A function with two arguments (number, boolean) that returns a number
  type FnTwoArgs = (count: number, flag: boolean) => number;
  type ExtractedTwoArgs = GetParametersAndReturnType<FnTwoArgs>;
  // ExtractedTwoArgs is { parameters: [number, boolean]; returnType: number }
  
  // If we tried to define GetParametersAndReturnType without the constraint, like so:
  // type GetParametersAndReturnType<T> = { parameters: Parameters<T>; returnType: ReturnType<T>; };
  // TypeScript would complain because it doesn't know that T is a function type.
  // By adding the constraint T extends (...args: any) => any, we ensure T is a function and avoid these errors.
  