import Link from "next/link";
import Image from "next/image";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TargetAudience } from "@/components/sections/TargetAudience";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { Testimonials } from "@/components/features/Testimonials";
import { QuickContactForm } from "@/components/features/QuickContactForm";
import { ALL_SERVICES } from "@/lib/services-data";
import { db } from "@/lib/db";
import { HomePageContent } from "@/components/sections/HomePageContent";
import { parseCourses, type CourseBannerPublic } from "@/lib/course-banner";
import { courseKey } from "@/lib/training";
import { getPublishedCourses } from "@/lib/training-data";

export const dynamic = 'force-dynamic';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default async function Home() {
  // Fetch published services from database, fallback to constants
  let services: Array<{ slug: string; name: string; description: string }> = ALL_SERVICES.map(s => ({
    slug: s.slug,
    name: s.name,
    description: s.shortDescription
  }));

  try {
    const dbServices = await db.service.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    });
    if (dbServices.length > 0) {
      services = dbServices.map((s) => ({
        slug: s.slug,
        name: s.name,
        description: s.shortDescription,
      }));
    }
  } catch (error) {
    // Fallback to constants if DB fails (e.g., during build or if DB not available)
    console.error("Error fetching services:", error);
  }

  // Fetch published testimonials
  let testimonials: any[] = [];
  try {
    testimonials = await db.testimonial.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
      take: 6,
    });
  } catch (error) {
    // Silently fail during build if DB not available
    console.error("Error fetching testimonials:", error);
  }

  // Published course banners (managed from Admin > Course Banners)
  let courseBanners: CourseBannerPublic[] = [];
  try {
    const rows = await db.courseBanner.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
    });
    courseBanners = rows.map((b) => ({
      id: b.id,
      providerName: b.providerName,
      providerTagline: b.providerTagline,
      logoUrl: b.logoUrl,
      badge: b.badge,
      badgeNote: b.badgeNote,
      headline: b.headline,
      subheadline: b.subheadline,
      description: b.description,
      coursesIntro: b.coursesIntro,
      courses: parseCourses(b.courses),
      footerText: b.footerText,
      ctaLabel: b.ctaLabel,
      ctaHref: b.ctaHref,
    }));
  } catch (error) {
    // Table may not exist yet on first deploy; never break the home page.
    console.error("Error fetching course banners:", error);
  }

  // Map banner course names to their /training pages (e.g. "Introduction to Net-Zero")
  const courseLinks: Record<string, string> = {};
  for (const c of await getPublishedCourses()) {
    courseLinks[courseKey(c.title)] = `/training/${c.slug}`;
  }

  return (
    <>
      <HomePageContent
        services={services}
        testimonials={testimonials}
        courseBanners={courseBanners}
        courseLinks={courseLinks}
      />
    </>
  );
}
