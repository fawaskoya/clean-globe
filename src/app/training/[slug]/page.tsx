import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  CalendarDaysIcon,
  ClockIcon,
  AcademicCapIcon,
  ClipboardDocumentCheckIcon,
  CurrencyDollarIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { db } from "@/lib/db";
import { toPublic, DEFAULT_START_DATE, FEE_FALLBACK } from "@/lib/training";
import { getPublishedCourses } from "@/lib/training-data";

export const dynamic = "force-dynamic";

async function getCourse(slug: string) {
  try {
    const row = await db.trainingCourse.findUnique({ where: { slug } });
    return row && row.published ? toPublic(row) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getCourse(slug);
  if (!c) return { title: "Course not found" };
  return { title: `${c.title} — ISEP Certified Course`, description: c.summary };
}

export default async function TrainingCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();

  const others = (await getPublishedCourses()).filter((c) => c.slug !== course.slug);
  const enquire = `/contact?course=${encodeURIComponent(course.title)}`;

  const facts = [
    { icon: ClockIcon, label: "Duration", value: course.duration },
    { icon: CalendarDaysIcon, label: "Start", value: course.startDate || DEFAULT_START_DATE },
    { icon: ClipboardDocumentCheckIcon, label: "Assessment", value: course.assessment },
    { icon: KeyIcon, label: "Entry requirements", value: course.entryRequirements },
    { icon: AcademicCapIcon, label: "Certification", value: course.certification },
    { icon: CurrencyDollarIcon, label: "Course fee", value: course.fee || FEE_FALLBACK },
  ].filter((f) => f.value);

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white border-b-8 border-lime">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-lime/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-14 lg:py-20">
          <Link href="/training" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#BDD631]">
            <ArrowLeftIcon className="h-4 w-4" /> All training courses
          </Link>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_auto] items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#BDD631]">
                {course.programme}
                {course.level ? ` · ${course.level}` : ""}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">{course.title}</h1>
              <p className="mt-6 max-w-2xl text-lg text-white/85 leading-relaxed">{course.summary}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={enquire}
                  className="rounded-md bg-[#BDD631] px-8 py-3 font-bold uppercase tracking-wide text-navy hover:brightness-105"
                >
                  Enquire / Enroll
                </Link>
                {course.brochureUrl && (
                  <a
                    href={course.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 font-semibold hover:bg-white hover:text-navy transition"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5" /> Download brochure
                  </a>
                )}
              </div>
            </div>
            <Image src="/isep-logo.png" alt="ISEP" width={395} height={175} className="hidden lg:block w-72 h-auto" />
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 -mt-8 relative">
        <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-lg border border-gray-100 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label} className="flex gap-3 p-2">
              <f.icon className="h-6 w-6 shrink-0 text-lime" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{f.label}</p>
                <p className="mt-0.5 font-semibold text-forest">{f.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {course.topics.length > 0 && (
            <>
              <h2 className="font-serif text-2xl font-bold text-forest">What you’ll learn</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {course.topics.map((t) => (
                  <li key={t} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime font-bold">✓</span>
                    <span className="text-gray-800">{t}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {course.note && (
            <div className="mt-8 rounded-2xl border-l-4 border-lime bg-lime/10 p-5 text-forest">
              <span className="font-semibold">→ </span>
              {course.note}
            </div>
          )}
        </div>

        <aside className="space-y-6">
          {course.audience.length > 0 && (
            <div className="rounded-3xl bg-white p-6 shadow-md border border-gray-100">
              <h2 className="text-lg font-bold text-forest">Who should attend?</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {course.audience.map((a) => (
                  <li key={a} className="rounded-full bg-cream px-3 py-1.5 text-sm text-forest border border-lime/30">{a}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-3xl bg-olive p-6 text-white">
            <h2 className="text-lg font-bold">Interested in this course?</h2>
            <p className="mt-2 text-sm text-white/85">
              {course.fee ? `Course fee: ${course.fee}.` : "Contact us for fees and group bookings."}
            </p>
            <Link href={enquire} className="mt-5 block rounded-md bg-[#BDD631] px-5 py-3 text-center font-bold text-navy hover:brightness-105">
              Enquire now
            </Link>
            <p className="mt-4 text-sm text-white/80">
              +974 6600 6495 · operations@thecleanglobe.com
            </p>
          </div>
        </aside>
      </section>

      {/* Other courses */}
      {others.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14">
            <h2 className="font-serif text-2xl font-bold text-forest">Other courses</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((c) => (
                <Link
                  key={c.slug}
                  href={`/training/${c.slug}`}
                  className="rounded-2xl border border-gray-100 p-5 hover:border-lime hover:shadow-md transition"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-lime">{c.level}</p>
                  <p className="mt-2 font-bold text-forest">{c.title}</p>
                  {c.duration && <p className="mt-1 text-sm text-gray-500">{c.duration}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
