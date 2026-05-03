/**
 * One-time cleanup script for the production database.
 *
 * Run this AFTER deploying the new seed.ts to remove the demo content that
 * the previous seed kept inserting on every Vercel build:
 *   - duplicate placeholder testimonials (Sarah Johnson, Ahmed Al-Mansoori, Emily Chen)
 *   - the "John Doe / Future Corp" sample contact submission(s)
 *   - optionally unpublish the seed projects until the client confirms them
 *
 * Usage (from the project root, with DATABASE_URL pointing at production):
 *   npx tsx prisma/cleanup-demo-content.ts
 *   npx tsx prisma/cleanup-demo-content.ts --unpublish-seed-projects
 *   npx tsx prisma/cleanup-demo-content.ts --delete-seed-projects
 *
 * Defaults to a dry-run preview. Pass --apply to actually delete.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PLACEHOLDER_TESTIMONIAL_NAMES = [
  "Sarah Johnson",
  "Ahmed Al-Mansoori",
  "Emily Chen",
];

const SEED_PROJECT_SLUGS = ["lusail-green-tower", "doha-industrial-audit"];

async function main() {
  const apply = process.argv.includes("--apply");
  const unpublishSeedProjects = process.argv.includes("--unpublish-seed-projects");
  const deleteSeedProjects = process.argv.includes("--delete-seed-projects");

  console.log(`🧹 cleanup-demo-content: ${apply ? "APPLY mode" : "DRY-RUN mode (pass --apply to commit)"}`);

  const placeholderTestimonials = await prisma.testimonial.findMany({
    where: { name: { in: PLACEHOLDER_TESTIMONIAL_NAMES } },
    orderBy: { createdAt: "asc" },
  });
  console.log(
    `📋 Found ${placeholderTestimonials.length} placeholder testimonial row(s) to delete.`
  );
  for (const t of placeholderTestimonials) {
    console.log(`   - ${t.name} / ${t.company ?? "—"} (id=${t.id}, createdAt=${t.createdAt.toISOString()})`);
  }

  const johnDoeContacts = await prisma.contactSubmission.findMany({
    where: {
      OR: [
        { email: "john@example.com" },
        { name: "John Doe" },
      ],
    },
  });
  console.log(`📋 Found ${johnDoeContacts.length} demo contact submission(s).`);
  for (const c of johnDoeContacts) {
    console.log(`   - ${c.name} <${c.email}> (id=${c.id})`);
  }

  const seedProjects = await prisma.project.findMany({
    where: { slug: { in: SEED_PROJECT_SLUGS } },
  });
  console.log(`📋 Found ${seedProjects.length} seed project row(s):`);
  for (const p of seedProjects) {
    console.log(`   - ${p.title} (slug=${p.slug}, published=${p.published})`);
  }

  if (!apply) {
    console.log("\n(Dry run — no changes made. Re-run with --apply to commit.)");
    return;
  }

  if (placeholderTestimonials.length > 0) {
    const r = await prisma.testimonial.deleteMany({
      where: { id: { in: placeholderTestimonials.map((t) => t.id) } },
    });
    console.log(`✅ Deleted ${r.count} placeholder testimonial row(s).`);
  }

  if (johnDoeContacts.length > 0) {
    const r = await prisma.contactSubmission.deleteMany({
      where: { id: { in: johnDoeContacts.map((c) => c.id) } },
    });
    console.log(`✅ Deleted ${r.count} demo contact submission(s).`);
  }

  if (deleteSeedProjects && seedProjects.length > 0) {
    const r = await prisma.project.deleteMany({
      where: { slug: { in: SEED_PROJECT_SLUGS } },
    });
    console.log(`✅ Deleted ${r.count} seed project row(s).`);
  } else if (unpublishSeedProjects && seedProjects.length > 0) {
    const r = await prisma.project.updateMany({
      where: { slug: { in: SEED_PROJECT_SLUGS } },
      data: { published: false },
    });
    console.log(`✅ Unpublished ${r.count} seed project row(s).`);
  }

  console.log("\n🧹 Cleanup complete.");
}

main()
  .catch((e) => {
    console.error("❌ cleanup failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
