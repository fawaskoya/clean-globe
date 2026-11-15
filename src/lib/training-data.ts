import { db } from "@/lib/db";
import { toPublic, type TrainingCoursePublic } from "@/lib/training";

/** Published courses, ordered; never throws (returns [] if the DB is unavailable). */
export async function getPublishedCourses(): Promise<TrainingCoursePublic[]> {
  try {
    const rows = await db.trainingCourse.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
    });
    return rows.map(toPublic);
  } catch (error) {
    console.error("Error fetching training courses:", error);
    return [];
  }
}

/** Ticker settings; never throws. */
export async function getAnnouncement(): Promise<{ text: string; link: string | null } | null> {
  try {
    const s = await db.siteSettings.findFirst();
    if (!s?.announcementEnabled || !s.announcementText?.trim()) return null;
    return { text: s.announcementText.trim(), link: s.announcementLink?.trim() || null };
  } catch (error) {
    console.error("Error fetching announcement:", error);
    return null;
  }
}
