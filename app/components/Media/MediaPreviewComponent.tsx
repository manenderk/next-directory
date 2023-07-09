import { FileType } from "@/globals/FileTypes";
import { Media } from "@prisma/client";
import Image from "next/image";

const MediaPreviewComponent = ({
  media,
  height,
  width,
}: {
  media: Media;
  height?: number;
  width?: number;
}) => {
  if (media.fileType === FileType.Image) {
    return (
      <Image
        src={media.url}
        alt={media.fileName}
        className="img-fluid"
        width={width ?? 600}
        height={height ?? 600}
      />
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
