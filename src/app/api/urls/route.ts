import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authOptions } from "@/server/auth";

export async function GET() {
  try {
    // Check logged-in user
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find user
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

    // Fetch only this user's URLs
    const urls = await db.shortUrl.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(urls);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch URLs" },
      { status: 500 }
    );
  }
}