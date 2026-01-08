import { db } from "@/lib/db";
import { ServicesContent } from "@/components/sections/ServicesContent";
import { ALL_SERVICES, ServiceData } from "@/lib/services-data";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Our Services | Clean Globe Consultancy",
  description: "Comprehensive sustainability solutions, from ESG strategy and Net Zero advisory to green building certification.",
};

export default async function ServicesPage() {
  // 1. Fetch published services from Database
  const dbServices = await db.service.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
  });

  // 2. Map Database Services to ServiceData Interface
  const mappedDbServices: ServiceData[] = dbServices.map((service) => ({
    slug: service.slug,
    name: service.name,
    shortDescription: service.shortDescription,
    fullDescription: service.fullDescription,
    deliverables: JSON.parse(service.deliverables || "[]"),
    timeline: service.timeline,
    faqs: JSON.parse(service.faqs || "[]"),
  }));

  // 3. Merge Strategies:
  // If we have DB services, use them. 
  // If not, fall back to the static ALL_SERVICES so the site is never empty.
  // In a robust app, we might merge them by slug, but for now simple fallback is safer.
  const finalServices = mappedDbServices.length > 0 ? mappedDbServices : ALL_SERVICES;

  return <ServicesContent services={finalServices} />;
}
