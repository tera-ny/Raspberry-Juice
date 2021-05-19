import { NextApiHandler } from "next"
import { setCookie } from "nookies"

const handler: NextApiHandler = async (req, res) => {
  const response = await fetch(
    "https://asia-northeast1-orange-juice-prod.cloudfunctions.net/http-sessionCookie",
    {
      method: "POST",
      headers: {
        Authorization: req.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: {} }),
    }
  ).then((response) => response.json())
  res.setHeader("Access-Control-Allow-Origin", "https://orange-juice.app")
  setCookie({ res }, "Cloud-CDN-Cookie", `"${response.result.token}"`, {
    domain: ".orange-juice.app",
    path: response.result.path,
    maxAge: response.result.maxAge,
    secure: true,
    httpOnly: true,
  })
  res.end()
}

export default handler
