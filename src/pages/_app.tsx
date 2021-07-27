import { AppProps } from "next/app"
import { RecoilRoot } from "recoil"
import Auth from "~/components/auth"

export default function App({ Component, pageProps }: AppProps) {
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
      `}</style>
    </>
  )
}
