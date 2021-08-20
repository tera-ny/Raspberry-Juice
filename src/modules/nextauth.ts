import { init } from "next-firebase-auth"

const initAuth = () => {
  init({
    appPageURL: "/",
    authPageURL: "/login",
    loginAPIEndpoint: "/api/login", // required
    logoutAPIEndpoint: "/api/logout", // required
    // Required in most cases.
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        // The private key must not be accesssible on the client side.
        privateKey: process.env.PRIVATE_KEY,
      },
      databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
    },
    firebaseClientInitConfig: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    },
    cookies: {
      name: "orange-juice-session",
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 10 * 60 * 60 * 24 * 1000,
      overwrite: false,
      path: "/",
      sameSite: "strict",
      secure: false,
      signed: true,
    },
  })
}

export default initAuth
