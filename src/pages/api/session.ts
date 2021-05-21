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
  res.setHeader(
    "Set-Cookie",
    `Cloud-CDN-Cookie=${response.result.token}; Domain=.orange-juice.app; Path=${response.result.path}; MaxAge=${response.result.maxAge}; Secure; HttpOnly`
  )
  res.end()
}

export default handler
