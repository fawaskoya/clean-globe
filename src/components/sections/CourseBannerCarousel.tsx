"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { CourseBannerPublic } from "@/lib/course-banner";

const AUTOPLAY_MS = 9000;

function enquiryHref(course: string) {
  return `/contact?course=${encodeURIComponent(course)}`;
}

export function CourseBannerCarousel({ banners }: { banners: CourseBannerPublic[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = banners.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [count, paused]);

  if (count === 0) return null;

  const banner = banners[Math.min(index, count - 1)];
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);
  const defaultCta = enquiryHref(
    banner.providerName ? `${banner.providerName} certified courses` : banner.headline
  );

  return (
    <section
      aria-label="Training and certified courses"
      className="relative bg-navy text-white border-t-8 border-lime overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* subtle decoration */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-lime/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-lime/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={banner.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
            className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 items-center lg:px-12"
          >
            {/* Left: provider + badge + CTA */}
            <div className="flex flex-col items-start gap-6">
              {banner.logoUrl ? (
                <Image
                  src={banner.logoUrl}
                  alt={banner.providerName ?? "Course provider"}
                  width={360}
                  height={140}
                  unoptimized
                  className="h-auto w-64 max-w-full object-contain"
                />
              ) : banner.providerName ? (
                <div>
                  <p className="text-5xl font-bold tracking-tight">{banner.providerName}</p>
                  {banner.providerTagline && (
                    <p className="mt-1 text-sm text-white/80">{banner.providerTagline}</p>
                  )}
                </div>
              ) : null}

              {(banner.badge || banner.badgeNote) && (
                <div>
                  {banner.badge && (
                    <p className="text-2xl font-bold uppercase tracking-wide">{banner.badge}</p>
                  )}
                  {banner.badgeNote && (
                    <p className="mt-1 text-lg text-white/90">{banner.badgeNote}</p>
                  )}
                </div>
              )}

              <Link
                href={banner.ctaHref || defaultCta}
                className="inline-flex items-center rounded-md bg-[#BDD631] px-8 py-3 text-xl font-extrabold uppercase tracking-wide text-navy shadow-lg transition hover:brightness-105 hover:-translate-y-0.5"
              >
                {banner.ctaLabel}
              </Link>
            </div>

            {/* Right: message */}
            <div>
              <h2 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">
                {banner.headline}
                {banner.subheadline && (
                  <>
                    <br />
                    <span className="text-white">{banner.subheadline}</span>
                  </>
                )}
              </h2>

              {banner.description && (
                <p className="mt-6 text-lg leading-relaxed text-[#BDD631]">{banner.description}</p>
              )}

              {banner.courses.length > 0 && (
                <div className="mt-6">
                  {banner.coursesIntro && (
                    <p className="font-semibold">{banner.coursesIntro}</p>
                  )}
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {banner.courses.map((course) => (
                      <li key={course}>
                        <Link
                          href={enquiryHref(course)}
                          className="inline-block rounded-full border border-[#BDD631]/40 px-4 py-1.5 text-sm font-semibold text-[#BDD631] transition hover:bg-[#BDD631] hover:text-navy"
                        >
                          {course}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {banner.footerText && (
                <p className="mt-6 text-white/90">
                  {banner.footerText}{" "}
                  <Link href="/contact" className="font-semibold text-[#BDD631] underline-offset-4 hover:underline">
                    Contact Us
                  </Link>{" "}
                  for more details.
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60 lg:block"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60 lg:block"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <div className="mt-8 flex justify-center gap-2">
              {banners.map((b, i) => (
                <button
                  key={b.id}
                  type="button"
                  aria-label={`Show slide ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-[#BDD631]" : "w-2.5 bg-white/40 hover:bg-white/70"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
