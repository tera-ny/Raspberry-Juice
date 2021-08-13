import * as admin from "firebase-admin"

const app =
  admin.apps.length === 0
    ? admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.PROJECT_ID,
          clientEmail: process.env.CLIENT_EMAIL,
          privateKey: process.env.PRIVATE_KEY,
        }),
      })
    : admin.apps[0]

export default app
