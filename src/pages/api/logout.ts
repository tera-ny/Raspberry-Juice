import { NextApiHandler } from "next"
import { unsetAuthCookies } from "next-firebase-auth"
import initAuth from "~/modules/nextauth" // the module you created above

initAuth()

const handler: NextApiHandler = async (req, res) => {
  try {
    await unsetAuthCookies(req, res)
  } catch (e) {
    return res.status(500).json({ error: "Unexpected error." })
  }
  return res.status(200).json({ success: true })
}

export default handler