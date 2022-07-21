import { GetServerSideProps, NextPage } from "next";
import Template from "~/templates/creator";
import Header from "~/components/header";
import fetchContents from "~/modules/api/videos";
import { Props } from "~/templates/creator";
import { App, getDocumentData } from "@rasp/firestore-rest";

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  try {
    if (typeof query.id !== "string") {
      return {
        notFound: true,
      };
    } else {
      const targetID = query.id;
      const app = new App(process.env.PROJECT_ID!);
      const creator = await getDocumentData(app, `/creators/${targetID}`);
      console.log(creator);
      const response = await fetchContents(targetID);
      return {
        props: {
          contents: response.contents,
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

const Page: NextPage<Props> = (props) => {
  return (
    <>
      <Header />
      <main>
        <Template {...props} />
      </main>
    </>
  );
};

export default Page;
