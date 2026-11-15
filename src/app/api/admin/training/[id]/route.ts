import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { z } from "zod";
import { trainingCourseSchema, toDbData, toPublic } from "@/lib/training";

type Ctx = { params: Promise<{ id: string }> };

async function role() {
  const s = await auth();
  return s ? ((s.user as any)?.role as string | undefined) : undefined;
}

export async function GET(_req: Request, { params }: Ctx) {
  const r = await role();
  if (r !== "ADMIN" && r !== "EDITOR") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const row = await db.trainingCourse.findUnique({ where: { id } });
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(toPublic(row));
}

export async function PUT(request: Request, { params }: Ctx) {
  const r = await role();
  if (r !== "ADMIN" && r !== "EDITOR") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const data = trainingCourseSchema.parse(await request.json());
    const clash = await db.trainingCourse.findFirst({ where: { slug: data.slug, NOT: { id } } });
    if (clash) return NextResponse.json({ error: "A course with this slug already exists" }, { status: 400 });
    const row = await db.trainingCourse.update({ where: { id }, data: toDbData(data) });
    logger.info("Training course updated", { id: row.id });
    return NextResponse.json(toPublic(row));
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues }, { status: 400 });
    logger.error("Failed to update training course", { error: String(error) });
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if ((await role()) !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    await db.trainingCourse.delete({ where: { id } });
    logger.info("Training course deleted", { id });
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Failed to delete training course", { error: String(error) });
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
