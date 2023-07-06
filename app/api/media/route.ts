import { FileType } from "@/globals/FileTypes";
import { UploadFile } from "@/libs/file";
import { PRISMA } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

const UPLOAD_DIR = process.cwd() + "/public/uploads";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.formData();
    const file: File = data.get("file") as File;
    const uploadedFileName = await UploadFile(file, UPLOAD_DIR);
    const ext = uploadedFileName.split(".").pop()!;
    let fileType = FileType.File;
    if (["png", "jpg", "jpeg", "gif"].includes(ext)) {
      fileType = FileType.Image;
    } else if (["mp4", "webm", "ogg"].includes(ext)) {
      fileType = FileType.Video;
    } else if (["mp3", "wav", "ogg"].includes(ext)) {
      fileType = FileType.Audio;
    }
    const fileRec = await PRISMA.media.create({
      data: {
        fileName: uploadedFileName,
        fileType: fileType,
        url: "/uploads/" + uploadedFileName,
      },
    });
    return NextResponse.json(fileRec);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
