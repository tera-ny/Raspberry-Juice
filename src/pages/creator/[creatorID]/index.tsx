import { NextPage, GetServerSideProps } from "next"
import Template from "~/templates/creator"
import { withAuthUser } from "next-firebase-auth"
import Header from "~/components/header"
import fetchContents from "~/modules/api/videos"
import fetchProfile from "~/modules/api/creators/id"
import { Props } from "~/templates/creator"
import { UnPromisify } from "~/modules/utils/type"

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  try {
    if (typeof query.creatorID !== "string") return { notFound: true }
    const { profile }: UnPromisify<ReturnType<typeof fetchProfile>> =
      await fetchProfile(query.creatorID)
    const { contents }: UnPromisify<ReturnType<typeof fetchContents>> =
      await fetchContents(query.creatorID)
    const targetID = typeof query.id === "string" ? query.id : null
    return {
      props: {
        modal: query.m === "true",
        edit: targetID,
        profile,
        contents,
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

export default withAuthUser()(Page)
