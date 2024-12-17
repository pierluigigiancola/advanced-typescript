// Before adding constraints, TRoute could be anything (e.g. unknown):
// type AddRoutePrefix<TRoute> = `/${TRoute}`;

// After adding constraints:
type AddRoutePrefix<TRoute extends string> = `/${TRoute}`;

// Now, if we try to use AddRoutePrefix with something other than a string, TypeScript will complain:
type ValidRoute = AddRoutePrefix<"home">;     // Works fine: ValidRoute is "/home"
type AnotherValidRoute = AddRoutePrefix<"user/profile">; // Works fine: AnotherValidRoute is "/user/profile"

// The following would fail because TRoute is not a string:
type InvalidRouteBoolean = AddRoutePrefix<true>;   // Error: Type 'true' does not satisfy the constraint 'string'
type InvalidRouteNumber = AddRoutePrefix<42>;      // Error: Type '42' does not satisfy the constraint 'string'

// You can also explicitly allow multiple types if you choose, for instance:
type AddRoutePrefixExtended<TRoute extends string | number> = `/${TRoute}`;
// This will allow either string or number, but still restrict other types.
// For example:
type NumberRoute = AddRoutePrefixExtended<123>; // Works fine: NumberRoute is "/123"
type StillInvalid = AddRoutePrefixExtended<boolean>; // Error: Type 'boolean' does not satisfy the constraint 'string | number'

// In addition, for illustrative purposes, consider a function version with a similar constraint:
function addRoutePrefix<TRoute extends string>(route: TRoute): `/${TRoute}` {
  return `/${route}`;
}

const prefixedRoute = addRoutePrefix("home"); // Works: returns "/home"
// const invalidPrefix = addRoutePrefix(true); // Error: Argument of type 'true' is not assignable to parameter of type 'string'.

// This mirrors the logic from the type-only helper, but now in a function, which can be useful in actual runtime code.