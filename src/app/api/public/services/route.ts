import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await db.service.findMany({
      where: { published: true },
      select: { name: true, slug: true },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(services);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
