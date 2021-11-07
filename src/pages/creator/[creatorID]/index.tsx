import { NextPage, GetServerSideProps } from "next"
import Template from "~/templates/home"
import { withAuthUser, AuthAction } from "next-firebase-auth"
import Header from "~/components/header"
import fetchContents from "~/modules/api/videos"
import fetchProfile from "~/modules/api/creators/id"

import { Props } from "~/templates/home"

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    if (typeof query.creatorID !== "string") return { notFound: true }
    const profiles = await fetchProfile(query.creatorID)
    const response = await fetchContents(query.creatorID)
    const targetID = typeof query.id === "string" ? query.id : null
    return {
      props: {
        modal: query.m === "upload",
        edit: targetID,
        contents: response.contents,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
    }
  }
}

const Page: NextPage<Props> = (props) => {
  return (
    <>
      <Header />
      <main>
        <Template {...props} />
      </main>
    </>
  )
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Page)
