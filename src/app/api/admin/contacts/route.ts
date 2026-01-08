import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const session = await auth();
  
  if (!session || ((session.user as any)?.role !== "ADMIN" && (session.user as any)?.role !== "EDITOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const read = searchParams.get("read");
    const processed = searchParams.get("processed");

    const where: any = {};
    if (read !== null) where.read = read === "true";
    if (processed !== null) where.processed = processed === "true";

    const contacts = await db.contactSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

