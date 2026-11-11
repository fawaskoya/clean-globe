import Link from "next/link";
import { CourseBannerForm, EMPTY_COURSE_BANNER } from "@/components/admin/CourseBannerForm";

export default function NewCourseBannerPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/courses" className="text-lime hover:text-forest mb-4 inline-block">← Back to Course Banners</Link>
        <h1 className="text-3xl font-bold text-forest font-serif">Add Course Banner</h1>
      </div>
      <CourseBannerForm initial={EMPTY_COURSE_BANNER} />
    </div>
  );
}
