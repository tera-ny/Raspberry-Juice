import { NextPage } from "next"
import { withAuthUser, AuthAction } from "next-firebase-auth"
import Header from "~/components/header"

import { Props } from "~/templates/creator"

const Page: NextPage<Props> = () => {
  return (
    <>
      <Header />
      <main></main>
    </>
  )
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Page)
