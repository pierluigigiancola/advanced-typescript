type Router = {
  userPostDetail: {
    path: "/users/$userId/posts/$postId";
    pathParams: {
      userId: string;
      postId: string;
    };
  };
  user: {
    path: "/users/$userId";
    pathParams: {
      userId: string;
    };
  };
};

type RequiredPathParams<FromParams, ToParams> = {
  [K in keyof ToParams as K extends keyof FromParams ? never : K]: ToParams[K];
};

type OptionalPathParams<FromParams, ToParams> = {
  [K in keyof ToParams as K extends keyof FromParams ? K : never]?: ToParams[K];
};

type PathParams<
  From extends keyof Router,
  To extends keyof Router,
  TFromPathParams = Router[From]["pathParams"],
  TToPathParams = Router[To]["pathParams"]
> = RequiredPathParams<TFromPathParams, TToPathParams> &
  OptionalPathParams<TFromPathParams, TToPathParams>;

function navigate<
  From extends keyof Router,
  To extends keyof Router,
  TPathParams extends PathParams<From, To>
>(from: From, to: To, pathParams: TPathParams) {
  //...
}

navigate('userPostDetail', 'user', )

type NonOptional<T> = {
  [P in keyof T as {} extends Pick<T, P> ? never : P]: T[P];
};

type NavigateObjectParameter<
  From extends keyof Router,
  To extends keyof Router,
  TPathParams = PathParams<From, To>
> = {} extends NonOptional<TPathParams>
  ? {
      from: From;
      to: To;
    } & { pathParams?: TPathParams }
  : {
      from: From;
      to: To;
    } & { pathParams: TPathParams };

function navigate2<From extends keyof Router, To extends keyof Router>(
  opt: NavigateObjectParameter<From, To>
) {
  //...
}

navigate2({ from: "user", to: "userPostDetail", pathParams: { postId: "12" } });

navigate2({ from: "userPostDetail", to: "user" });
