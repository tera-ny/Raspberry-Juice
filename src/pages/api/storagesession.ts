import { NextApiHandler } from "next"
import initAuth from "~/modules/nextauth"
import { AuthUser, verifyIdToken } from "next-firebase-auth"

initAuth()

const handler: NextApiHandler = async (req, res) => {
  const auth = req.headers.authorization
  let decoded: AuthUser
  try {
    decoded = await verifyIdToken(auth)
  } catch (error) {
    console.error(error)
    res.statusCode = 403
    res.end()
    return
  }
  try {
    if (req.headers.authorization) {
      const response = await fetch(
        "https://asia-northeast1-orange-juice-prod.cloudfunctions.net/http-sessionCookie",
        {
          method: "POST",
          headers: {
            Authorization: req.headers.authorization,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              path: `users/${decoded.id}`,
            },
          }),
        }
      ).then((response) => response.json())
      res.setHeader(
        "Set-Cookie",
        `Cloud-CDN-Cookie=${response.result.token}; Path=${response.result.path}; Expires=${response.result.expires}; Secure; HttpOnly`
      )
      res.statusCode = 200
      res.json({
        expires: response.result.expires,
      })
      return
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
