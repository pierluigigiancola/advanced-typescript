export type RemoveTrailingSlashes<T> = T extends `${string}/`
  ? T extends `${infer R}/`
    ? R
    : T
  : T;

type Test1 = RemoveTrailingSlashes<"users/12314/">;
