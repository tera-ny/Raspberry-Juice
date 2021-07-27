import { NextPage, GetStaticProps } from "next"
import Auth from "~/components/auth"
import Template from "~/templates/home"

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

export default Page
