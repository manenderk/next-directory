import { NextResponse } from "next/server";

export const NextErrorResponse = (error: any) => {
  return NextResponse.json({ error: error.message }, { status: 500 });
}