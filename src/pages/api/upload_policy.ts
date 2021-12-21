import { NextApiHandler } from "next"
import crypto from "crypto"
import { generatePolicy } from "~/modules/uploadpolicy"
import app from "~/modules/admin"
import { verifyAuthCookie } from "~/modules/auth/login"

const generateID = () => {
  return crypto.randomBytes(10).toString("hex")
}

const contentCollection = () => {
  return app.firestore().collection("contents")
}

const hasDraft = async (uid: string, type: string) => {
  const query = contentCollection()
    .limit(1)
    .where("type", "==", type)
    .where("draft", "==", true)
    .where("owner", "==", uid)
  const result = await query.get()
  return {
    hasDraft: !result.empty,
    id: result.docs[0]?.ref.id,
  }
}

const makeDraft = async (uid: string, type: string) => {
  const id = generateID()
  const document = contentCollection().doc(id)
  await document.create({
    owner: uid,
    type,
    draft: true,
  })
  return { id }
}

const handler: NextApiHandler = async (req, res) => {
  const authUser = await verifyAuthCookie(req)
  if (!authUser) {
    res.statusCode = 403
    res.end()
  } else {
    let id: string
    const draft = await hasDraft(authUser.id, "video")
    if (!draft.hasDraft) {
      const makedDraft = await makeDraft(authUser.id, "video")
      id = makedDraft.id
    } else {
      id = draft.id
    }
    const policy = await generatePolicy(id)
    const response = {
      policy,
      id,
    }
    res.statusCode = 200
    res.json(response)
  }
}

export default handler
