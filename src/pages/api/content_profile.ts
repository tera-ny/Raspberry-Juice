import { NextApiHandler } from "next"
import initAuth from "~/modules/nextauth"
import { getFirebaseAdmin, verifyIdToken } from "next-firebase-auth"
import { Video } from "~/modules/entity"
import * as admin from "firebase-admin"

initAuth()

const handler: NextApiHandler = async (req, res) => {
  if (req.method.toLowerCase() !== "put") {
    res.statusCode = 400
    res.end()
    return
  }
  const authUser = await verifyIdToken(req.headers.authorization ?? "")
  if (!authUser) {
    res.statusCode = 403
    res.end()
  } else if (
    typeof req.query.id === "string" &&
    req.method.toLowerCase() === "put"
  ) {
    let id: string = req.query.id
    const snapshot = await getFirebaseAdmin()
      .firestore()
      .collection("contents")
      .doc(id)
      .get()
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
