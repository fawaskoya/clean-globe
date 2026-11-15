/**
 * Idempotent: loads the 4 ISEP courses (from the client's flyers) and switches
 * on the training ticker if it has never been configured. Safe to re-run —
 * existing courses (matched by slug) and an existing ticker are left untouched.
 *
 *   npx tsx prisma/seed-training.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const NOTE =
  "Completing an ISEP (formerly IEMA) certified course earns credit toward ISEP's Register of Carbon Accountants and Auditors.";
const NZ = "/brochures/isep-net-zero-training-programme.pdf";
const ESS = "/brochures/isep-environmental-sustainability-skills.pdf";

const COURSES = [
  {
    slug: "introduction-to-net-zero",
    title: "Introduction to Net Zero",
    programme: "Net Zero Training Programme",
    level: "Foundation · ISEP Certified",
    summary:
      "An accessible introduction to net zero for anyone — what it means, why it matters now and what your organisation can do. No prior experience needed.",
    duration: "2 Guided Learning Hours",
    topics: ["What does net zero mean?", "Why net zero matters now", "What your organisation can do", "Communicating without greenwash"],
    audience: ["Anyone curious about net zero", "Business professionals", "Sustainability teams", "Organisations with net zero goals", "All sectors & job roles"],
    assessment: "Non-assessed",
    entryRequirements: "No entry requirements",
    certification: "ISEP certified course",
    note: NOTE,
    brochureUrl: NZ,
    displayOrder: 1,
  },
  {
    slug: "pathways-to-net-zero",
    title: "Pathways to Net Zero",
    programme: "Net Zero Training Programme",
    level: "Advanced · ISEP Certified",
    summary:
      "Built for leaders: the practical knowledge to measure emissions, set science-based targets and plan decarbonisation across your organisation and value chain.",
    duration: "14 Guided Learning Hours / 2 Days",
    topics: [
      "GHG accounting (Scope 1, 2 & 3)",
      "Science-based targets (SBTi)",
      "Decarbonisation planning",
      "Carbon neutrality & PAS 2060",
      "Net zero across the value chain",
      "Communicating net zero externally",
    ],
    audience: ["Managers & supervisors", "Managers & team leaders", "Sustainability teams", "Organisations with net zero goals"],
    assessment: "20-question MCQ · 70% to pass",
    entryRequirements: "Designed for managers & supervisors",
    certification: "ISEP certified course",
    note: NOTE,
    brochureUrl: NZ,
    displayOrder: 2,
  },
  {
    slug: "environmental-sustainability-skills-for-the-workforce",
    title: "Environmental Sustainability Skills for the Workforce",
    programme: "Environmental Sustainability Skills",
    level: "Course 1 · RQF Level 2 · ISEP Certified",
    summary:
      "Equips every employee to understand environmental risks, meet compliance obligations and take practical steps to improve performance in their day-to-day role.",
    duration: "7 Guided Learning Hours / 1 Day",
    topics: [
      "Environmental risks & opportunities",
      "Compliance obligations & legislation",
      "Pollution prevention & control",
      "Practical steps to improve performance",
    ],
    audience: ["All employees", "Operational staff", "Team leaders", "Any job role · Any sector"],
    assessment: "20-question online MCQ · 70% to pass",
    entryRequirements: "No formal requirements — open to all",
    certification: "ISEP Certificate provided",
    note: null,
    brochureUrl: ESS,
    displayOrder: 3,
  },
  {
    slug: "environmental-sustainability-skills-for-managers",
    title: "Environmental Sustainability Skills for Managers",
    programme: "Environmental Sustainability Skills",
    level: "Course 2 · ISEP Certified",
    summary:
      "Gives supervisors and managers a strategic view of sustainability — setting baselines and KPIs, improving resource efficiency and leading change with their teams.",
    duration: "14 Guided Learning Hours / 2 Days",
    topics: [
      "Strategic sustainability overview",
      "Baseline data & KPI monitoring",
      "Value chain & resource efficiency",
      "Change management & staff engagement",
    ],
    audience: ["Supervisors & managers", "Sustainability teams", "All sectors"],
    assessment: "20-question online MCQ · 70% to pass",
    entryRequirements: "No formal requirements — open to all",
    certification: "ISEP Certificate provided",
    note: null,
    brochureUrl: ESS,
    displayOrder: 4,
  },
];

async function main() {
  for (const c of COURSES) {
    const exists = await prisma.trainingCourse.findUnique({ where: { slug: c.slug } });
    if (exists) {
      console.log(`= exists, left unchanged: ${c.slug}`);
      continue;
    }
    await prisma.trainingCourse.create({
      data: {
        ...c,
        topics: JSON.stringify(c.topics),
        audience: JSON.stringify(c.audience),
        startDate: "Commencing December 2026",
        fee: null,
        published: true,
      },
    });
    console.log(`+ created: ${c.slug}`);
  }

  const settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    await prisma.siteSettings.create({
      data: {
        id: "default",
        announcementEnabled: true,
        announcementText:
          "ISEP Certified Courses commencing December 2026 | Net Zero & Environmental Sustainability Skills | Limited seats — enquire now",
        announcementLink: "/training",
      },
    });
    console.log("+ created site settings with training ticker ON");
  } else if (!settings.announcementText) {
    await prisma.siteSettings.update({
      where: { id: settings.id },
      data: {
        announcementEnabled: true,
        announcementText:
          "ISEP Certified Courses commencing December 2026 | Net Zero & Environmental Sustainability Skills | Limited seats — enquire now",
        announcementLink: "/training",
      },
    });
    console.log("+ training ticker switched ON");
  } else {
    console.log("= ticker already configured, left unchanged");
  }
}

main()
  .catch((e) => {
    console.error("FAILED:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
