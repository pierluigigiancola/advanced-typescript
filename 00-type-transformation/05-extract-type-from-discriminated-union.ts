// Type A: Discriminated Union
type A =
  | { type: "circle"; radius: number }
  | { type: "square"; sideLength: number }
  | { type: "rectangle"; width: number; height: number };

// Type B: Union Type
type B = "red" | "green" | "blue";

// Type C: Enum
enum C {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

// Example usage of Type A (Discriminated Union)
function getArea(shape: A): number {
  if (shape.type === "circle") {
    return Math.PI * shape.radius ** 2;
  } else if (shape.type === "square") {
    return shape.sideLength ** 2;
  } else if (shape.type === "rectangle") {
    return shape.width * shape.height;
  } else {
    // Exhaustive check
    const _exhaustiveCheck: never = shape;
    return _exhaustiveCheck;
  }
}

// Example usage of Type B (Union Type)
function isPrimaryColor(color: B): boolean {
  // Exhaustive check
  const isPrimary: boolean =
    color === "red" || color === "green" || color === "blue" || color;
  return isPrimary;
}

// Example usage of Enum C
function getSizeDescription(size: C): string {
  switch (size) {
    case C.Small:
      return "Size is small.";
    case C.Medium:
      return "Size is medium.";
    case C.Large:
      return "Size is large.";
    default:
      // Exhaustive check
      const _exhaustiveCheck: never = size;
      return _exhaustiveCheck;
  }
}

// Using the functions
const circle: A = { type: "circle", radius: 5 };
console.log(`Area of circle: ${getArea(circle)}`); // Outputs: Area of circle: 78.53981633974483

const color: B = "red";
console.log(`Is primary color: ${isPrimaryColor(color)}`); // Outputs: Is primary color: true

console.log(getSizeDescription(C.Medium)); // Outputs: Size is medium.
