import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params;

  const shortUrl = await db.shortUrl.findUnique({
    where: {
      shortCode,
    },
  });

  if (!shortUrl) {
    return NextResponse.json(
      { error: "Short URL not found" },
      { status: 404 }
    );
  }

  await db.shortUrl.update({
    where: {
      shortCode,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });

  return NextResponse.redirect(shortUrl.originalUrl);
}