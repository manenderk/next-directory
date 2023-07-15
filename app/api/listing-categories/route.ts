import { NextErrorResponse } from "@/globals/ApiFunctions";
import { PRISMA } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

const getSlug = async(title: string) => {
  const slug = title.toLowerCase().replace(/ /g, "-");
  const count = await PRISMA.listingCategory.count({
    where: {
      slug: slug
    }
  });
  if (count > 0) {
    return `${slug}-${count}`;
  }
  return slug;
}

export const GET = async () => {
  try {
    const data = await PRISMA.listingCategory.findMany({
      orderBy: {
        order: "asc",
      },
      include: {
        thumbnail: true,
      },
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextErrorResponse(error);
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const result = await PRISMA.listingCategory.create({
      data: {
        title: reqBody.title,
        slug: await getSlug(reqBody.title),
        thumbnailId: reqBody.thumbnailId,
        order: reqBody.order,
        active: reqBody.active,
      },
      include: {
        thumbnail: true,
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextErrorResponse(error);
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextErrorResponse("ID is required", 400);
    }
    await PRISMA.listingCategory.delete({
      where: {
        id: id
      }
    });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextErrorResponse(error);
  }
}