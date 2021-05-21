import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
  console.log(req.cookies["test"])
  res.statusCode = 200
  res.end()
}

export default handler
