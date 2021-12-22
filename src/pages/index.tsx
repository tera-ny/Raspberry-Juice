import { NextPage, GetServerSideProps } from "next"
import Template from "~/templates/home"
import Header from "~/components/header"
import fetchContents from "~/modules/api/videos"

import { Props } from "~/templates/home"
import { verifyAuthCookie } from "~/modules/auth/login"

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  query,
}) => {
  try {
    const decoded = await verifyAuthCookie(req)
    const response = await fetchContents(decoded.uid)
    const targetID = typeof query.id === "string" ? query.id : null
    return {
      props: {
        modal: query.m === "true",
        edit: targetID,
        contents: response.contents,
      },
    }
  } catch (error) {
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

export default Page
