export interface Register {}
export type RegisteredRouter = Register extends {
  router: infer TRouter extends AnyRouter;
}
  ? TRouter
  : AnyRouter;

export type AnyRouter = Router<any, any, any, any, any, any>;

export interface AnyRoute
  extends Route<
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  > {}

export type ConstrainLiteral<T, TConstraint, TDefault = TConstraint> =
  | (T & TConstraint)
  | TDefault;

export declare const rootRouteId = "__root__";
export type RootRouteId = typeof rootRouteId;

export type TrimPath<T extends string> = "" extends T
  ? ""
  : TrimPathRight<TrimPathLeft<T>>;

export type TrimPathLeft<T extends string> =
  T extends `${RootRouteId}/${infer U}`
    ? TrimPathLeft<U>
    : T extends `/${infer U}`
    ? TrimPathLeft<U>
    : T;

export type TrimPathRight<T extends string> = T extends "/"
  ? "/"
  : T extends `${infer U}/`
  ? TrimPathRight<U>
  : T;

type RoutePrefix<
  TPrefix extends string,
  TPath extends string
> = string extends TPath
  ? RootRouteId
  : TPath extends string
  ? TPrefix extends RootRouteId
    ? TPath extends "/"
      ? "/"
      : `/${TrimPath<TPath>}`
    : `${TPrefix}/${TPath}` extends "/"
    ? "/"
    : `/${TrimPathLeft<`${TrimPathRight<TPrefix>}/${TrimPath<TPath>}`>}`
  : never;

export type ResolveFullPath<
  TParentRoute extends AnyRoute,
  TPath extends string,
  TPrefixed = RoutePrefix<TParentRoute["fullPath"], TPath>
> = TPrefixed extends RootRouteId ? "/" : TPrefixed;

export type ResolveId<
  TParentRoute,
  TCustomId extends string,
  TPath extends string
> = TParentRoute extends {
  id: infer TParentId extends string;
}
  ? RoutePrefix<TParentId, string extends TCustomId ? TPath : TCustomId>
  : RootRouteId;

export type ResolveParams<TPath extends string> =
  ParseSplatParams<TPath> extends never
    ? Record<ParsePathParams<TPath>, string>
    : Record<ParsePathParams<TPath>, string> & SplatParams;

export type ParseSplatParams<TPath extends string> = TPath &
  `${string}$` extends never
  ? TPath & `${string}$/${string}` extends never
    ? never
    : "_splat"
  : "_splat";

export interface SplatParams {
  _splat?: string;
}

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

export declare class Route<
  in out TParentRoute extends RouteConstraints["TParentRoute"] = AnyRoute,
  in out TPath extends RouteConstraints["TPath"] = "/",
  in out TFullPath extends RouteConstraints["TFullPath"] = ResolveFullPath<
    TParentRoute,
    TPath
  >,
  in out TCustomId extends RouteConstraints["TCustomId"] = string,
  in out TId extends RouteConstraints["TId"] = ResolveId<
    TParentRoute,
    TCustomId,
    TPath
  >,
  in out TSearchValidator = undefined,
  in out TParams = ResolveParams<TPath>,
  in out TRouterContext = AnyContext,
  in out TRouteContextFn = AnyContext,
  in out TBeforeLoadFn = AnyContext,
  in out TLoaderDeps extends Record<string, any> = {},
  in out TLoaderFn = undefined,
  in out TChildren = unknown
> {
  get to(): TrimPathRight<TFullPath>;
  get id(): TId;
  get path(): TPath;
  get fullPath(): TFullPath;
}

export type AnySchema = {};
export type AnyContext = {};
export type AnyPathParams = {};
export interface RouteContext {}

export type RouteConstraints = {
  TParentRoute: AnyRoute;
  TPath: string;
  TFullPath: string;
  TCustomId: string;
  TId: string;
  TSearchSchema: AnySchema;
  TFullSearchSchema: AnySchema;
  TParams: Record<string, any>;
  TAllParams: Record<string, any>;
  TParentContext: AnyContext;
  TRouteContext: RouteContext;
  TAllContext: AnyContext;
  TRouterContext: AnyContext;
  TChildren: unknown;
  TRouteTree: AnyRoute;
};

