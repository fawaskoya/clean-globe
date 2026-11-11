import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { z } from "zod";
import { courseBannerSchema, emptyToNull, parseCourses } from "@/lib/course-banner";

async function authorised() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  return !!session && (role === "ADMIN" || role === "EDITOR");
}

export async function GET() {
  if (!(await authorised())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const banners = await db.courseBanner.findMany({ orderBy: { displayOrder: "asc" } });
    return NextResponse.json(banners.map((b) => ({ ...b, courses: parseCourses(b.courses) })));
  } catch (error) {
    logger.error("Failed to fetch course banners", { error: String(error) });
    return NextResponse.json({ error: "Failed to fetch course banners" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await authorised())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = courseBannerSchema.parse(await request.json());
    const banner = await db.courseBanner.create({ data: emptyToNull(data) });
    logger.info("Course banner created", { id: banner.id, headline: banner.headline });
    return NextResponse.json({ ...banner, courses: parseCourses(banner.courses) }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    logger.error("Failed to create course banner", { error: String(error) });
    return NextResponse.json({ error: "Failed to create course banner" }, { status: 500 });
  }
}
