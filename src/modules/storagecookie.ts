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

  const input = `URLPrefix=${urlPrefixEncoded}:Expires=${expiresOfUnix}:KeyName=${keyName}`
  const signature = crypto
    .createHmac("sha1", decodedKeybytes)
    .update(input)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")

  const signedValue = `${input}:Signature=${signature}`

  return signedValue
}

export const generateSignature = async (
  requestPath: string,
  expiresOfUnix: number
) => {
  console.log(process.env.Environment)
  if (process.env.Environment === "development") return "xxxxxx"
  const keyName = process.env.CLOUD_SECRET_NAME
  const keyVersion = process.env.CLOUD_SECRET_VERSION
  const projectID = process.env.PROJECT_ID

  const client = new SecretManagerServiceClient()
  const signatureKey = await decodeSecretKey(
    client,
    projectID,
    keyName,
    keyVersion
  )
  const urlPrefix = `https://orange-juice.app${requestPath}`
  const prefix = generate(urlPrefix, keyName, signatureKey, expiresOfUnix)
  return prefix
}
