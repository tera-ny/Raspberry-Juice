import { NextApiHandler } from "next";
import { verifyAuthCookie } from "~/modules/auth/login";
import crypto from "crypto";
import api from "~/modules/api/videos/id";

const calculateHash = (data: string) =>
  crypto.createHash("sha256").update(data).digest("hex");

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id;
  if (typeof id !== "string") return res.status(400).end();
  try {
    const decoded = await verifyAuthCookie(req);
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
    if (typeof error === "number") {
      return res.status(error).end();
    } else {
      console.error(error);
      return res.status(400).end();
    }
  }
};

export default handler;
