import { GetServerSideProps, NextPage } from "next"
import Template from "~/templates/signin"
import { generateAndSetToken, verifyAuthCookie } from "~/modules/auth/login"
import { Cookies } from "~/modules/utils"

interface Props {
  csrfToken: string
}

const Page: NextPage<Props> = (props) => {
  return (
    <>
      <main>
        <Template {...props} />
      </main>
      <style jsx>
        {`
          main {
            display: flex;
            align-items: flex-start;
          }
          @media screen and (min-width: 450px) {
            main {
              align-items: center;
              justify-content: center;
              min-height: 100vh;
            }
          }
        `}
      </style>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  try {
    await verifyAuthCookie(context.req)
    return { redirect: { statusCode: 302, destination: "/" } }
  } catch (error) {
    const cookies = new Cookies(context.res)
    const csrfToken = generateAndSetToken(cookies)
    return { props: { csrfToken } }
  }
}

export default Page