export type TrailingSlashOption = "always" | "never" | "preserve";

// entire new module
type RouterHistory = any;

export declare class Router<
  in out TRouteTree extends AnyRoute,
  in out TTrailingSlashOption extends TrailingSlashOption,
  in out TDefaultStructuralSharingOption extends boolean,
  in out TRouterHistory extends RouterHistory = RouterHistory,
  in out TDehydrated extends Record<string, any> = Record<string, any>,
  in out TSerializedError extends Record<string, any> = Record<string, any>
> {}

export type AddTrailingSlash<T> = T extends `${string}/` ? T : `${T & string}/`;
export type RemoveTrailingSlashes<T> = T extends `${string}/`
  ? T extends `${infer R}/`
    ? R
    : T
  : T;
export type AddLeadingSlash<T> = T extends `/${string}` ? T : `/${T & string}`;
export type RemoveLeadingSlashes<T> = T extends `/${string}`
  ? T extends `/${infer R}`
    ? R
    : T
  : T;

type JoinPath<TLeft extends string, TRight extends string> = TRight extends ""
  ? TLeft
  : TLeft extends ""
  ? TRight
  : `${RemoveTrailingSlashes<TLeft>}/${RemoveLeadingSlashes<TRight>}`;
type RemoveLastSegment<
  T extends string,
  TAcc extends string = ""
> = T extends `${infer TSegment}/${infer TRest}`
  ? TRest & `${string}/${string}` extends never
    ? TRest extends ""
      ? TAcc
      : `${TAcc}${TSegment}`
    : RemoveLastSegment<TRest, `${TAcc}${TSegment}/`>
  : TAcc;

export type ResolveCurrentPath<
  TFrom extends string,
  TTo extends string
> = TTo extends "."
  ? TFrom
  : TTo extends "./"
  ? AddTrailingSlash<TFrom>
  : TTo & `./${string}` extends never
  ? never
  : TTo extends `./${infer TRest}`
  ? AddLeadingSlash<JoinPath<TFrom, TRest>>
  : never;

export type ResolveParentPath<
  TFrom extends string,
  TTo extends string
> = TTo extends "../" | ".."
  ? TFrom extends "" | "/"
    ? never
    : AddLeadingSlash<RemoveLastSegment<TFrom>>
  : TTo & `../${string}` extends never
  ? AddLeadingSlash<JoinPath<TFrom, TTo>>
  : TFrom extends "" | "/"
  ? never
  : TTo extends `../${infer ToRest}`
  ? ResolveParentPath<RemoveLastSegment<TFrom>, ToRest>
  : AddLeadingSlash<JoinPath<TFrom, TTo>>;

export type ResolveRelativePath<TFrom, TTo = "."> = string extends TFrom
  ? TTo
  : string extends TTo
  ? TFrom
  : undefined extends TTo
  ? TFrom
  : TTo extends string
  ? TFrom extends string
    ? TTo extends `/${string}`
      ? TTo
      : TTo extends `..${string}`
      ? ResolveParentPath<TFrom, TTo>
      : TTo extends `.${string}`
      ? ResolveCurrentPath<TFrom, TTo>
      : AddLeadingSlash<JoinPath<TFrom, TTo>>
    : never
  : never;

export type RoutePathOptions<TCustomId, TPath> =
  | {
      path: TPath;
    }
  | {
      id: TCustomId;
    };

export type ParseParamsFn<in out TPath extends string, in out TParams> = (
  rawParams: ResolveParams<TPath>
) => TParams extends Record<ParsePathParams<TPath>, any>
  ? TParams
  : Record<ParsePathParams<TPath>, any>;

export type StringifyParamsFn<in out TPath extends string, in out TParams> = (
  params: TParams
) => ResolveParams<TPath>;

export type ParamsOptions<in out TPath extends string, in out TParams> = {
  params?: {
    parse?: ParseParamsFn<TPath, TParams>;
    stringify?: StringifyParamsFn<TPath, TParams>;
  };
  /**
      @deprecated Use params.parse instead
      */
  parseParams?: ParseParamsFn<TPath, TParams>;
  /**
      @deprecated Use params.stringify instead
      */
  stringifyParams?: StringifyParamsFn<TPath, TParams>;
};

