import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SparklesIcon } from "@heroicons/react/24/solid";

interface CTASectionProps {
    title?: string;
    description?: string;
    primaryBtnText?: string;
    primaryBtnHref?: string;
    secondaryBtnText?: string;
    secondaryBtnHref?: string;
}

export function CTASection({
    title = "Ready to start your sustainability journey?",
    description = "Partner with CGC to implement pragmatic, measurable solutions for your business.",
    primaryBtnText = "Book a Consultation",
    primaryBtnHref = "/contact",
    secondaryBtnText = "View Services",
    secondaryBtnHref = "/services",
}: CTASectionProps) {
    return (
        <section className="relative bg-cream py-16 sm:py-24 overflow-hidden border-t border-forest/5">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-lime/10 blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-forest/5 blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100">
                        <SparklesIcon className="h-5 w-5 text-lime" />
                        <span className="text-sm font-medium text-forest">Let&apos;s Work Together</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-forest sm:text-4xl font-serif">
                        {title}
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
                        {description}
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button asChild size="lg" variant="default" className="bg-lime hover:bg-lime/90 text-forest font-bold px-8 shadow-md hover:shadow-lg transition-all duration-300">
                            <Link href={primaryBtnHref}>{primaryBtnText}</Link>
                        </Button>
                        {secondaryBtnText && (
                            <Button asChild size="lg" variant="outline" className="border-2 border-forest/10 text-forest hover:bg-forest/5 bg-transparent">
                                <Link href={secondaryBtnHref || "#"}>{secondaryBtnText} <span aria-hidden="true">→</span></Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

