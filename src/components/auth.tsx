import { FC } from "react"
import auth from "~/stores/auth"

const Auth: FC = ({ children }) => {
  auth.effect.listenAuth()
  return <>{children}</>
}

export default Auth
