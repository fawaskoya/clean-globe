import { notFound } from "next/navigation";
import { ALL_SERVICES } from "@/lib/services-data";
import { ServiceDetailContent } from "@/components/sections/ServiceDetailContent";
import { db } from "@/lib/db";
import { ServiceData } from "@/lib/services-data";

export async function generateStaticParams() {
    // Generate params only for static content to speed up build
    return ALL_SERVICES.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Check DB first for metadata
    const dbService = await db.service.findUnique({ where: { slug } });
    if (dbService) {
        return {
            title: `${dbService.name} | Clean Globe Consultancy`,
            description: dbService.shortDescription,
        };
    }

    // Fallback
    const service = ALL_SERVICES.find((s) => s.slug === slug);
    if (!service) return { title: "Service Not Found" };

    return {
        title: `${service.name} | Clean Globe Consultancy`,
        description: service.shortDescription,
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // 1. Try fetching from Database
    const dbService = await db.service.findUnique({
        where: { slug },
    });

    let service: ServiceData | undefined;

    if (dbService) {
        service = {
            slug: dbService.slug,
            name: dbService.name,
            shortDescription: dbService.shortDescription,
            fullDescription: dbService.fullDescription,
            deliverables: JSON.parse(dbService.deliverables || "[]"),
            timeline: dbService.timeline,
            faqs: JSON.parse(dbService.faqs || "[]"),
        };
    } else {
        // 2. Fallback to static
        service = ALL_SERVICES.find((s) => s.slug === slug);
    }

    if (!service) {
        notFound();
    }

    return <ServiceDetailContent service={service} />;
}
