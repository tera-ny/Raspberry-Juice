import { FC } from "react"
import { useRecoilValue } from "recoil"
import authState, { useListenAuth } from "~/stores/auth"

interface Props {
  shouldLoggedIn?: boolean
}

const Auth: FC<Props> = ({ children, shouldLoggedIn }) => {
  const auth = useRecoilValue(authState)
  useListenAuth()
  if (shouldLoggedIn) {
    return auth.uid ? <>{children}</> : <></>
  } else {
    return <>{children}</>
  }
}

export default Auth
