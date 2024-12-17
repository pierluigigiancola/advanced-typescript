// Define the map with constant values
const frontendToBackendEnumMap = {
  singleModule: "SINGLE_MODULE",
  multiModule: "MULTI_MODULE",
  sharedModule: "SHARED_MODULE",
} as const;

// Create a type alias for the object type
type Obj = typeof frontendToBackendEnumMap;

// Extract all values from the object to create a union type
type BackendModuleEnum = Obj[keyof Obj];

// Now, BackendModuleEnum is equivalent to:
// type BackendModuleEnum = 'SINGLE_MODULE' | 'MULTI_MODULE' | 'SHARED_MODULE';
