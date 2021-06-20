import firebase from "firebase/app"

const app =
  firebase.apps.length === 0
    ? firebase.initializeApp({
      apiKey: process.env.API_KEY,
      authDomain: "orange-juice-prod.firebaseapp.com",
      projectId: "orange-juice-prod",
      storageBucket: "orange-juice-prod.appspot.com",
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    })
    : firebase.apps[0]

export default app
