import { NextApiHandler } from "next"
import admin from "~/modules/admin"
import * as adminSDK from "firebase-admin"

const handler: NextApiHandler = async (req, res) => {
  const auth = req.headers.authorization?.split(" ")
  let decoded: adminSDK.auth.DecodedIdToken
  try {
    if (!(auth[0] === "Bearer")) throw Error("invalid-arg")
    decoded = await admin.auth().verifyIdToken(auth[1] ?? "")
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
              path: `users/${decoded.uid}`,
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
