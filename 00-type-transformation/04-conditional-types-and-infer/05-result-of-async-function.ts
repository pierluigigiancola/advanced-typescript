// This is just an example "getServerSideProps"-like function.
// Notice there's no explicit return type annotation—we rely on inference.
async function getServerSideProps() {
  return {
    props: {
      json: { message: "Hello!" },
      title: "Welcome",
      isCool: true,
    },
  };
}

// This type helper will extract whatever shape is inside `props`
// from a function returning a Promise<{ props: ... }>.
type InferPropsFromServerSideFunction<T> = T extends () => Promise<{
  props: infer P;
}>
  ? P
  : never;

type Props = InferPropsFromServerSideFunction<typeof getServerSideProps>;

// If your getServerSideProps returns { props: { json: ..., title: ..., isCool: ... } },
// then Props is inferred as:
// {
//   json: { message: string };
//   title: string;
//   isCool: boolean;
// }

function MyPageComponent(props: Props) {
  // JSX
}
