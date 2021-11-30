import app from "./firebase"
import { v4 } from "uuid"
import firebase from "firebase/app"
import "firebase/storage"

const allowMiMEType = ["image/png", "image/jpeg", "image/gif", "image/webp"]

const upload = async (ref: string, file: File, uid: string, id?: string) => {
  console.log(file.type)
  if (!allowMiMEType.includes(file.type))
    throw new Error("used not allow mime type.")
  const fileID: string = id ?? v4()
  const targetReference = app.storage().ref(ref).child(fileID)
  return new Promise<{
    id: string
    snapshot: firebase.storage.UploadTaskSnapshot
  }>((resolve, reject) => {
    targetReference
      .put(file, { customMetadata: { uploader: uid } })
      .then((snapshot) => resolve({ id: fileID, snapshot }), reject)
  })
}

export default upload
