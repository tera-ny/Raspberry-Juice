import { FC } from "react"
import auth from "~/stores/auth"

const Auth: FC = ({ children }) => {
  auth.effect.useListenAuth()
  return <>{children}</>
}

export default Auth
