import { FC, useCallback, useState } from "react"
import authState from "~/stores/auth"
import { useRecoilValue } from "recoil"
import firebase from "~/modules/firebase"
import "firebase/auth"
import { setCookie } from "nookies"

const Template: FC = () => {
  const uid = useRecoilValue(authState)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const signIn = useCallback(() => {
    firebase.auth().signInWithEmailAndPassword(email, password)
  }, [email, password])
  const getToken = useCallback(async () => {
    const token = await firebase.auth().currentUser.getIdToken()
    const response = await fetch(
      "https://asia-northeast1-orange-juice-prod.cloudfunctions.net/http-sessionCookie",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: {} }),
      }
    ).then((response) => response.json())
    setCookie(null, "Cloud-CDN-Cookie", response.result.token, {
      domain: ".orange-juice.app",
      path: response.result.path,
      maxAge: response.result.maxAge,
      secure: true,
    })
    // await fetch("/api/session", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   mode: "cors",
    //   credentials: "include",
    // })
  }, [])
  return (
    <>
      {uid ? (
        <>
          <div>uid: {uid}</div>
          <button onClick={getToken}>get token</button>
          <audio controls>
            <source src="https://media.orange-juice.app/video/private/XCfWJkbGGvT08umQBaMl5ufL10u2/test.mp3" />
          </audio>
        </>
      ) : (
        <>
          <input
            type="mail"
            placeholder="mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button onClick={signIn}>signin</button>
        </>
      )}
    </>
  )
}

export default Template
