import { NextErrorResponse } from "@/globals/ApiFunctions";
import { PRISMA } from "@/libs/prisma";
import { HomeSlider } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await PRISMA.homeSlider.findMany({
      orderBy: {
        order: "asc",
      },
      include: {
        image: true,
      },
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextErrorResponse(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const reqBody: HomeSlider = await req.json();
    const result = await PRISMA.homeSlider.create({
      data: {
        title: reqBody.title,
        description: reqBody.description,
        imageId: reqBody.imageId,
        link: reqBody.link,
        order: reqBody.order,
        active: reqBody.active,
      },
      include: {
        image: true,
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextErrorResponse(error);
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextErrorResponse("ID is required", 400);
    }
    await PRISMA.homeSlider.delete({
      where: {
        id: id
      }
    });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextErrorResponse(error);
  }
};