export type FileBaseRouteOptions<
  TParentRoute extends AnyRoute = AnyRoute,
  TId extends string = string,
  TPath extends string = string,
  TSearchValidator = undefined,
  TParams = {},
  TLoaderDeps extends Record<string, any> = {},
  TLoaderFn = undefined,
  TRouterContext = {},
  TRouteContextFn = AnyContext,
  TBeforeLoadFn = AnyContext
> = ParamsOptions<TPath, TParams> & {};

export type BaseRouteOptions<
  TParentRoute extends AnyRoute = AnyRoute,
  TId extends string = string,
  TCustomId extends string = string,
  TPath extends string = string,
  TSearchValidator = undefined,
  TParams = {},
  TLoaderDeps extends Record<string, any> = {},
  TLoaderFn = undefined,
  TRouterContext = {},
  TRouteContextFn = AnyContext,
  TBeforeLoadFn = AnyContext
> = RoutePathOptions<TCustomId, TPath> &
  FileBaseRouteOptions<
    TParentRoute,
    TId,
    TPath,
    TSearchValidator,
    TParams,
    TLoaderDeps,
    TLoaderFn,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn
  > & {
    getParentRoute: () => TParentRoute;
  };

export interface StaticDataRouteOption {}
interface RequiredStaticDataRouteOption {
  staticData: StaticDataRouteOption;
}
interface OptionalStaticDataRouteOption {
  staticData?: StaticDataRouteOption;
}

export type UpdatableStaticRouteOption = {} extends StaticDataRouteOption
  ? OptionalStaticDataRouteOption
  : RequiredStaticDataRouteOption;

export type SearchMiddlewareContext<TSearchSchema> = {
  search: TSearchSchema;
  next: (newSearch: TSearchSchema) => TSearchSchema;
};

export type SearchMiddleware<TSearchSchema> = (
  ctx: SearchMiddlewareContext<TSearchSchema>
) => TSearchSchema;

export type ReactNode = any;
export type SyncRouteComponent<TProps> =
  | ((props: TProps) => ReactNode)
  | React.LazyExoticComponent<(props: TProps) => ReactNode>;
export type AsyncRouteComponent<TProps> = SyncRouteComponent<TProps> & {
  preload?: () => Promise<void>;
};
export type RouteComponent<TProps = any> = AsyncRouteComponent<TProps>;

export type ErrorComponentProps = {
  error: Error;
  info?: {
    componentStack: string;
  };
  reset: () => void;
};
export type NotFoundRouteProps = {
  data: unknown;
};

export type ErrorRouteComponent = RouteComponent<ErrorComponentProps>;
export type NotFoundRouteComponent = SyncRouteComponent<NotFoundRouteProps>;

export type Assign<TLeft, TRight> = TLeft extends any
  ? TRight extends any
    ? keyof TLeft extends never
      ? TRight
      : keyof TRight extends never
      ? TLeft
      : keyof TLeft & keyof TRight extends never
      ? TLeft & TRight
      : Omit<TLeft, keyof TRight> & TRight
    : never
  : never;

export type InferFullSearchSchemaInput<TRoute> = TRoute extends {
  types: {
    fullSearchSchemaInput: infer TFullSearchSchemaInput;
  };
}
  ? TFullSearchSchemaInput
  : {};

export interface AnyStandardSchemaValidateSuccess {
  readonly value: any;
  readonly issues?: undefined;
}
export interface AnyStandardSchemaValidateFailure {
  readonly issues: ReadonlyArray<AnyStandardSchemaValidateIssue>;
}
export interface AnyStandardSchemaValidateIssue {
  readonly message: string;
}
export interface AnyStandardSchemaValidateInput {
  readonly value: any;
}

export type AnyStandardSchemaValidate = (
  value: unknown
) =>
  | (AnyStandardSchemaValidateSuccess | AnyStandardSchemaValidateFailure)
  | Promise<
      AnyStandardSchemaValidateSuccess | AnyStandardSchemaValidateFailure
    >;

