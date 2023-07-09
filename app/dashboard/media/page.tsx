import AddMediaComponent from "@/app/dashboard/media/AddMediaComponent";
import { PRISMA } from "@/libs/prisma";
import { Media } from "@prisma/client";
import Image from "next/image";
import DashboardPageContainer from "../DashboardPageContainer";

const MediaPage = async () => {
  const medias: Media[] =
    (await PRISMA.media?.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })) || [];

  return (
    <DashboardPageContainer
      title="Media"
      headerActions={[<AddMediaComponent key={1} />]}
    >
      <div className="row">
        <div className="col-md-12">
          <div className="input-group input-group-dynamic mb-4">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" />
          </div>
        </div>
      </div>
      <div className="row">
        {medias.map((media) => (
          <div className="col-md-2 mb-4" key={media.id}>
            {media.fileType === "image" && (
              <Image
                src={media.url}
                alt={media.fileName}
                className="img-fluid"
                width={800}
                height={800}
              />
            )}
          </div>
        ))}
      </div>
    </DashboardPageContainer>
  );
};

export default MediaPage;
