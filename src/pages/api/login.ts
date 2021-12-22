import { NextApiHandler } from "next"
import app from "~/modules/admin"
import {
  refreshCSRFToken,
  setSessionCookie,
  verifyCSRFToken,
} from "~/modules/auth/login"
import { Cookies } from "~/modules/utils"

const handler: NextApiHandler = async (req, res) => {
  const cookies = new Cookies(res)
  const verifiedCSRF = await verifyCSRFToken(req)
  const valid = app.auth().verifyIdToken(req.headers.authorization)
  if (verifiedCSRF && valid) {
    await setSessionCookie(req.headers.authorization, cookies)
    refreshCSRFToken(cookies)
    res.status(200).end()
  } else {
    res.status(400).end()
  }
}

export default handler
