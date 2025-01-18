type AnyRoute = any;
type TrailingSlashOption = any;
type RouterHistory = any;

export class Router<
  in out TRouteTree extends AnyRoute,
  in out TTrailingSlashOption extends TrailingSlashOption,
  in out TDefaultStructuralSharingOption extends boolean,
  in out TRouterHistory extends RouterHistory = RouterHistory,
  in out TDehydrated extends Record<string, any> = Record<string, any>,
  in out TSerializedError extends Record<string, any> = Record<string, any>
> {}

export type AnyRouter = Router<any, any, any, any, any, any>;

export type LinkOptions<
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends string = string,
  TTo extends string | undefined = ".",
  TMaskFrom extends string = TFrom,
  TMaskTo extends string = "."
> = NavigateOptions<TRouter, TFrom, TTo, TMaskFrom, TMaskTo> & LinkOptionsProps;

export interface Register {
  // router: Router
}

export type RegisteredRouter = Register extends {
  router: infer TRouter extends AnyRouter;
}
  ? TRouter
  : AnyRouter;