export interface StandardSchemaValidatorTypes<TInput, TOutput> {
  readonly input: TInput;
  readonly output: TOutput;
}

export interface StandardSchemaValidatorProps<TInput, TOutput> {
  readonly types?: StandardSchemaValidatorTypes<TInput, TOutput> | undefined;
  readonly validate: AnyStandardSchemaValidate;
}
export interface StandardSchemaValidator<TInput, TOutput> {
  readonly "~standard": StandardSchemaValidatorProps<TInput, TOutput>;
}

export type AnyStandardSchemaValidator = StandardSchemaValidator<any, any>;

export interface ValidatorAdapter<TInput, TOutput> {
  types: {
    input: TInput;
    output: TOutput;
  };
  parse: (input: unknown) => TOutput;
}

export type AnyValidatorAdapter = ValidatorAdapter<any, any>;

export type ValidatorFn<TInput, TOutput> = (input: TInput) => TOutput;

export interface ValidatorObj<TInput, TOutput> {
  parse: ValidatorFn<TInput, TOutput>;
}
export type AnyValidatorObj = ValidatorObj<any, any>;

export type SearchSchemaInput = {
  __TSearchSchemaInput__: "TSearchSchemaInput";
};

export type ResolveValidatorOutputFn<TValidator> = TValidator extends (
  ...args: any
) => infer TSchema
  ? TSchema
  : AnySchema;

export type ResolveSearchValidatorInputFn<TValidator> = TValidator extends (
  input: infer TSchemaInput
) => any
  ? TSchemaInput extends SearchSchemaInput
    ? Omit<TSchemaInput, keyof SearchSchemaInput>
    : ResolveValidatorOutputFn<TValidator>
  : AnySchema;

export type ResolveSearchValidatorInput<TValidator> =
  TValidator extends AnyStandardSchemaValidator
    ? NonNullable<TValidator["~standard"]["types"]>["input"]
    : TValidator extends AnyValidatorAdapter
    ? TValidator["types"]["input"]
    : TValidator extends AnyValidatorObj
    ? ResolveSearchValidatorInputFn<TValidator["parse"]>
    : ResolveSearchValidatorInputFn<TValidator>;

export type ResolveFullSearchSchemaInput<
  TParentRoute extends AnyRoute,
  TSearchValidator
> = Assign<
  InferFullSearchSchemaInput<TParentRoute>,
  ResolveSearchValidatorInput<TSearchValidator>
>;

export type SearchFilter<TInput, TResult = TInput> = (prev: TInput) => TResult;

export type ResolveValidatorOutput<TValidator> = unknown extends TValidator
  ? TValidator
  : TValidator extends AnyStandardSchemaValidator
  ? NonNullable<TValidator["~standard"]["types"]>["output"]
  : TValidator extends AnyValidatorAdapter
  ? TValidator["types"]["output"]
  : TValidator extends AnyValidatorObj
  ? ResolveValidatorOutputFn<TValidator["parse"]>
  : ResolveValidatorOutputFn<TValidator>;

export type InferFullSearchSchema<TRoute> = TRoute extends {
  types: {
    fullSearchSchema: infer TFullSearchSchema;
  };
}
  ? TFullSearchSchema
  : {};

export type ResolveFullSearchSchema<
  TParentRoute extends AnyRoute,
  TSearchValidator
> = unknown extends TParentRoute
  ? ResolveValidatorOutput<TSearchValidator>
  : Assign<
      InferFullSearchSchema<TParentRoute>,
      ResolveValidatorOutput<TSearchValidator>
    >;

export interface RouteMatch<
  out TRouteId,
  out TFullPath,
  out TAllParams,
  out TFullSearchSchema,
  out TLoaderData,
  out TAllContext,
  out TLoaderDeps
