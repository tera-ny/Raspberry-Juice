import * as crypto from "crypto"
import { SecretManagerServiceClient } from "@google-cloud/secret-manager"

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

const generate = (
  urlPrefix: string,
  keyName: string,
  key: string,
  expiresOfUnix: number
) => {
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
  keyName: string,
  secretKey: string
) => {
  if (process.env.ENVIRONMENT === "development") return "xxxxxx"
  const urlPrefix = `https://raspberry-juice.com${requestPath}`
  const prefix = generate(urlPrefix, keyName, secretKey, expiresOfUnix)
  return prefix
}

const makeCookieString = (
  key: string,
  value: string,
  path: string,
  expires: Date,
  isSecure: boolean
) => {
  let values = [`${key}=${value}`]
  values.push(`Path=${path}`)
  values.push(`Expires=${expires.toUTCString()}`)
  if (isSecure) {
    values.push("Secure")
  }
  values.push("SameSite=None")
  values.push("HttpOnly")
  return values.join("; ")
}

export const generateCDNCookies = async (
  contentIDs: string[],
  expiresOfUnix: number,
  isSecure: boolean
): Promise<string[]> => {
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
  return contentIDs.map((id) => {
    const path = `/contents/video/${id}/`
    return makeCookieString(
      "Cloud-CDN-Cookie",
      generateSignature(path, expiresOfUnix, keyName, signatureKey),
      path,
      new Date(expiresOfUnix * 1000),
      isSecure
    )
  })
}
