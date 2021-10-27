import { NextPage, GetServerSideProps } from "next"
import Template from "~/templates/editprofile"
import Header from "~/components/header"
import { resetServerContext } from "react-beautiful-dnd"

export const getServerSideProps: GetServerSideProps = async () => {
  resetServerContext()

  return { props: {} }
}

const Page: NextPage = () => {
  return (
    <>
      <Header />
      <main>
        <Template />
      </main>
    </>
  )
}

export default Page
