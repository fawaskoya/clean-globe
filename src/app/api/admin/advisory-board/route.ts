import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { z } from "zod";

const memberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  image: z.string().optional(),
  displayOrder: z.number().default(0),
  published: z.boolean().default(true),
});

export async function GET() {
  const session = await auth();
  if (!session || ((session.user as any)?.role !== "ADMIN" && (session.user as any)?.role !== "EDITOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const members = await db.advisoryBoardMember.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json(members);
  } catch (error) {
    logger.error("Failed to fetch advisory board members", { error: String(error) });
    return NextResponse.json({ error: "Failed to fetch advisory board members" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session || ((session.user as any)?.role !== "ADMIN" && (session.user as any)?.role !== "EDITOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = memberSchema.parse(body);
    const member = await db.advisoryBoardMember.create({ data });
    logger.info("Advisory board member created", { id: member.id, name: member.name });
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    logger.error("Failed to create advisory board member", { error: String(error) });
    return NextResponse.json({ error: "Failed to create advisory board member" }, { status: 500 });
  }
}
