import { NextErrorResponse } from "@/globals/ApiFunctions";
import { GetFileType, UploadFile } from "@/libs/file";
import { PRISMA } from "@/libs/prisma";
import { Media } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const UPLOAD_DIR = process.cwd() + "/public/uploads";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.formData();
    const file: File = data.get("file") as File;
    const uploadedFileName = await UploadFile(file, UPLOAD_DIR);
    const fileType = GetFileType(uploadedFileName);
    const fileRec = await PRISMA.media.create({
      data: {
        fileName: uploadedFileName,
        fileType: fileType,
        url: "/uploads/" + uploadedFileName,
      },
    });
    return NextResponse.json(fileRec);
  } catch (error: any) {
    return NextErrorResponse(error);
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const medias: Media[] = await PRISMA.media.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(medias);
  } catch (error: any) {
    return NextErrorResponse(error);
  }
};
