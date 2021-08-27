import { NextPage, GetStaticProps } from "next"
import Template from "~/templates/home"
import { withAuthUser, AuthAction } from "next-firebase-auth"
import Header from "~/components/header"

export const getStaticProps: GetStaticProps<{}> = async () => {
  return { props: {} }
}

const Page: NextPage<{}> = () => {
  return (
    <>
      <Header />
      <main>
        <Template />
      </main>
    </>
  )
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
})(Page)
