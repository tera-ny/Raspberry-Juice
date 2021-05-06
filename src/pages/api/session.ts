import { NextApiHandler } from "next"
import { setCookie } from "nookies"

const handler: NextApiHandler = async (req, res) => {
  const response = await fetch(
    "https://asia-northeast1-orange-juice-prod.cloudfunctions.net/http-sessionCookie",
    {
      credentials: "include",
      method: "POST",
      headers: {
        Authorization: req.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: {} }),
    }
  ).then((response) => response.json())
  console.log(response)
  setCookie({ res }, "Cloud-CDN-Cookie", response.result.token, {
    domain: response.result.domain,
    path: response.result.path,
    maxAge: response.result.maxAge,
    secure: true,
    httpOnly: true,
  })
  res.end()
}

export default handler
