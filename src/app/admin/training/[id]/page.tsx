import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth-server";
import { db } from "@/lib/db";
import { parseList } from "@/lib/training";
import { TrainingCourseForm } from "@/components/admin/TrainingCourseForm";

export const dynamic = "force-dynamic";

export default async function EditTrainingCoursePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth();
  const { id } = await params;
  const c = await db.trainingCourse.findUnique({ where: { id } });
  if (!c) notFound();

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/training" className="text-lime hover:text-forest mb-4 inline-block">← Back to Training Courses</Link>
        <h1 className="text-3xl font-bold text-forest font-serif">Edit Course</h1>
      </div>
      <TrainingCourseForm
        id={c.id}
        initial={{
          slug: c.slug,
          title: c.title,
          programme: c.programme,
          level: c.level ?? "",
          summary: c.summary,
          duration: c.duration ?? "",
          startDate: c.startDate ?? "",
          fee: c.fee ?? "",
          topicsText: parseList(c.topics).join("\n"),
          audienceText: parseList(c.audience).join("\n"),
          assessment: c.assessment ?? "",
          entryRequirements: c.entryRequirements ?? "",
          certification: c.certification ?? "",
          note: c.note ?? "",
          brochureUrl: c.brochureUrl ?? "",
          displayOrder: c.displayOrder,
          published: c.published,
        }}
      />
    </div>
  );
}
