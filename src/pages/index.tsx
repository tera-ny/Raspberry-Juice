import { NextPage, GetStaticProps } from "next"
import Template from "~/templates/home"
import { withAuthUser, AuthAction } from "next-firebase-auth"

export const getStaticProps: GetStaticProps<{}> = async () => {
  return { props: {} }
}

const Page: NextPage<{}> = () => {
  return (
    <>
      <main>
        <Template />
      </main>
    </>
  )
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
})(Page)
