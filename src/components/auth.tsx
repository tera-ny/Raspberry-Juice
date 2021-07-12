import { FC } from "react"
import { subscribeAuth } from "~/stores/auth"

const Auth: FC = ({ children }) => {
  subscribeAuth()
  return <>{children}</>
}

export default Auth
