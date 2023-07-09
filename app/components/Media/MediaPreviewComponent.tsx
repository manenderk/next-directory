import { FileType } from "@/globals/FileTypes";
import { Media } from "@prisma/client";

const MediaPreviewComponent = ({ media }: { media: Media }) => {
  if (media.fileType === FileType.Image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={media.url} alt={media.fileName} className="img-fluid" loading="lazy" />
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{media.fileName}</h5>
      </div>
    </div>
  );
};

export default MediaPreviewComponent;
