// Define the discriminated union 'Event'
type MyEvent =
  | { type: "click"; event: MouseEvent }
  | { type: "focus"; event: FocusEvent }
  | { type: "keydown"; event: KeyboardEvent };

// Extract the union of 'type' properties
type EventType = MyEvent["type"]; // 'click' | 'focus' | 'keydown'

// sorry for the naming
type EventEventType = MyEvent["event"]; // MouseEvent | FocusEvent | KeyboardEvent

// Property Must Exist on All Members
// The property you're accessing must be present on all members of the union for the indexed access to work.
type MyEvent2 = MyEvent | { event: MouseEvent };

type EventType2 = MyEvent2["type"]; // Error: Property 'type' does not exist on type 'MyEvent2'.
