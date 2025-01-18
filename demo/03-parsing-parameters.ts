export type ParsePathParams<T extends string, TAcc = never> = T &
  `${string}$${string}` extends never
  ? TAcc
  : T extends `${string}$${infer TPossiblyParam}`
  ? TPossiblyParam extends ""
    ? TAcc
    : TPossiblyParam & `${string}/${string}` extends never
    ? TPossiblyParam | TAcc
    : TPossiblyParam extends `${infer TParam}/${infer TRest}`
    ? ParsePathParams<TRest, TParam extends "" ? TAcc : TParam | TAcc>
    : never
  : TAcc;

type Test1 = ParsePathParams<"/$users/$userId/$posts/$postId/$1/$2/$3/$4/$5/$6/$7/$8">;

// 1. T = "/users/$userId/posts/$postId", TAcc = never
// `${/users/}$${userId/posts/$postId}` extends never = false
// TPossiblyParam = "userId/posts/$postId"
// TPossiblyParam extends "" = false
// TPossiblyParam & `${userId}/${posts/$postId}` extends never = false
// TParam = userId, TRest = "posts/$postId"
// ParsePathParams<"posts/$postId", userId | never>
