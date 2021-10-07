import { AppProps } from "next/app"
import { RecoilRoot } from "recoil"
import Auth from "~/components/auth"
import NextHead from "next/head"
import initAuth from "~/modules/nextauth"

initAuth()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <NextHead>
          <meta
            name="msapplication-square70x70logo"
            content="/site-tile-70x70.png"
          />
          <meta
            name="msapplication-square150x150logo"
            content="/site-tile-150x150.png"
          />
          <meta
            name="msapplication-wide310x150logo"
            content="/site-tile-310x150.png"
          />
          <meta
            name="msapplication-square310x310logo"
            content="/site-tile-310x310.png"
          />
          <meta name="msapplication-TileColor" content="#0078d7" />
          <link
            rel="shortcut icon"
            type="image/vnd.microsoft.icon"
            href="/favicon.ico"
          />
          <link
            rel="icon"
            type="image/vnd.microsoft.icon"
            href="/favicon.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/apple-touch-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/apple-touch-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-touch-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-touch-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-touch-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-touch-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-touch-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-touch-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="36x36"
            href="/android-chrome-36x36.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="48x48"
            href="/android-chrome-48x48.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="72x72"
            href="/android-chrome-72x72.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/android-chrome-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="128x128"
            href="/android-chrome-128x128.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="144x144"
            href="/android-chrome-144x144.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="152x152"
            href="/android-chrome-152x152.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="256x256"
            href="/android-chrome-256x256.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="384x384"
            href="/android-chrome-384x384.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/android-chrome-512x512.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="36x36"
            href="/icon-36x36.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="48x48"
            href="/icon-48x48.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="72x72"
            href="/icon-72x72.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/icon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="128x128"
            href="/icon-128x128.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="144x144"
            href="/icon-144x144.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="152x152"
            href="/icon-152x152.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="160x160"
            href="/icon-160x160.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="196x196"
            href="/icon-196x196.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="256x256"
            href="/icon-256x256.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="384x384"
            href="/icon-384x384.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/icon-512x512.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="24x24"
            href="/icon-24x24.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icon-32x32.png"
          />
          <link rel="manifest" href="/manifest.json" />
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
