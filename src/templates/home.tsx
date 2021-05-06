import { FC, useCallback, useState } from "react"
import authState from "~/stores/auth"
import { useRecoilValue } from "recoil"
import firebase from "~/modules/firebase"
import "firebase/auth"

const Template: FC = () => {
  const uid = useRecoilValue(authState)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const signIn = useCallback(() => {
    firebase.auth().signInWithEmailAndPassword(email, password)
  }, [email, password])
  const getToken = useCallback(async () => {
    const token = await firebase.auth().currentUser.getIdToken()
    await fetch("/api/session", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      credentials: "include",
    })
  }, [])
  return (
    <>
      {uid ? (
        <>
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
