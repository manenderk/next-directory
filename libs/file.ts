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
}