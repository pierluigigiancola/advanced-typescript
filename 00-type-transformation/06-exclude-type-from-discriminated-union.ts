// Define a union type of possible event
type YourEvent =
  | {
      type: "click";
      event: MouseEvent;
    }
  | {
      type: "focus";
      event: FocusEvent;
    }
  | {
      type: "keydown";
      event: KeyboardEvent;
    }
  | {
      type: "mousemove";
      event: MouseEvent;
    };

// Use Exclude to remove 'keydown' from the union
type NonKeyDownEvents = Exclude<YourEvent, { type: "keydown" }>;

// Now 'NonKeyDownEvents' is 'click' | 'mousemove' | 'submit'

// Example usage:

// Function that handles non-keydown events
function handleEvent(event: NonKeyDownEvents) {
  console.log(`Handling event: ${event}`);
}

// Valid calls
handleEvent({
  type: "click",
  event: new MouseEvent("click"),
}); // Handling event: click
handleEvent({
  type: "mousemove",
  event: new MouseEvent("mousemove"),
}); // Handling event: mousemove
handleEvent({
  type: "focus",
  event: new FocusEvent("focus"),
}); // Handling event: submit

// Invalid call
handleEvent({
  type: "keydown",
  event: new KeyboardEvent("keydown"),
}); // Error: Argument of type '"keydown"' is not assignable to parameter of type 'NonKeyDownEvents'
