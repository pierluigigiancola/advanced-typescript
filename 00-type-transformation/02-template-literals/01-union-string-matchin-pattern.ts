type Routes =
  | "/users"
  | "/users/:id"
  | "/posts"
  | "/posts/:id"
  | "/comments/:commentId";

// DynamicRoutes now includes "/comments/:commentId"
type DynamicRoutes = Extract<Routes, `${string}:${string}`>;

const goToDynamicRoute = (route: DynamicRoutes) => {
  // Yada yada
};

goToDynamicRoute("/posts/:id"); // ✅ Valid
goToDynamicRoute("/comments/:commentId"); // ✅ Valid
goToDynamicRoute("/users"); // ❌ Error: Type '"home"' is not assignable to type 'DynamicRoutes'.
