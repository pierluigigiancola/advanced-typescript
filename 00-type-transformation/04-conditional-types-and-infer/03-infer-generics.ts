// 1. Define MyComplexInterface
interface MyComplexInterface<TEvent, TContext, TName, TPoint> {
  getEvent: () => TEvent;
  getContext: () => TContext;
  getName: () => TName;
  getPoint: () => TPoint;
}

// 2. Define the GetPoint helper
type GetPoint<T> = T extends MyComplexInterface<
  infer TEvent,
  infer TContext,
  infer TName,
  infer TPoint
>
  ? TPoint
  : never;

// 3. Example usage
type MyInterfaceInstance = MyComplexInterface<
  string, // TEvent
  number, // TContext
  boolean, // TName
  4 // TPoint
>;

type Example2 = GetPoint<MyInterfaceInstance>; // This should be 4
