import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
  const path = req.query.path
  const auth = req.headers.authorization
  try {
    if (auth && typeof path === "string") {
      const response = await fetch(
        "https://asia-northeast1-orange-juice-prod.cloudfunctions.net/http-sessionCookie",
        {
          method: "POST",
          headers: {
            Authorization: req.headers.authorization,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: { path: Buffer.from(path, "base64").toString() },
          }),
        }
      ).then((response) => response.json())
      res.setHeader(
        "Set-Cookie",
        `Cloud-CDN-Cookie=${response.result.token}; Path=${response.result.path}; MaxAge=${response.result.maxAge}; Secure; HttpOnly`
      )
      res.statusCode = 200
    } else if (!auth) {
      res.statusCode = 403
    } else {
      res.statusCode = 400
    }
  } catch (error) {
    console.error(error)
    //TODO: ErrorHandling
    res.statusCode = 400
  }
  res.end()
}

export default handler
