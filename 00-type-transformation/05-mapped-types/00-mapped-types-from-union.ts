{
  // 1. Define a string literal union of routes
  type Route = "home" | "about" | "admin";

  // 2. Create a mapped type that will produce an object type
  //    whose keys and values are all drawn from the Route union
  type RoutesObject = {
    [R in Route]: R;
  };

  // 3. Create a value that satisfies the mapped type
  //    Now TypeScript enforces that each key must exist
  //    and that each value must match the key’s type (i.e., "home", "about", "admin").
  const routes: RoutesObject = {
    home: "home",
    about: "about",
    admin: "admin",
  };
  // Now `routes` is strongly typed. If you try to remove or alter
  // one of the properties incorrectly, TypeScript will complain.

  // allow undefined
  type RoutesObjectOptional = {
    [R in Route]: R | undefined;
  };

  const routesOptional: RoutesObjectOptional = {
    home: "home",
    about: "about",
    admin: undefined,
  };
}
