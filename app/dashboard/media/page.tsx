import AddMediaComponent from "@/app/components/Media/AddMediaComponent";
import { PRISMA } from "@/libs/prisma";
import Image from "next/image";

const MediaPage = async () => {
  const medias = await PRISMA.media?.findMany() || [];

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
            <div className="col-md-3" key={media.id}>
              <Image src={media.url} alt={media.fileName} className="img-fluid"/>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
