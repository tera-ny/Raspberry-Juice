import { NextApiHandler } from "next"

const handler: NextApiHandler = async (_req, res) => {
  res.setHeader(
    "set-cookie",
    `Cloud-CDN-Cookie=deleted; Path=/contents/video; Expire=${new Date().toUTCString()}; HttpOnly`
  )
  return res.status(200).redirect("/login").end()
}

export default handler
