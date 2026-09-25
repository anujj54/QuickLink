import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    // Delete only if URL belongs to logged-in user
    const deletedUrl = await db.shortUrl.deleteMany({
      where: {
        id: Number(id),
        userId: user.id,
      },
    });

    if (deletedUrl.count === 0) {
      return NextResponse.json(
        { error: "URL not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "URL deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete URL" },
      { status: 500 }
    );
  }
}