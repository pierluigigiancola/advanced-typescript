type Route = `/${string}`;

const goToRoute = (route: Route) => {
  // Yada yada
};

goToRoute("/home"); // ✅ Valid
goToRoute("/users/1"); // ✅ Valid
goToRoute("home"); // ❌ Error: Type '"home"' is not assignable to type '`/${string}`'.
goToRoute("http://example.com"); // ❌ Error
