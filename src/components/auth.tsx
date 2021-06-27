import { FC } from "react"
import { useRecoilValue } from "recoil"
import { useListenAuth, uidSelector } from "~/stores/auth"

interface Props {
  shouldLoggedIn?: boolean
}

const Auth: FC<Props> = ({ children, shouldLoggedIn }) => {
  const uid = useRecoilValue(uidSelector)
  useListenAuth()
  if (shouldLoggedIn) {
    return uid ? <>{children}</> : <></>
  } else {
    return <>{children}</>
  }
}

export default Auth
