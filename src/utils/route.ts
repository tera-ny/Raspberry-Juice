interface RouteOption {
  query?: { [key: string]: string };
  hash?: `#${string}`;
}

type Identity =
  | "/contents/[id]/"
  | "/login/"
  | "/creators/[id]/"
  | "/api/contents/[id]/edit/"
  | "/api/contents/[id]/"
  | "/api/login/"
  | "/api/upload_policy/";

function toSearch(searchParams: URLSearchParams): string {
  return searchParams.toString() ? "?" + searchParams.toString() : "";
}

export function route(
  identity: "/contents/[id]/",
  id: string,
  option?: RouteOption,
): string;
export function route(identity: "/login/", option?: RouteOption): string;
export function route(
  identity: "/creators/[id]/",
  id: string,
  option?: RouteOption,
): string;
export function route(
  identity: "/api/contents/[id]/edit/",
  id: string,
  option?: RouteOption,
): string;
export function route(
  identity: "/api/contents/[id]/",
  id: string,
  option?: RouteOption,
): string;
export function route(identity: "/api/login/", option?: RouteOption): string;
export function route(
  identity: "/api/upload_policy/",
  option?: RouteOption,
): string;
export function route(
  identity: Identity,
  ...args: (string | RouteOption | undefined)[]
) {
  let path: string;
  let index: number;
  switch (identity) {
    case "/contents/[id]/": {
      const id = args[0];
      path = `/contents/${id}/`;
      index = 1;
      break;
    }
    case "/login/": {
      path = `/login/`;
      index = 0;
      break;
    }
    case "/creators/[id]/": {
      const id = args[0];
      path = `/creators/${id}/`;
      index = 1;
      break;
    }
    case "/api/contents/[id]/edit/": {
      const id = args[0];
      path = `/api/contents/${id}/edit/`;
      index = 1;
      break;
    }
    case "/api/contents/[id]/": {
      const id = args[0];
      path = `/api/contents/${id}/`;
      index = 1;
      break;
    }
    case "/api/login/": {
      path = `/api/login/`;
      index = 0;
      break;
    }
    case "/api/upload_policy/": {
      path = `/api/upload_policy/`;
      index = 0;
      break;
    }
  }
  const option = args[index] as (RouteOption | undefined);
  const searchParams = new URLSearchParams(option?.query ?? {});
  return `${path}${toSearch(searchParams)}${option?.hash}`;
}
