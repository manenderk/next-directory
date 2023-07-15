import { FileType } from "@/globals/FileTypes";
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";

export const UploadFile = async (file: File, path: string) => {
  const fileContents = await file.arrayBuffer();
  const splittedName = file.name.split(".");
  const fileExt = splittedName.pop();
  const fileName = splittedName.join(".") + "-" + Date.now() + "." + fileExt;
  const filePath = path.endsWith("/") ? path + fileName : path + "/" + fileName;
  if (!existsSync(path)) {
    await mkdir(path, { recursive: true });
  }
  await writeFile(filePath, Buffer.from(fileContents));
  return fileName;
};

export const GetFileType = (fileName: string) => {
  const ext = fileName.split(".").pop()!;
  let fileType = FileType.File;
  if (["png", "jpg", "jpeg", "gif"].includes(ext)) {
    fileType = FileType.Image;
  } else if (["mp4", "webm", "ogg"].includes(ext)) {
    fileType = FileType.Video;
  } else if (["mp3", "wav", "ogg"].includes(ext)) {
    fileType = FileType.Audio;
  }
  return fileType;
};
