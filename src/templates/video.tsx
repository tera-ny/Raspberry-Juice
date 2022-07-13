import { FC } from "react";
import { SerializableVideo } from "~/modules/entity";
import dynamic from "next/dynamic";
import dayjs from "dayjs";

interface Props {
  video: SerializableVideo | null;
}

const DynamicPlayer = dynamic(import("~/components/player"), {
  loading: () => <video></video>,
});

const Index: FC<Props> = ({ video }) => {
  return (
    <>
      {video && (
        <div className={"container"}>
          <div className={"playerContainer"}>
            <DynamicPlayer
              src={video.url ?? undefined}
              poster={video.poster ?? undefined}
            />
          </div>
          <div>
            <h2 className="title">{video.title}</h2>
            <p>{dayjs(video.createdAtMillis).format("YYYY/MM/DD")}</p>
            <p>{video.description}</p>
          </div>
          <div>
            <div>
              <img src="" alt="" />
              <p></p>
            </div>
            <p></p>
          </div>
        </div>
      )}
      <style jsx>
        {`
        .container {
          margin: 0 auto;
          padding: 40px 20px 0;
          max-width: 900px;
          display: grid;
          gap: 20px;
          grid-template-columns: 1fr;
        }
        .title {
          font-size: 20px;
          font-weight: medium;
          padding-top: 20px;
        }
        p {
          white-space: pre-wrap;
        }
        @media screen and (max-width: 899px) {
          .container {
            padding: 12px 20px 0;
          }
          .title {
            font-size: 16px;
          }
        }
      `}
      </style>
    </>
  );
};

export default Index;
