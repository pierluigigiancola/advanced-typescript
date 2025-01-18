export type AddTrailingSlash<T> = T extends `${string}/` ? T : `${T & string}/`;

// if ("mystring".endsWith("/")) {
//     return "mystring";
// } else {
//     return "mystring/";
// }

type Test1 = AddTrailingSlash<"users">;
