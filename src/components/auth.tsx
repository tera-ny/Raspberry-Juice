import { FC, useEffect } from "react"
import { useRecoilState } from "recoil"
import authState from "~/stores/auth"
import firebase from "~/modules/firebase"

interface Props {
  shouldLoggedIn?: boolean
}

const Auth: FC<Props> = ({ children, shouldLoggedIn }) => {
  const [uid, setAuth] = useRecoilState(authState)
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setAuth(user?.uid ?? null)
    })
    return () => {
      unsubscribe()
    }
  })
  if (shouldLoggedIn) {
    return uid ? <>{children}</> : <></>
  } else {
    return <>{children}</>
  }
}

export default Auth
