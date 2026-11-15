import Link from "next/link";
import Image from "next/image";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { getPublishedCourses } from "@/lib/training-data";
import { PROGRAMME_INTROS, DEFAULT_START_DATE } from "@/lib/training";
import { CourseCard } from "@/components/training/CourseCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ISEP Certified Training Courses",
  description:
    "ISEP certified Net Zero and Environmental Sustainability Skills courses in Qatar, delivered by Clean Globe Consultancy. Commencing December 2026.",
};

export default async function TrainingPage() {
  const courses = await getPublishedCourses();
  const programmes = Array.from(new Set(courses.map((c) => c.programme)));

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white border-b-8 border-lime">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-lime/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24 grid gap-10 lg:grid-cols-[1fr_auto] items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#BDD631]">
              ISEP Certified Training Partner
            </p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
              Training &amp; Certified Courses
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/85 leading-relaxed">
              Clean Globe Consultancy is proud to be an ISEP course provider, offering professional training
              programmes that help individuals and organisations develop the knowledge and skills to drive meaningful
              environmental change.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-[#BDD631] px-5 py-2 text-sm font-bold uppercase tracking-wide text-navy">
                {DEFAULT_START_DATE}
              </span>
              <Link
                href="/contact?course=ISEP%20certified%20courses"
                className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold hover:bg-white hover:text-navy transition"
              >
                Enquire now
              </Link>
            </div>
          </div>
          <Image
            src="/isep-logo.png"
            alt="ISEP — Institute of Sustainability & Environmental Professionals"
            width={395}
            height={175}
            className="w-64 lg:w-80 h-auto"
            priority
          />
        </div>
      </section>

      {/* Programmes */}
      {courses.length === 0 ? (
        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-lg text-gray-600">Course details are coming soon. Please contact us for more information.</p>
          <Link href="/contact" className="mt-6 inline-block font-semibold text-lime">Contact us →</Link>
        </section>
      ) : (
        programmes.map((programme, i) => {
          const intro = PROGRAMME_INTROS[programme];
          const list = courses.filter((c) => c.programme === programme);
          return (
            <section key={programme} className={i % 2 === 0 ? "bg-cream" : "bg-white"}>
              <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime">
                      {intro?.eyebrow ?? programme}
                    </p>
                    <h2 className="mt-3 font-serif text-3xl font-bold text-forest sm:text-4xl">
                      {intro?.title ?? programme}
                    </h2>
                    {intro?.intro && <p className="mt-4 text-lg text-gray-600 leading-relaxed">{intro.intro}</p>}
                  </div>
                  {intro?.brochure && (
                    <a
                      href={intro.brochure}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-forest/20 px-5 py-2.5 text-sm font-semibold text-forest hover:border-lime hover:text-lime transition"
                    >
                      <ArrowDownTrayIcon className="h-4 w-4" />
                      Download brochure (PDF)
                    </a>
                  )}
                </div>
                <div className="mt-10 grid gap-8 md:grid-cols-2">
                  {list.map((c) => (
                    <CourseCard key={c.id} course={c} />
                  ))}
                </div>
              </div>
            </section>
          );
        })
      )}

      {/* CTA */}
      <section className="bg-olive">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center text-white">
          <h2 className="font-serif text-3xl font-bold">Training your team or your whole organisation?</h2>
          <p className="mt-4 text-white/85">
            Fees and group bookings on request. Tell us which course you’re interested in and we’ll get back to you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?course=ISEP%20certified%20courses"
              className="rounded-md bg-[#BDD631] px-8 py-3 font-bold uppercase tracking-wide text-navy hover:brightness-105"
            >
              Enquire now
            </Link>
            <a
              href="https://wa.me/97466006495"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-white/50 px-8 py-3 font-semibold hover:bg-white hover:text-olive transition"
            >
              WhatsApp +974 6600 6495
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
