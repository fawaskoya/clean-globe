import Link from "next/link";
import { ClockIcon, CalendarDaysIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import type { TrainingCoursePublic } from "@/lib/training";
import { DEFAULT_START_DATE } from "@/lib/training";

export function CourseCard({ course }: { course: TrainingCoursePublic }) {
  return (
    <Link
      href={`/training/${course.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition hover:-translate-y-1 hover:border-lime/50 hover:shadow-xl"
    >
      {course.level && (
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-lime">{course.level}</p>
      )}
      <h3 className="mt-3 text-2xl font-bold text-forest">{course.title}</h3>
      <p className="mt-3 text-gray-600 leading-relaxed">{course.summary}</p>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
        {course.duration && (
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4 text-lime" /> {course.duration}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <CalendarDaysIcon className="h-4 w-4 text-lime" /> {course.startDate || DEFAULT_START_DATE}
        </span>
      </div>

      {course.topics.length > 0 && (
        <ul className="mt-5 space-y-1.5 text-sm text-gray-700">
          {course.topics.slice(0, 4).map((t) => (
            <li key={t} className="flex gap-2">
              <span className="text-lime">✓</span>
              {t}
            </li>
          ))}
          {course.topics.length > 4 && <li className="text-gray-400">+ {course.topics.length - 4} more</li>}
        </ul>
      )}

      <span className="mt-auto pt-6 inline-flex items-center gap-2 font-semibold text-forest group-hover:text-lime">
        View course details
        <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
