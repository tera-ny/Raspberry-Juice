import { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import { v4 } from "uuid";
import crypto from "crypto";
import admin from "~/modules/admin";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { Cookies } from "~/modules/utils";
import { auth } from "firebase-admin";
import app from "~/modules/admin";

const key = process.env.CSRF_SECRET as string;
const hmac = () => crypto.createHmac("sha256", key);
const sessionKey = "auth_sess";

export const tokenName = "c_token";
export const deadLineName = "c_dead_line";

export const setSessionCookie = async (token: string, cookies: Cookies) => {
  const expiresIn = 60 * 60 * 24 * 7 * 1000;
  const expires = dayjs().add(7, "day").toDate();
  const newCookie = await admin.auth().createSessionCookie(token, {
    expiresIn,
  });
  cookies.set(sessionKey, newCookie, "/", expires, true);
};

export const generateAndSetToken = (cookies: Cookies) => {
  const csrfToken = v4();
  const deadLine = dayjs().add(10, "minute");
  const token = hmac()
    .update(csrfToken + ";" + deadLine.toISOString())
    .digest("hex");
  cookies.set(tokenName, token, "/api/login", deadLine.toDate(), true);
  cookies.set(
    deadLineName,
    deadLine.toISOString(),
    "/api/login",
    deadLine.toDate(),
    true,
  );
  return csrfToken;
};

export const verifyAuthorizationRequest = (req: NextApiRequest) => {
  if (!req.headers.authorization) return undefined;
  return app.auth().verifyIdToken(req.headers.authorization);
};
