// Define the Event union type with string literals
type CEvent = "log_in" | "log_out" | "sign_up";

// Use the Uppercase type helper to transform each event to uppercase
type UppercaseEvent = Uppercase<CEvent>; // 'LOG_IN' | 'LOG_OUT' | 'SIGN_UP'

// Create a type that maps the uppercase events to string values
type ObjectOfKeys = Record<UppercaseEvent, string>;

// Alternatively, use a mapped type to transform the keys directly
type ObjectOfKeysMapped = {
  [K in CEvent as Uppercase<K>]: string;
};

// Example usage of the ObjectOfKeys type
const eventMessages: ObjectOfKeys = {
  LOG_IN: "User has logged in.",
  LOG_OUT: "User has logged out.",
  SIGN_UP: "User has signed up.",
};

// Example usage of the ObjectOfKeysMapped type
const eventDescriptions: ObjectOfKeysMapped = {
  LOG_IN: "Occurs when a user logs in.",
  LOG_OUT: "Occurs when a user logs out.",
  SIGN_UP: "Occurs when a user signs up.",
};
