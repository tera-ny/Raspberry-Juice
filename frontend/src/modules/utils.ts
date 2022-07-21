import { ServerResponse } from "http";
import { NextApiResponse } from "next";

export const makeCookieString = (
  key: string,
  value: string,
  path: string,
  expires: Date,
  isSecure: boolean,
) => {
  let values = [`${key}=${value}`];
  values.push(`Path=${path}`);
  values.push(`Expires=${expires.toUTCString()}`);
  if (isSecure) {
    values.push("Secure");
  }
  values.push("HttpOnly");
  return values.join("; ");
};

export class Cookies {
  private res: ServerResponse | NextApiResponse;
  private l: string[];
  constructor(res: ServerResponse | NextApiResponse) {
    this.res = res;
    this.l = [];
  }
  public set(
    key: string,
    value: string,
    path: string,
    expires: Date,
    isSecure: boolean,
  ) {
    this.l.push(makeCookieString(key, value, path, expires, isSecure));
    this.res.setHeader("Set-Cookie", this.l);
  }
  public setValue(value: string) {
    this.l.push(value);
    this.res.setHeader("Set-Cookie", this.l);
  }
}
