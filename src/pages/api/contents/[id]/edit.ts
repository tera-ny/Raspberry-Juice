import { NextApiHandler } from "next"
import { verifyAuthCookie } from "~/modules/auth/login"
import { Path, Video } from "~/modules/entity"
import crypto from "crypto"
import { Timestamp } from "firebase/firestore"
import app from "~/modules/admin"

const calculateHash = (data: string) =>
  crypto.createHash("sha256").update(data).digest("hex")

const typeCheck = (body: any) => {
  const keys = Object.keys(body)
  return (
    (!keys.includes("title") || typeof body.title === "string") &&
    (!keys.includes("description") || typeof body.description === "string")
  )
}

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id
  try {
    if (req.method.toLowerCase() !== "put") res.status(405)
    const decoded = await verifyAuthCookie(req)
    if (typeof id !== "string") {
      console.error(id, "is not string")
      res.status(400).end()
      return
    }
    const body = JSON.parse(req.body)
    if (!typeCheck(body)) {
      console.error("can't parse body", body)
      return res.status(400).end()
    }
    const document = app.firestore().collection(Path.Content).doc(id)
    return app.firestore().runTransaction(async (transaction) => {
      const content = await transaction.get(document)
      if (!content.exists) return res.status(404).end()
      const data = content.data() as Video<Timestamp>
      if (data.owner !== decoded.uid) res.status(403).end()
      const etag = req.headers["if-match"]
      if (etag) {
        const hash = calculateHash(
          JSON.stringify({
            id: content.id,
            last: content.updateTime.nanoseconds,
          })
        )
        if (hash !== etag) return res.status(412).end()
      }
      let updatedata: { title?: string; description?: string } = {}
      if (body.title !== undefined && body.title !== data.title) {
        updatedata.title = body.title
      }
      if (
        body.description !== undefined &&
        body.description !== data.description
      ) {
        updatedata.description = body.description
      }
      if (Object.keys(updatedata).length) {
        await transaction.update(document, updatedata)
        return res.status(200).end()
      } else {
        console.error("not found diff")
        return res.status(400).end()
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}

export default handler
