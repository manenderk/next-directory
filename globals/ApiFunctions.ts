import { NextResponse } from "next/server";

export const NextErrorResponse = (error: any, status = 500) => {
  return NextResponse.json({ error: error?.message ?? error }, { status: status });
}