import { requireAuth } from "@/lib/auth-server";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { parseCourses } from "@/lib/course-banner";

export const dynamic = "force-dynamic";

export default async function CoursesAdminPage() {
  await requireAuth();
  const banners = await db.courseBanner.findMany({ orderBy: { displayOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-forest font-serif">Course Banners</h1>
          <p className="text-gray-600 mt-2">
            Training / certified-course promotions shown on the home page. Enquiries arrive under Contact Enquiries.
          </p>
        </div>
        <Link href="/admin/courses/new">
          <Button className="bg-lime hover:bg-lime/90 text-forest">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Banner
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-md border border-gray-100/50 overflow-hidden">
        {banners.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 mb-4">No course banners yet.</p>
            <Link href="/admin/courses/new">
              <Button variant="outline">Add First Banner</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Banner", "Courses", "Order", "Status", "Actions"].map((h, i) => (
                    <th key={h} className={`px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider ${i === 4 ? "text-right" : "text-left"}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {banners.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{b.headline}</div>
                      <div className="text-sm text-gray-500">{[b.providerName, b.badgeNote].filter(Boolean).join(" · ")}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{parseCourses(b.courses).length}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{b.displayOrder}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {b.published ? (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Published</span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Draft</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/courses/${b.id}`}>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
