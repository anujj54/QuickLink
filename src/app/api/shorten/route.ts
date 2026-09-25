import { NextResponse } from "next/server";
import { db } from "@/server/db";
import crypto from "crypto";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authOptions } from "@/server/auth";

export async function POST(req: Request) {
  try {
    // Check logged-in user
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find user in database
    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL" },
        { status: 400 }
      );
    }

    const shortCode = crypto.randomBytes(4).toString("hex");

    const shortUrl = await db.shortUrl.create({
      data: {
        originalUrl: url,
        shortCode,
        userId: user.id,
      },
    });

    return NextResponse.json(shortUrl);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}