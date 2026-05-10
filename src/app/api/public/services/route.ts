import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const services = await db.service.findMany({
      where: { published: true },
      select: { name: true },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(services.map((s) => s.name));
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
