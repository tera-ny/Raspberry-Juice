import { NextApiHandler } from "next"
import initAuth from "~/modules/nextauth"

initAuth()

const handler: NextApiHandler = async (req, res) => {
  if (
    !(
      typeof req.query.color === "string" ||
      typeof req.query.color === "undefined"
    )
  ) {
    res.end()
    return
  }
  const colorQuery = parseInt(req.query.color ?? "")
    ?.toString(16)
    .padStart(6, "0")
  const matched = colorQuery.match(/^([a-f]|[0-9]){6}$/)
  const color = matched ? "#" + matched[0] : "#E2495D"
  res.setHeader("Content-Type", "image/svg+xml")
  res.send(
    `<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="200" cy="200" r="200" fill="${color}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M274.404 69.0121L246.963 59L209.408 162.433H108L142.069 341H256.931L291 162.442V162.433H240.485L274.404 69.0121ZM240.485 162.433H209.408L161.735 293.735L189.176 303.747L240.485 162.433Z" fill="white"/>
</svg>`
  )
  res.end()
}

export default handler
