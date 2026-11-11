import { z } from "zod";

/** Shared validation for course banner create/update (admin API). */
export const courseBannerSchema = z.object({
  providerName: z.string().optional().nullable(),
  providerTagline: z.string().optional().nullable(),
  logoUrl: z.string().optional().nullable(),
  badge: z.string().optional().nullable(),
  badgeNote: z.string().optional().nullable(),
  headline: z.string().min(1, "Headline is required"),
  subheadline: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  coursesIntro: z.string().optional().nullable(),
  courses: z.array(z.string().min(1)).default([]),
  footerText: z.string().optional().nullable(),
  ctaLabel: z.string().min(1).default("Enroll Now"),
  ctaHref: z.string().optional().nullable(),
  displayOrder: z.number().default(0),
  published: z.boolean().default(true),
});

export type CourseBannerInput = z.infer<typeof courseBannerSchema>;

/** Public shape consumed by the homepage carousel. */
export interface CourseBannerPublic {
  id: string;
  providerName: string | null;
  providerTagline: string | null;
  logoUrl: string | null;
  badge: string | null;
  badgeNote: string | null;
  headline: string;
  subheadline: string | null;
  description: string | null;
  coursesIntro: string | null;
  courses: string[];
  footerText: string | null;
  ctaLabel: string;
  ctaHref: string | null;
}

export function parseCourses(raw: string | null | undefined): string[] {
  try {
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed.filter((c) => typeof c === "string") : [];
  } catch {
    return [];
  }
}

/** Blank strings from the admin form are stored as null. */
export function emptyToNull(data: CourseBannerInput) {
  const clean = (v?: string | null) => (v && v.trim() ? v.trim() : null);
  return {
    providerName: clean(data.providerName),
    providerTagline: clean(data.providerTagline),
    logoUrl: clean(data.logoUrl),
    badge: clean(data.badge),
    badgeNote: clean(data.badgeNote),
    headline: data.headline.trim(),
    subheadline: clean(data.subheadline),
    description: clean(data.description),
    coursesIntro: clean(data.coursesIntro),
    courses: JSON.stringify(data.courses.map((c) => c.trim()).filter(Boolean)),
    footerText: clean(data.footerText),
    ctaLabel: data.ctaLabel.trim() || "Enroll Now",
    ctaHref: clean(data.ctaHref),
    displayOrder: data.displayOrder,
    published: data.published,
  };
}
