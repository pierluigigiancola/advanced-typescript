// Starting Type
type RouteUnion =
  | {
      route: "about";
      search: {
        topic: string;
      };
    }
  | {
      route: "admin";
      search: {
        adminSection: string;
      };
    }
  | {
      route: "admin/users";
      search: {
        userId: number;
      };
    };

// Our target type
type RoutesObject = {
  about: { topic: string };
  admin: { adminSection: string };
  "admin/users": { userId: number };
};

// Using Extract
/**
 * - RouteUnion["route"] produces the union of all possible route strings: "about" | "admin" | "admin/users"
 * - Extract<RouteUnion, { route: K }> picks the single union member whose route matches K
 * - We then take that union member’s search type via ["search"].
 */
type RoutesObjectSolution1 = {
  // 1. For each K in all possible routes (i.e., "about", "admin", "admin/users")
  [K in RouteUnion["route"]]: Extract<RouteUnion, { route: K }>["search"]; // 2. Extract the exact union member where route === K
};

// Remapping the keys
/**
 * - R here is the entire object in each union member (e.g., { route: "about", search: {...} }).
 * - Using a key remap (as R["route"]) means we directly use the route string as the property key.
 * - The property value is simply R["search"].
 */
type RoutesObjectSolution2 = {
  // R is each member of the union
  [R in RouteUnion as R["route"]]: R["search"];
};
