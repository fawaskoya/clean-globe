import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { z } from "zod";
import { courseBannerSchema, emptyToNull, parseCourses } from "@/lib/course-banner";

type Ctx = { params: Promise<{ id: string }> };

async function roleOf() {
  const session = await auth();
  return session ? ((session.user as any)?.role as string | undefined) : undefined;
}

export async function GET(_req: Request, { params }: Ctx) {
  const role = await roleOf();
  if (role !== "ADMIN" && role !== "EDITOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const banner = await db.courseBanner.findUnique({ where: { id } });
    if (!banner) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ...banner, courses: parseCourses(banner.courses) });
  } catch (error) {
    logger.error("Failed to fetch course banner", { error: String(error) });
    return NextResponse.json({ error: "Failed to fetch course banner" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Ctx) {
  const role = await roleOf();
  if (role !== "ADMIN" && role !== "EDITOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const data = courseBannerSchema.parse(await request.json());
    const banner = await db.courseBanner.update({ where: { id }, data: emptyToNull(data) });
    logger.info("Course banner updated", { id: banner.id });
    return NextResponse.json({ ...banner, courses: parseCourses(banner.courses) });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    logger.error("Failed to update course banner", { error: String(error) });
    return NextResponse.json({ error: "Failed to update course banner" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const role = await roleOf();
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    await db.courseBanner.delete({ where: { id } });
    logger.info("Course banner deleted", { id });
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Failed to delete course banner", { error: String(error) });
    return NextResponse.json({ error: "Failed to delete course banner" }, { status: 500 });
  }
}
