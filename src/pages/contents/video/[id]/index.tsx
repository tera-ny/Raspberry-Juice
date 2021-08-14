import { NextPage, GetServerSideProps } from "next"
import Template from "~/templates/video"
import Error from "next/error"

interface Props {
  id?: string
  error?: number
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  if (typeof context.query.id === "string") {
    return {
      props: {
        id: context.query.id,
      },
    }
  } else {
    return {
      props: {
        error: 404,
      },
    }
  }
}

const Page: NextPage<Props> = ({ id, error }) => {
  if (!id) {
    return <Error statusCode={error} />
  } else {
    return (
      <>
        <main>
          <Template id={id} />
        </main>
      </>
    )
  }
}

export default Page
