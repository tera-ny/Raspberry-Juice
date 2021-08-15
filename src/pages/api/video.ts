import { NextApiHandler } from "next"
import initAuth from "~/modules/nextauth"
import { AuthUser, verifyIdToken, getFirebaseAdmin } from "next-firebase-auth"
import { Video } from "~/modules/entity"

initAuth()

const handler: NextApiHandler = async (req, res) => {
  const auth = req.headers.authorization
  const id = req.query.id
  let decoded: AuthUser
  if (typeof id !== "string") {
    res.statusCode = 400
    res.end()
    return
  }
  try {
    decoded = await verifyIdToken(auth)
  } catch (error) {
    console.error(error)
    res.statusCode = 403
    res.end()
    return
  }
  try {
    const snapshot = await getFirebaseAdmin()
      .firestore()
      .collection("users")
      .doc(decoded.id)
      .collection("contents")
      .doc(id)
      .get()
    if (snapshot.exists) {
      const video = snapshot.data() as Video
      res.statusCode = 200
      res.json({
        video,
      })
      return
    } else {
      res.statusCode = 404
    }
  } catch (error) {
    console.error(error)
    res.statusCode = 500
  }
  res.end()
}

export default handler
