import { AlertType, ShowAlert } from "@/globals/Alerts/Alert";
import { ApiRoutes } from "@/globals/ApiRoutes";
import { FileType } from "@/globals/FileTypes";
import { Modal } from "@mantine/core";
import { Media } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

const MediaPickerComponent = ({
  type,
  onMediaSelected,
}: {
  type?: FileType;
  onMediaSelected: (media: Media) => void;
}) => {
  const [medias, setMedias] = useState<Media[]>([]);
  const [isMediaPickerOpened, setIsMediaPickerOpened] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const getMedias = async () => {
    try {
      const resp = await axios.get(ApiRoutes.GetMedias);
      setMedias(resp.data);
    } catch (error) {
      console.error(error);
      ShowAlert("Unable to get medias", AlertType.Error);
    }
  };

  const getFilteredMedias = () => {
    let filteredMedias: Media[] = [];
    if (type) {
      filteredMedias = medias.filter((media) => media.fileType === type);
    }
    if (searchText) {
      filteredMedias = filteredMedias.filter((media) =>
        media.fileName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return filteredMedias;
  };

  useEffect(() => {
    getMedias();
  });

  return (
    <div>
      <div>
        <button
          className="btn btn-primary m-0"
          onClick={() => setIsMediaPickerOpened(true)}
        >
          Add Media
        </button>
      </div>


      <Modal
        opened={isMediaPickerOpened}
        onClose={() => setIsMediaPickerOpened(false)}
        title="Select Media"
        size="xl"
      >
        <div className="input-group input-group-dynamic mb-4">
          <label className="form-label">Search</label>
          <input
            type="text"
            className="form-control"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="row">
          {getFilteredMedias().map((media) => (
            <div className="col-md-3" key={media.id}>
              
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default MediaPickerComponent;
