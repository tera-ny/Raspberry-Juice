import { AppProps } from "next/app"
import { RecoilRoot } from "recoil"
import Auth from "~/components/auth"
import NextHead from "next/head"
import initAuth from "~/modules/nextauth"
import ModalProvider from "~/components/modal"

initAuth()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <NextHead>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500&family=Roboto:wght@300;400;500&display=swap"
            rel="stylesheet"></link>
        </NextHead>
        <Auth>
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
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
