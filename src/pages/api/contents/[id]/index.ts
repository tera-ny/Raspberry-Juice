import { NextApiHandler } from "next";
import crypto from "crypto";
import api from "~/modules/api/videos/id";
import { NotFound, NotPublished, Unknown } from "~/modules/api/error";

const calculateHash = (data: string) =>
  crypto.createHash("sha256").update(data).digest("hex");

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id;
  if (typeof id !== "string") return res.status(400).end();
  try {
    const response = await api(id);
    const hash = calculateHash(
      JSON.stringify({
        id: id,
        last: response.lastupdate,
      }),
    );
    res.setHeader("ETag", hash);
    res.send(JSON.stringify(response.content));
  } catch (error) {
    if (error instanceof NotFound) return res.status(404).end();
    if (error instanceof NotPublished) return res.status(403).end();
    if (error instanceof Unknown) {
      console.error(error.message);
    }
    return res.status(500).end();
  }
};

export default handler;
