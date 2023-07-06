"use client";

import { FileType } from "@/globals/FileTypes";
import { useRef, useState } from "react";

interface FilePreview {
  type: FileType;
  content: string;
}

const FileInputButtonComponent = ({
  className,
  multiple,
  accept,
  onChange,
}: {
  className?: string;
  multiple?: boolean;
  accept?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<FilePreview[]>([]);

  const getImagePreview = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const filePreviews: FilePreview[] = [];
    if (e.target.files && e.target.files.length > 0) {
      for (const file of Array.from(e.target.files)) {
        if (file.type.match(/image.*/)) {
          filePreviews.push({
            type: FileType.Image,
            content: await getImagePreview(file),
          });
        } else {
          filePreviews.push({
            type: FileType.File,
            content: file.name,
          });
        }
      }
    }
    setPreviews(filePreviews);
    onChange(e);
  };

  return (
    <>
      <div className="mb-2">
        <button
          className={className || "btn btn-primary m-0"}
          onClick={() => inputRef?.current?.click()}
        >
          Add File
        </button>
        <input
          className="d-none"
          type="file"
          ref={inputRef}
          multiple={multiple || false}
          accept={accept || "*"}
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      {previews.length > 0 && (
        <div className="row">
          {previews.map((preview, index) => (
            <div className="col-md-2 mb-2" key={index}>
              {preview.type === FileType.Image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview.content}
                  alt="preview"
                  className="img-fluid"
                />
              ) : (
                preview.content
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FileInputButtonComponent;