> {
  id: string;
  routeId: TRouteId;
  fullPath: TFullPath;
  index: number;
  pathname: string;
  params: TAllParams;
  status: "pending" | "success" | "error" | "redirected" | "notFound";
  isFetching: false | "beforeLoad" | "loader";
  error: unknown;
  paramsError: unknown;
  searchError: unknown;
  updatedAt: number;
  loadPromise?: ControlledPromise<void>;
  beforeLoadPromise?: ControlledPromise<void>;
  loaderPromise?: ControlledPromise<void>;
  loaderData?: TLoaderData;
  __routeContext: Record<string, unknown>;
  __beforeLoadContext: Record<string, unknown>;
  context: TAllContext;
  search: TFullSearchSchema;
  fetchCount: number;
  abortController: AbortController;
  cause: "preload" | "enter" | "stay";
  loaderDeps: TLoaderDeps;
  preload: boolean;
  invalid: boolean;
  meta?: Array<React.JSX.IntrinsicElements["meta"] | undefined>;
  links?: Array<React.JSX.IntrinsicElements["link"] | undefined>;
  scripts?: Array<React.JSX.IntrinsicElements["script"] | undefined>;
  headers?: Record<string, string>;
  globalNotFound?: boolean;
  staticData: StaticDataRouteOption;
  minPendingPromise?: ControlledPromise<void>;
  pendingTimeout?: ReturnType<typeof setTimeout>;
}

export interface UpdatableRouteOptions<
  in out TParentRoute extends AnyRoute,
  in out TRouteId,
  in out TFullPath,
  in out TParams,
  in out TSearchValidator,
  in out TLoaderFn,
  in out TLoaderDeps,
  in out TRouterContext,
  in out TRouteContextFn,
  in out TBeforeLoadFn
> extends UpdatableStaticRouteOption {
  caseSensitive?: boolean;
  wrapInSuspense?: boolean;
  component?: RouteComponent;
  errorComponent?: false | null | ErrorRouteComponent;
  notFoundComponent?: NotFoundRouteComponent;
  pendingComponent?: RouteComponent;
  pendingMs?: number;
  pendingMinMs?: number;
  staleTime?: number;
  gcTime?: number;
  preload?: boolean;
  preloadStaleTime?: number;
  preloadGcTime?: number;
  search?: {
    middlewares?: Array<
      SearchMiddleware<
        ResolveFullSearchSchemaInput<TParentRoute, TSearchValidator>
      >
    >;
  };
  /**
    @deprecated Use search.middlewares instead
    */
  preSearchFilters?: Array<
    SearchFilter<ResolveFullSearchSchema<TParentRoute, TSearchValidator>>
  >;
  /**
    @deprecated Use search.middlewares instead
    */
  postSearchFilters?: Array<
    SearchFilter<ResolveFullSearchSchema<TParentRoute, TSearchValidator>>
  >;
  onCatch?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onError?: (err: any) => void;
  onEnter?: (
    match: RouteMatch<
      TRouteId,
      TFullPath,
      ResolveAllParamsFromParent<TParentRoute, TParams>,
      ResolveFullSearchSchema<TParentRoute, TSearchValidator>,
      ResolveLoaderData<TLoaderFn>,
      ResolveAllContext<
        TParentRoute,
        TRouterContext,
        TRouteContextFn,
        TBeforeLoadFn
      >,
      TLoaderDeps
    >
  ) => void;
  onStay?: (
    match: RouteMatch<
      TRouteId,
      TFullPath,
      ResolveAllParamsFromParent<TParentRoute, TParams>,
      ResolveFullSearchSchema<TParentRoute, TSearchValidator>,
      ResolveLoaderData<TLoaderFn>,
      ResolveAllContext<
        TParentRoute,
        TRouterContext,
        TRouteContextFn,
        TBeforeLoadFn
      >,
      TLoaderDeps
    >
  ) => void;
  onLeave?: (
    match: RouteMatch<
      TRouteId,
      TFullPath,
      ResolveAllParamsFromParent<TParentRoute, TParams>,
      ResolveFullSearchSchema<TParentRoute, TSearchValidator>,
      ResolveLoaderData<TLoaderFn>,
      ResolveAllContext<
        TParentRoute,
        TRouterContext,
        TRouteContextFn,
        TBeforeLoadFn
      >,
      TLoaderDeps
    >
  ) => void;
  headers?: (ctx: {
    loaderData: ResolveLoaderData<TLoaderFn>;
  }) => Record<string, string>;
  head?: (ctx: {
    matches: Array<
      RouteMatch<
        TRouteId,
        TFullPath,
        ResolveAllParamsFromParent<TParentRoute, TParams>,
        ResolveFullSearchSchema<TParentRoute, TSearchValidator>,
        ResolveLoaderData<TLoaderFn>,
        ResolveAllContext<
          TParentRoute,
          TRouterContext,
          TRouteContextFn,
          TBeforeLoadFn
        >,
        TLoaderDeps
      >
    >;
    match: RouteMatch<
      TRouteId,
      TFullPath,
      ResolveAllParamsFromParent<TParentRoute, TParams>,
      ResolveFullSearchSchema<TParentRoute, TSearchValidator>,
      ResolveLoaderData<TLoaderFn>,
      ResolveAllContext<
        TParentRoute,
        TRouterContext,
        TRouteContextFn,
        TBeforeLoadFn
      >,
      TLoaderDeps
    >;
    params: ResolveAllParamsFromParent<TParentRoute, TParams>;
    loaderData: ResolveLoaderData<TLoaderFn> | undefined;
  }) => {
    links?: AnyRouteMatch["links"];
    scripts?: AnyRouteMatch["scripts"];
    meta?: AnyRouteMatch["meta"];
  };
  ssr?: boolean;
}

