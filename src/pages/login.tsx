import { NextPage } from "next"
import Template from "~/templates/signin"
import {
  withAuthUserTokenSSR,
  withAuthUser,
  AuthAction,
} from "next-firebase-auth"

const Page: NextPage<{}> = () => {
  return (
    <>
      <main>
        <Template />
      </main>
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})()

export default withAuthUser()(Page)
