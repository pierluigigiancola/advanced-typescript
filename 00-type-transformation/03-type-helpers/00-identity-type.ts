type IdentityType<T> = T; 

// Using this type helper:
type NumberType = IdentityType<number>;   // NumberType is `number`
type UnionType = IdentityType<12 | undefined>; // UnionType is `12 | undefined`
type StringType = IdentityType<string>;   // StringType is `string`

type Tuple<T, K> = [T, K];

type Point2D = Tuple<number, number>; // [number, number]

// built-in utility types
// Record<K, T>