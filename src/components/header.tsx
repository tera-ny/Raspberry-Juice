import { FC } from "react"
import Link from "next/link"

const Header: FC = () => {
  return (
    <>
      <header className="container">
        <Link href={"/"}>
          <a className="link">
            <picture>
              <source
                srcSet="/img/logo_dark.svg"
                media="(prefers-color-scheme: dark)"
              />
              <img
                className="logo"
                height="60"
                width="220"
                src="/img/logo_light.svg"
              />
            </picture>
          </a>
        </Link>
      </header>
      <style jsx>{`
        .container {
          padding: 20px 24px;
        }
        .logo {
          height: 40px;
          width: auto;
        }
        .link {
          display: inline-block;
          height: 40px;
        }
        @media screen and (max-width: 899px) {
          .container {
            padding: 8px 12px;
          }
        }
      `}</style>
    </>
  )
}

export default Header