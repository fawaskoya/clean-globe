import { z } from "zod";

export const DEFAULT_START_DATE = "Commencing December 2026";
export const FEE_FALLBACK = "Contact us for fees";
/** Height of the announcement ticker; header and page content are offset by this. */
export const ANNOUNCE_HEIGHT = "36px";

/** Intro copy for each programme on /training (from the ISEP flyers). */
export const PROGRAMME_INTROS: Record<string, { eyebrow: string; title: string; intro: string; brochure?: string }> = {
  "Net Zero Training Programme": {
    eyebrow: "Net Zero Training Programme",
    title: "Your journey to net zero starts here.",
    intro:
      "Two focused courses — one accessible to everyone, one built for leaders — giving you the knowledge to respond to the climate crisis with confidence.",
    brochure: "/brochures/isep-net-zero-training-programme.pdf",
  },
  "Environmental Sustainability Skills": {
    eyebrow: "Professional Development Series",
    title: "Environmental Sustainability Skills",
    intro:
      "Accredited training that equips your entire organisation — from the shop floor to the boardroom — to drive real environmental change.",
    brochure: "/brochures/isep-environmental-sustainability-skills.pdf",
  },
};

export const trainingCourseSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens"),
  title: z.string().min(1, "Title is required"),
  programme: z.string().min(1, "Programme is required"),
  level: z.string().optional().nullable(),
  summary: z.string().min(1, "Summary is required"),
  duration: z.string().optional().nullable(),
  startDate: z.string().optional().nullable(),
  fee: z.string().optional().nullable(),
  topics: z.array(z.string()).default([]),
  audience: z.array(z.string()).default([]),
  assessment: z.string().optional().nullable(),
  entryRequirements: z.string().optional().nullable(),
  certification: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  brochureUrl: z.string().optional().nullable(),
  displayOrder: z.number().default(0),
  published: z.boolean().default(true),
});

export type TrainingCourseInput = z.infer<typeof trainingCourseSchema>;

export interface TrainingCoursePublic {
  id: string;
  slug: string;
  title: string;
  programme: string;
  level: string | null;
  summary: string;
  duration: string | null;
  startDate: string | null;
  fee: string | null;
  topics: string[];
  audience: string[];
  assessment: string | null;
  entryRequirements: string | null;
  certification: string | null;
  note: string | null;
  brochureUrl: string | null;
}

export function parseList(raw: string | null | undefined): string[] {
  try {
    const v = JSON.parse(raw || "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string" && x.trim()) : [];
  } catch {
    return [];
  }
}

export function toPublic(row: {
  id: string; slug: string; title: string; programme: string; level: string | null; summary: string;
  duration: string | null; startDate: string | null; fee: string | null; topics: string; audience: string;
  assessment: string | null; entryRequirements: string | null; certification: string | null;
  note: string | null; brochureUrl: string | null;
}): TrainingCoursePublic {
  return { ...row, topics: parseList(row.topics), audience: parseList(row.audience) };
}

/** Normalise blank strings to null and lists to JSON for the DB. */
export function toDbData(d: TrainingCourseInput) {
  const c = (v?: string | null) => (v && v.trim() ? v.trim() : null);
  const list = (a: string[]) => JSON.stringify(a.map((x) => x.trim()).filter(Boolean));
  return {
    slug: d.slug.trim(),
    title: d.title.trim(),
    programme: d.programme.trim(),
    level: c(d.level),
    summary: d.summary.trim(),
    duration: c(d.duration),
    startDate: c(d.startDate),
    fee: c(d.fee),
    topics: list(d.topics),
    audience: list(d.audience),
    assessment: c(d.assessment),
    entryRequirements: c(d.entryRequirements),
    certification: c(d.certification),
    note: c(d.note),
    brochureUrl: c(d.brochureUrl),
    displayOrder: d.displayOrder,
    published: d.published,
  };
}

/** Loose key for matching banner course names to course pages ("Net-Zero" == "Net Zero"). */
export function courseKey(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}
