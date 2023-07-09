import { NextErrorResponse } from "@/globals/ApiFunctions"
import { PRISMA } from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export const GET = async() => {
  try {
    const data = await PRISMA.homeSlider.findMany({
      orderBy: {
        order: 'asc'
      }
    })
    return NextResponse.json(data);
  } catch (error: any) {
    return NextErrorResponse(error)
  }
}

export const POST = async(req: NextRequest) => {
  try {
    const data = await req.body;
    console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    return NextErrorResponse(error);
  }

}