export type RouteOptions<
  TParentRoute extends AnyRoute = AnyRoute,
  TId extends string = string,
  TCustomId extends string = string,
  TFullPath extends string = string,
  TPath extends string = string,
  TSearchValidator = undefined,
  TParams = AnyPathParams,
  TLoaderDeps extends Record<string, any> = {},
  TLoaderFn = undefined,
  TRouterContext = {},
  TRouteContextFn = AnyContext,
  TBeforeLoadFn = AnyContext
> = BaseRouteOptions<
  TParentRoute,
  TId,
  TCustomId,
  TPath,
  TSearchValidator,
  TParams,
  TLoaderDeps,
  TLoaderFn,
  TRouterContext,
  TRouteContextFn,
  TBeforeLoadFn
> &
  UpdatableRouteOptions<
    NoInfer<TParentRoute>,
    NoInfer<TCustomId>,
    NoInfer<TFullPath>,
    NoInfer<TParams>,
    NoInfer<TSearchValidator>,
    NoInfer<TLoaderFn>,
    NoInfer<TLoaderDeps>,
    NoInfer<TRouterContext>,
    NoInfer<TRouteContextFn>,
    NoInfer<TBeforeLoadFn>
  >;

export type RootRouteOptions<
  TSearchValidator = undefined,
  TRouterContext = {},
  TRouteContextFn = AnyContext,
  TBeforeLoadFn = AnyContext,
  TLoaderDeps extends Record<string, any> = {},
  TLoaderFn = undefined
> = Omit<
  RouteOptions<
    any, // TParentRoute
    RootRouteId, // TId
    RootRouteId, // TCustomId
    "", // TFullPath
    "", // TPath
    TSearchValidator,
    {}, // TParams
    TLoaderDeps,
    TLoaderFn,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn
  >,
  | "path"
  | "id"
  | "getParentRoute"
  | "caseSensitive"
  | "parseParams"
  | "stringifyParams"
  | "params"
>;

export type Constrain<T, TConstraint, TDefault = TConstraint> =
  | (T extends TConstraint ? T : never)
  | TDefault;

export declare class RootRoute<
  in out TSearchValidator = undefined,
  in out TRouterContext = {},
  in out TRouteContextFn = AnyContext,
  in out TBeforeLoadFn = AnyContext,
  in out TLoaderDeps extends Record<string, any> = {},
  in out TLoaderFn = undefined,
  in out TChildren = unknown,
  in out TFileRouteTypes = unknown
> extends Route<
  any, // TParentRoute
  "/", // TPath
  "/", // TFullPath
  string, // TCustomId
  RootRouteId, // TId
  TSearchValidator, // TSearchValidator
  {}, // TParams
  TRouterContext,
  TRouteContextFn,
  TBeforeLoadFn,
  TLoaderDeps,
  TLoaderFn,
  TChildren
