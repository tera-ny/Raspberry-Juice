import { AppProps } from "next/app"
import { RecoilRoot } from "recoil"
import Auth from "~/components/auth"
import initAuth from "~/modules/nextauth"
import { useEffect } from "react"
import firebase from "firebase/app"
import "firebase/performance"

initAuth()

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    firebase.performance()
  }, [])
  return (
    <>
      <RecoilRoot>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </RecoilRoot>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont,
            Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          background-color: #f8f8f8;
          min-height: 100vh;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        p,
        button,
        a,
        input {
          margin: 0;
        }

        h2 {
          font-weight: 700;
          font-size: 24px;
        }

        h4 {
          font-weight: 500;
          font-size: 16px;
        }
        :root {
          --seek-bar-height: 5px;
          --cursor-width: 12px;
          --priority-pink-color: #e2495d;
          --secondary-blue-color: #1d72af;
          --hoverd-secondary-blue: #1b7bc0;
          --active-secondary-blue: #2289d3;
        }
        @media (prefers-color-scheme: dark) {
          html,
          body {
            background-color: #1e2026;
            color: white;
          }
        }
      `}</style>
    </>
  )
}
