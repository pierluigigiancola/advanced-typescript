/**
 * Solution 1
 * -----------
 * This uses a straightforward conditional type check to see if `T` has
 * a `data` property. If so, return the type of `T["data"]`; otherwise, `never`.
 */
type GetDataValue<T> = T extends { data: any } ? T["data"] : never;

// Example usages of Solution 1:
type Test1 = GetDataValue<{ data: string }>; // string

type Test2 = GetDataValue<{ data: { name: string; age: number } }>; // { name: string; age: number }

type Test3 = GetDataValue<{ noDataHere: number }>; // never

/**
 * Solution 2 (using `infer`)
 * ---------------------------
 * This does the same thing but uses the `infer` keyword to "extract" the
 * data’s type into a temporary type variable (`TData`) in the positive branch.
 */
type GetDataValueInfer<T> = T extends { data: infer TData } ? TData : never;

// Example usages of Solution 2:
type Test4 = GetDataValueInfer<{ data: string }>; // string

type Test5 = GetDataValueInfer<{ data: { name: string; age: number } }>; // { name: string; age: number }

type Test6 = GetDataValueInfer<{ notData: boolean }>; // never
