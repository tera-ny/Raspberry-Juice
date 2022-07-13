import { GetServerSideProps, NextPage } from "next";
import Template from "~/templates/video";
import Error from "next/error";
import fetchVideo from "~/modules/api/videos/id";
import { SerializableVideo } from "~/modules/entity";
import dayjs from "dayjs";
import { generateCDNCookies } from "~/modules/storagecookie";
import Header from "~/components/header";
import { verifyAuthCookie } from "~/modules/auth/login";
import { Cookies } from "~/modules/utils";
import { NotFound, NotPublished, Unknown } from "~/modules/api/error";

type Props = { status: "success"; video: SerializableVideo | null } | {
  status: "error";
  error: number;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
  query,
}) => {
  if (typeof query.id === "string") {
    try {
      const response = await fetchVideo(query.id);
      return {
        props: {
          status: "success",
          video: response.content,
        },
      };
    } catch (error) {
      if (error instanceof NotFound) {
        return {
          notFound: true,
        };
      }
      if (error instanceof NotPublished) {
        return {
          props: {
            status: "success",
            video: null,
          },
        };
      }
      if (error instanceof Unknown) {
        console.error(error.message);
      }
      return { props: { status: "error", error: 500 } };
    }
  } else {
    return {
      notFound: true,
    };
  }
};

const Page: NextPage<Props> = (props) => {
  if (props.status == "error") {
    return <Error statusCode={props.error} />;
  } else {
    return (
      <>
        <Header />
        <main>
          <Template video={props.video} />
        </main>
      </>
    );
  }
};

export default Page;
