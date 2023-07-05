import AddMediaComponent from "@/app/dashboard/media/AddMediaComponent";
import { PRISMA } from "@/libs/prisma";
import { Media } from "@prisma/client";
import Image from "next/image";

const MediaPage = async () => {
  const medias: Media[] =
    (await PRISMA.media?.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })) || [];

  return (
    <div className="card shadow-lg mb-5">
      <div className="card-header p-0  mx-3 z-index-2 bg-transparent">
        <div className="bg-gradient-primary shadow-primary border-radius-lg p-3 d-flex align-items-center justify-content-between">
          <h3 className="text-white mb-0">Media</h3>
          <AddMediaComponent />
        </div>
      </div>
      <div className="card-body p-3">
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
      </div>
    </div>
  );
};

export default MediaPage;
