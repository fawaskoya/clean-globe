import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth-server";
import { db } from "@/lib/db";
import { parseCourses } from "@/lib/course-banner";
import { CourseBannerForm } from "@/components/admin/CourseBannerForm";

export const dynamic = "force-dynamic";

export default async function EditCourseBannerPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth();
  const { id } = await params;
  const b = await db.courseBanner.findUnique({ where: { id } });
  if (!b) notFound();

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/courses" className="text-lime hover:text-forest mb-4 inline-block">← Back to Course Banners</Link>
        <h1 className="text-3xl font-bold text-forest font-serif">Edit Course Banner</h1>
      </div>
      <CourseBannerForm
        id={b.id}
        initial={{
          providerName: b.providerName ?? "",
          providerTagline: b.providerTagline ?? "",
          logoUrl: b.logoUrl ?? "",
          badge: b.badge ?? "",
          badgeNote: b.badgeNote ?? "",
          headline: b.headline,
          subheadline: b.subheadline ?? "",
          description: b.description ?? "",
          coursesIntro: b.coursesIntro ?? "",
          coursesText: parseCourses(b.courses).join("\n"),
          footerText: b.footerText ?? "",
          ctaLabel: b.ctaLabel,
          ctaHref: b.ctaHref ?? "",
          displayOrder: b.displayOrder,
          published: b.published,
        }}
      />
    </div>
  );
}
