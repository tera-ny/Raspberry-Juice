import { NextApiHandler } from "next"
import { setCookie } from "nookies"

const handler: NextApiHandler = async (req, res) => {
  const response = await fetch(
    "https://asia-northeast1-orange-juice-prod.cloudfunctions.net/http-sessionCookie",
    {
      headers: {
        Authorization: req.headers.authorization,
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json())
  setCookie({ res }, "Cloud-CDN-Cookie", response.token, {
    path: response.path,
    maxAge: response.maxAge,
    secure: true,
    httpOnly: true,
  })
  res.end()
}

export default handler
