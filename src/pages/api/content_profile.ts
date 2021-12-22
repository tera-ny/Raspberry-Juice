import { NextApiHandler } from "next"
import { Video } from "~/modules/entity"
import * as admin from "firebase-admin"
import app from "~/modules/admin"
import { verifyAuthCookie } from "~/modules/auth/login"

const handler: NextApiHandler = async (req, res) => {
  if (req.method.toLowerCase() !== "put") {
    res.statusCode = 400
    res.end()
    return
  }
  const authUser = await verifyAuthCookie(req)
  if (!authUser) {
    res.statusCode = 403
    res.end()
  } else if (
    typeof req.query.id === "string" &&
    req.method.toLowerCase() === "put"
  ) {
    let id: string = req.query.id
    const snapshot = await app.firestore().collection("contents").doc(id).get()
    const data = snapshot.data() as Video<admin.firestore.Timestamp>
    if (data.owner === authUser.id) {
      let updateData: { title?: string; description?: string } = {}
      const body = JSON.parse(req.body)
      if (typeof body.title === "string") {
        updateData.title = body.title
      }
      if (typeof body.description === "string") {
        updateData.description = body.description
      }
      await snapshot.ref.set(updateData, { merge: true })
      res.statusCode = 200
      res.end()
    } else {
      res.statusCode = 403
      res.end()
    }
  } else {
    res.statusCode = 400
    res.end()
  }
}

export default handler
