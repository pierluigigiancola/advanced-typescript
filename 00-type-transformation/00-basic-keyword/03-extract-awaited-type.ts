// An asynchronous function that returns a Promise resolving to a user object
async function getUser() {
  return {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
  };
}

// Extract the return type of getUser, which is a Promise
type GetUserPromise = ReturnType<typeof getUser>;
// GetUserPromise is Promise<{ id: string; name: string; email: string; }>

// Use Awaited to unwrap the Promise and get the inner type
type ReturnValue = Awaited<GetUserPromise>;
// ReturnValue is { id: string; name: string; email: string; }

// Alternatively, combine both steps into one line
type ReturnValueDirect = Awaited<ReturnType<typeof getUser>>;

// Example usage:
const user: ReturnValue = {
  id: "2",
  name: "Bob",
  email: "bob@example.com",
};

// This will cause a type error because 'email' should be a string
const invalidUser: ReturnValue = {
  id: "3",
  name: "Charlie",
  email: null, // Error: Type 'null' is not assignable to type 'string'
};
