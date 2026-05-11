import { notFound } from "next/navigation";
import { ALL_SERVICES } from "@/lib/services-data";
import { ServiceDetailContent } from "@/components/sections/ServiceDetailContent";

export async function generateStaticParams() {
    return ALL_SERVICES.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = ALL_SERVICES.find((s) => s.slug === slug);
    if (!service) return { title: "Service Not Found" };

    return {
        title: `${service.name} | Clean Globe Consultancy`,
        description: service.shortDescription,
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = ALL_SERVICES.find((s) => s.slug === slug);

    if (!service) {
        notFound();
    }

    return <ServiceDetailContent service={service} />;
}
