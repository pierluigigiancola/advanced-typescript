// Suppose we have an object with nested properties
const globalContext = {
  user: {
    name: "Default Name",
    age: 30,
  },
  settings: {
    theme: "light",
    notifications: true,
  },
};

// Extract the type of fakeDataDefaults using 'typeof'
type GlobalContextType = typeof globalContext;

// Use indexed access types to get the type of each property
type UserType = GlobalContextType["user"];
type SettingsType = GlobalContextType["settings"];

// Example usage:

function updateUser(updates: UserType) {
  globalContext.user = updates;
}

updateUser({
  name: "Pigio",
  age: 29,
});
