"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const AddMediaComponent = () => {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [progress, setProgress] = useState({
    completed: 0,
    total: 0,
    inProgress: false,
  });

  const doUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setProgress({
      completed: 0,
      total: files.length,
      inProgress: true,
    });
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      const resp = await axios.post("/api/media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProgress({
        inProgress: true,
        total: files.length,
        completed: i + 1,
      });
    }

    setProgress({
      completed: 0,
      total: 0,
      inProgress: false,
    });
    router.refresh();
  };

  return (
    <>
      <button
        disabled={progress.inProgress}
        className="btn btn-light m-0"
        onClick={() => {
          if (ref.current) {
            ref.current.click();
          }
        }}
      >
        {progress.inProgress
          ? `Uploaded ${progress.completed} of ${progress.total}`
          : "Add"}
      </button>
      <input
        type="file"
        name="medias"
        ref={ref}
        className="d-none"
        multiple
        onChange={doUpload}
      />
    </>
  );
};

export default AddMediaComponent;
