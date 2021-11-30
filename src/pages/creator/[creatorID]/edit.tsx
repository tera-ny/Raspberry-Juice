import { NextPage, GetServerSidePropsResult } from "next"
import Template from "~/templates/editprofile"
import Header from "~/components/header"
import { resetServerContext } from "react-beautiful-dnd"
import { withAuthUserTokenSSR, AuthAction } from "next-firebase-auth"

interface Props {
  id: string
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, query }): Promise<GetServerSidePropsResult<Props>> => {
  if (AuthUser.id !== query.creatorID) return { notFound: true }
  resetServerContext()
  return { props: { id: query.creatorID } }
})

const Page: NextPage<Props> = ({ id }) => {
  return (
    <>
      <Header />
      <main>
        <Template id={id} />
      </main>
    </>
  )
}

export default Page
