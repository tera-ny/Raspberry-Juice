import * as crypto from "crypto"
import { SecretManagerServiceClient } from "@google-cloud/secret-manager"
import { makeCookieString } from "./utils"

const decodeSecretKey = async (
  client: SecretManagerServiceClient,
  projectID: string,
  name: string,
  secretVersion: string
) => {
  const path = client.secretVersionPath(projectID, name, secretVersion)
  const [version] = await client.accessSecretVersion({ name: path })
  return version.payload!.data!.toString()
}

const generate = (urlPrefix: string, key: string, expiresOfUnix: number) => {
  const decodedKeybytes = Buffer.from(key, "base64")
  const urlPrefixEncoded = Buffer.from(urlPrefix)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")

  const input = `URLPrefix=${urlPrefixEncoded}:Expires=${expiresOfUnix}:KeyName=sign-key`
  const signature = crypto
    .createHmac("sha1", decodedKeybytes)
    .update(input)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")

  const signedValue = `${input}:Signature=${signature}`

  return signedValue
}

const generateSignature = (
  requestPath: string,
  expiresOfUnix: number,
  secretKey: string
) => {
  if (process.env.ENVIRONMENT === "development") return "xxxxxx"
  const urlPrefix = `https://raspberry-juice.com${requestPath}`
  const prefix = generate(urlPrefix, secretKey, expiresOfUnix)
  return prefix
}
export const generateCDNCookies = async (
  contentID: string[],
  expiresOfUnix: number,
  isSecure: boolean
) => {
  const keyName = process.env.CLOUD_SECRET_NAME
  const keyVersion = process.env.CLOUD_SECRET_VERSION
  const projectID = process.env.PROJECT_ID
  let signatureKey: string
  if (process.env.ENVIRONMENT === "development") {
    signatureKey = "xxxxxxxx"
  } else {
    const client = new SecretManagerServiceClient()
    signatureKey = await decodeSecretKey(client, projectID, keyName, keyVersion)
  }
  const path = `/contents/video/${contentID}/`
  return makeCookieString(
    "Cloud-CDN-Cookie",
    generateSignature(path, expiresOfUnix, signatureKey),
    "/contents/video/",
    new Date(expiresOfUnix * 1000),
    isSecure
  )
}
