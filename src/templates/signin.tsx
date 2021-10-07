import { FC, useCallback, useState } from "react"
import TextInput from "~/components/textinput"
import firebase from "~/modules/firebase"
import "firebase/auth"
import { useRef } from "react"

interface FormProps {
  signin: (email: string, password: string) => void
  disableButton: boolean
}

const Form: FC<FormProps> = ({ signin, disableButton }) => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const emailref = useRef<HTMLInputElement>()
  const passwordref = useRef<HTMLInputElement>()

  return (
    <>
      <div className="container">
        <TextInput
          title="e-mail"
          val={email}
          onchange={setEmail}
          ref={emailref}
          onclickenter={() => {
            if (passwordref.current) {
              passwordref.current.focus()
            }
          }}
        />
        <div className="passwordwrapper">
          <TextInput
            title="password"
            ispassword={!isShowPassword}
            onchange={setPassword}
            onclickenter={() => {
              signin(email, password)
            }}
            ref={passwordref}
            val={password}
          />
          <button
            className="showpassword"
            onClick={() => {
              setIsShowPassword((val) => !val)
            }}>{`${isShowPassword ? "hide" : "show"} password`}</button>
        </div>
        <div className="signinwrapper">
          <button
            className="signin"
            disabled={disableButton}
            onClick={() => {
              signin(email, password)
            }}>
            Sign in
          </button>
        </div>
      </div>
      <style jsx>{`
        .container {
          padding: 28px 20px 32px;
        }
        .passwordwrapper {
          margin-top: 16px;
        }
        .showpassword {
          margin: 12px 8px 0 0;
          border: none;
          outline: none;
          background-color: transparent;
          text-decoration: underline;
        }
        .showpassword:active {
          color: #636363;
        }
        .signinwrapper {
          margin: 32px 6px 0;
        }
        .signin {
          width: 100%;
          font-size: 24px;
          font-weight: bold;
          font-family: roboto;
          border: none;
          border-radius: 4px;
          color: white;
          background-color: #de7042;
          padding: 6px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
        }
        .signin:hover {
          background-color: #eb7646;
        }
        .signin:active {
          background-color: #d3754d;
        }
        button {
          cursor: pointer;
        }
        @media (prefers-color-scheme: dark) {
          .showpassword {
            color: white;
          }
          .showpassword:active {
            color: #d9d9d9;
          }
          .signin {
            box-shadow: none;
          }
        }
        @media screen and (max-width: 399px) {
          .container {
            height: 100%;
          }
        }
      `}</style>
    </>
  )
}

const SignInTemplate: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const signin = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    console.log()
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (e) {
      console.error(e)
    }
    setIsLoading(false)
  }, [])
  return (
    <>
      <div className="formwrapper">
        <picture className="logo">
          <source
            srcSet="/img/logo_full_dark.svg"
            media="(prefers-color-scheme: dark)"
          />
          <img height="60" width="220" src="/img/logo_full_light.svg" />
        </picture>
        <Form signin={signin} disableButton={isLoading} />
      </div>
      <style jsx>{`
        .formwrapper {
          padding: 28px 8px 32px;
          width: 100%;
          display: flex;
          flex-direction: column;
          background-color: white;
          min-height: 100vh;
        }
        .logo {
          padding-right: 20px;
          margin: 0 auto;
        }
        @media (prefers-color-scheme: dark) {
          .formwrapper {
            background-color: #25282e;
          }
        }
        @media screen and (min-width: 450px) {
          .formwrapper {
            border-radius: 4px;
            width: 400px;
            min-height: auto;
          }
        }
      `}</style>
    </>
  )
}

export default SignInTemplate
