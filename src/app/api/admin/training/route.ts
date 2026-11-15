import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { z } from "zod";
import { trainingCourseSchema, toDbData, toPublic } from "@/lib/training";

async function role() {
  const s = await auth();
  return s ? ((s.user as any)?.role as string | undefined) : undefined;
}

export async function GET() {
  const r = await role();
  if (r !== "ADMIN" && r !== "EDITOR") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const rows = await db.trainingCourse.findMany({ orderBy: { displayOrder: "asc" } });
    return NextResponse.json(rows.map(toPublic));
  } catch (error) {
    logger.error("Failed to fetch training courses", { error: String(error) });
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const r = await role();
  if (r !== "ADMIN" && r !== "EDITOR") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = trainingCourseSchema.parse(await request.json());
    if (await db.trainingCourse.findUnique({ where: { slug: data.slug } })) {
      return NextResponse.json({ error: "A course with this slug already exists" }, { status: 400 });
    }
    const row = await db.trainingCourse.create({ data: toDbData(data) });
    logger.info("Training course created", { id: row.id, slug: row.slug });
    return NextResponse.json(toPublic(row), { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues }, { status: 400 });
    logger.error("Failed to create training course", { error: String(error) });
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