> {
  /**
   * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
   */
  constructor(
    options?: RootRouteOptions<
      TSearchValidator,
      TRouterContext,
      TRouteContextFn,
      TBeforeLoadFn,
      TLoaderDeps,
      TLoaderFn
    >
  );
  addChildren<const TNewChildren>(
    children: Constrain<
      TNewChildren,
      ReadonlyArray<AnyRoute> | Record<string, AnyRoute>
    >
  ): RootRoute<
    TSearchValidator,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn,
    TLoaderDeps,
    TLoaderFn,
    TNewChildren,
    TFileRouteTypes
  >;
  _addFileChildren<const TNewChildren>(
    children: TNewChildren
  ): RootRoute<
    TSearchValidator,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn,
    TLoaderDeps,
    TLoaderFn,
    TNewChildren,
    TFileRouteTypes
  >;
  _addFileTypes<TFileRouteTypes>(): RootRoute<
    TSearchValidator,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn,
    TLoaderDeps,
    TLoaderFn,
    TChildren,
    TFileRouteTypes
  >;
}

export type InferFileRouteTypes<TRouteTree extends AnyRoute> =
  TRouteTree extends RootRoute<
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    infer TFileRouteTypes extends FileRouteTypes
  >
    ? TFileRouteTypes
    : never;

export type RouteToPath<TRouter extends AnyRouter> = unknown extends TRouter
  ? string
  : InferFileRouteTypes<TRouter["routeTree"]> extends never
  ? CodeRouteToPath<TRouter>
  : FileRouteToPath<TRouter>;

export type AbsoluteToPath<TRouter extends AnyRouter, TFrom extends string> =
  | (string extends TFrom
      ? CurrentPath<TRouter>
      : TFrom extends `/`
      ? never
      : CurrentPath<TRouter>)
  | (string extends TFrom
      ? ParentPath<TRouter>
      : TFrom extends `/`
      ? never
      : ParentPath<TRouter>)
  | RouteToPath<TRouter>
  | (TFrom extends "/"
      ? never
      : string extends TFrom
      ? never
      : InferDescendantToPaths<TRouter, RemoveTrailingSlashes<TFrom>>);

export type RelativeToCurrentPath<
  TRouter extends AnyRouter,
  TFrom extends string,
  TTo extends string,
  TResolvedPath extends string = ResolveRelativePath<TFrom, TTo>
> = RelativeToPath<TRouter, TTo, TResolvedPath> | CurrentPath<TRouter>;

export type RelativeToPathAutoComplete<
  TRouter extends AnyRouter,
  TFrom extends string,
  TTo extends string
> = string extends TTo
  ? string
  : string extends TFrom
  ? AbsoluteToPath<TRouter, TFrom>
  : TTo & `..${string}` extends never
  ? TTo & `.${string}` extends never
    ? AbsoluteToPath<TRouter, TFrom>
    : RelativeToCurrentPath<TRouter, TFrom, TTo>
  : RelativeToParentPath<TRouter, TFrom, TTo>;

export type ToPathOption<
  TRouter extends AnyRouter = AnyRouter,
  TFrom extends string = string,
  TTo extends string | undefined = string
> = ConstrainLiteral<
  TTo,
  RelativeToPathAutoComplete<
    TRouter,
    NoInfer<TFrom> extends string ? NoInfer<TFrom> : "",
    NoInfer<TTo> & string
  >
>;

export interface OptionalToOptions<
  in out TRouter extends AnyRouter,
  in out TFrom extends string,
  in out TTo extends string | undefined
> {
  to?: ToPathOption<TRouter, TFrom, TTo> & {};
}

export type MakeToRequired<
  TRouter extends AnyRouter,
  TFrom extends string,
  TTo extends string | undefined
> = string extends TFrom
  ? string extends TTo
    ? OptionalToOptions<TRouter, TFrom, TTo>
    : TTo & CatchAllPaths<TRouter> extends never
    ? RequiredToOptions<TRouter, TFrom, TTo>
    : OptionalToOptions<TRouter, TFrom, TTo>
  : OptionalToOptions<TRouter, TFrom, TTo>;
