"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CheckCircleIcon, ClockIcon, DocumentTextIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface ServiceDetailContentProps {
    service: {
        slug: string;
        name: string;
        fullDescription: string;
        deliverables: string[];
        timeline: string;
        faqs: { question: string; answer: string }[];
    };
}

// Service-specific animated illustrations
const ServiceIllustration = ({ slug }: { slug: string }) => {
    const illustrations: Record<string, JSX.Element> = {
        "esg-advisory": (
            <motion.svg
                viewBox="0 0 200 200"
                className="w-full max-w-md text-lime opacity-80"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <defs>
                    <linearGradient id="chart-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
                    </linearGradient>
                </defs>
                {/* Bar Chart Animation */}
                <motion.g
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <rect x="40" y="180" width="20" height="0" rx="2" fill="currentColor" fillOpacity="0.3">
                        <animate attributeName="height" from="0" to="40" dur="0.8s" begin="1.2s" fill="freeze" />
                        <animate attributeName="y" from="180" to="140" dur="0.8s" begin="1.2s" fill="freeze" />
                    </rect>
                    <rect x="70" y="180" width="20" height="0" rx="2" fill="currentColor" fillOpacity="0.5">
                        <animate attributeName="height" from="0" to="70" dur="0.8s" begin="1.4s" fill="freeze" />
                        <animate attributeName="y" from="180" to="110" dur="0.8s" begin="1.4s" fill="freeze" />
                    </rect>
                    <rect x="100" y="180" width="20" height="0" rx="2" fill="currentColor" fillOpacity="0.7">
                        <animate attributeName="height" from="0" to="90" dur="0.8s" begin="1.6s" fill="freeze" />
                        <animate attributeName="y" from="180" to="90" dur="0.8s" begin="1.6s" fill="freeze" />
                    </rect>
                    <rect x="130" y="180" width="20" height="0" rx="2" fill="currentColor" fillOpacity="0.9">
                        <animate attributeName="height" from="0" to="120" dur="0.8s" begin="1.8s" fill="freeze" />
                        <animate attributeName="y" from="180" to="60" dur="0.8s" begin="1.8s" fill="freeze" />
                    </rect>
                    {/* Rising Trend Line */}
                    <motion.path
                        d="M30 150 L60 120 L90 100 L120 70 L150 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut", delay: 2 }}
                    />
                </motion.g>
            </motion.svg>
        ),
        "sustainability-advisory": (
            <motion.svg
                viewBox="0 0 200 200"
                className="w-full max-w-md text-lime opacity-80"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "100px 100px" }}
                >
                    <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
                    <ellipse cx="100" cy="100" rx="80" ry="20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
                    <ellipse cx="100" cy="100" rx="80" ry="20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" transform="rotate(45 100 100)" />
                    <ellipse cx="100" cy="100" rx="80" ry="20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" transform="rotate(90 100 100)" />
                    <motion.circle cx="170" cy="100" r="4" fill="currentColor" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                    <motion.circle cx="30" cy="100" r="4" fill="currentColor" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
                </motion.g>
            </motion.svg>
        ),
        "energy-advisory": (
            <motion.svg
                viewBox="0 0 200 200"
                className="w-full max-w-md text-lime opacity-80"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "100px 100px" }}
                >
                    <circle cx="100" cy="100" r="5" fill="currentColor" />
                    <path d="M100 95 L102 30 L98 30 Z" fill="currentColor" fillOpacity="0.8" />
                    <path d="M100 95 L102 30 L98 30 Z" fill="currentColor" fillOpacity="0.8" transform="rotate(120 100 100)" />
                    <path d="M100 95 L102 30 L98 30 Z" fill="currentColor" fillOpacity="0.8" transform="rotate(240 100 100)" />
                </motion.g>
                <motion.g
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "100px 100px" }}
                >
                    <circle cx="100" cy="100" r="3" fill="currentColor" />
                    <path d="M100 97 L101 50 L99 50 Z" fill="currentColor" fillOpacity="0.6" />
                    <path d="M100 97 L101 50 L99 50 Z" fill="currentColor" fillOpacity="0.6" transform="rotate(120 100 100)" />
                    <path d="M100 97 L101 50 L99 50 Z" fill="currentColor" fillOpacity="0.6" transform="rotate(240 100 100)" />
                </motion.g>
            </motion.svg>
        ),
        "climate-change-advisory": (
            <motion.svg
                viewBox="0 0 200 200"
                className="w-full max-w-md text-lime opacity-80"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.circle
                    cx="100"
                    cy="100"
                    r="60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeOpacity="0.3"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.circle
                    cx="100"
                    cy="100"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeOpacity="0.5"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.circle
                    cx="100"
                    cy="100"
                    r="20"
                    fill="currentColor"
                    fillOpacity="0.2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
            </motion.svg>
        ),
        "net-zero-advisory": (
            <motion.svg
                viewBox="0 0 200 200"
                className="w-full max-w-md text-lime opacity-80"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "100px 100px" }}
                >
                    <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" strokeOpacity="0.3" />
                    <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
                    <path d="M100 50 L100 150 M50 100 L150 100" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
                    <motion.circle cx="100" cy="40" r="5" fill="currentColor" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                    <motion.circle cx="160" cy="100" r="5" fill="currentColor" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                </motion.g>
            </motion.svg>
        ),
    };

    return illustrations[slug] || illustrations["esg-advisory"];
};

export function ServiceDetailContent({ service }: ServiceDetailContentProps) {
    return (
        <div className="bg-white min-h-screen">
            {/* Clean Hero Section */}
            <div className="relative bg-olive pt-4 pb-10 sm:pt-6 sm:pb-14 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-lime/10 blur-3xl"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 15, repeat: Infinity, delay: 2 }}
                        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-forest/10 blur-3xl"
                    />
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left: Content */}
                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Link href="/services" className="text-lime hover:text-white mb-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors group">
                                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Services
                                </Link>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-4xl font-bold tracking-tight text-lime font-serif sm:text-5xl"
                            >
                                {service.name}
                            </motion.h1>
                        </div>

                        {/* Right: Animated Illustration */}
                        <div className="lg:w-1/2 flex justify-center">
                            <ServiceIllustration slug={service.slug} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Content Area */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Main Content - More Detailed */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Overview Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-md border border-gray-100/50 hover:border-lime/40 transition-colors duration-300">
                                <h2 className="text-2xl font-bold text-forest font-serif mb-4">Overview</h2>
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-gray-700 leading-relaxed text-base">
                                        {service.fullDescription}
                                    </p>
                                    <p className="text-gray-600 leading-relaxed text-base mt-4">
                                        Our approach combines technical expertise with practical implementation strategies, ensuring that your sustainability initiatives deliver measurable results and align with your organizational goals.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Deliverables Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime/10 text-lime">
                                    <DocumentTextIcon className="h-6 w-6" />
                                </div>
                                <h2 className="text-3xl font-bold text-forest font-serif">What You Get</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {service.deliverables.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        className="group relative bg-white rounded-xl p-5 border border-gray-100/50 hover:border-lime/40 hover:shadow-lg transition-all duration-300 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-lime/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="relative flex gap-x-4 items-start">
                                            <div className="flex-shrink-0 mt-0.5">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime/10 group-hover:bg-lime group-hover:scale-110 transition-all duration-300">
                                                    <CheckCircleIcon className="h-5 w-5 text-lime group-hover:text-forest transition-colors" aria-hidden="true" />
                                                </div>
                                            </div>
                                            <span className="text-gray-700 text-base leading-6 font-medium group-hover:text-forest transition-colors">{item}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Process Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-gradient-to-br from-lime/5 to-transparent rounded-2xl p-8 lg:p-10 border border-lime/20"
                        >
                            <h2 className="text-2xl font-bold text-forest font-serif mb-6">Our Approach</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/60 rounded-xl p-6 border border-lime/10">
                                    <h3 className="font-semibold text-forest mb-2">1. Assessment & Analysis</h3>
                                    <p className="text-gray-600 text-sm">We begin by understanding your current state, identifying gaps, and benchmarking against industry standards.</p>
                                </div>
                                <div className="bg-white/60 rounded-xl p-6 border border-lime/10">
                                    <h3 className="font-semibold text-forest mb-2">2. Strategy Development</h3>
                                    <p className="text-gray-600 text-sm">We design tailored frameworks and action plans aligned with your organizational objectives.</p>
                                </div>
                                <div className="bg-white/60 rounded-xl p-6 border border-lime/10">
                                    <h3 className="font-semibold text-forest mb-2">3. Implementation Support</h3>
                                    <p className="text-gray-600 text-sm">We provide hands-on guidance to ensure successful execution and adoption across your organization.</p>
                                </div>
                                <div className="bg-white/60 rounded-xl p-6 border border-lime/10">
                                    <h3 className="font-semibold text-forest mb-2">4. Monitoring & Reporting</h3>
                                    <p className="text-gray-600 text-sm">We establish measurement frameworks and support ongoing reporting to track progress and impact.</p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Timeline Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative group"
                        >
                            <div className="relative bg-gradient-to-br from-lime/10 via-lime/5 to-transparent border-2 border-lime/20 rounded-2xl p-8 lg:p-10 hover:border-lime/40 hover:shadow-xl transition-all duration-500 overflow-hidden">
                                <div className="absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage: `radial-gradient(#BDD631 1px, transparent 1px)`,
                                        backgroundSize: '20px 20px'
                                    }}
                                />
                                <div className="relative">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime/20 text-lime group-hover:bg-lime group-hover:text-forest transition-all duration-300">
                                            <ClockIcon className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-forest font-serif">Typical Engagement Timeline</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed text-lg">{service.timeline}</p>
                                </div>
                            </div>
                        </motion.section>

                        {/* FAQ Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime/10 text-lime">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold text-forest font-serif">Frequently Asked Questions</h2>
                            </div>
                            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-md border border-gray-100/50">
                                <FAQAccordion items={service.faqs} />
                            </div>
                        </motion.section>
                    </div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="lg:col-span-1"
                    >
                        <div className="sticky top-28 group">
                            <div className="relative rounded-3xl bg-white p-8 shadow-xl border border-gray-100/50 border-t-4 border-lime overflow-hidden hover:shadow-2xl hover:border-lime/40 transition-all duration-300">
                                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-lime/5 blur-2xl group-hover:bg-lime/10 transition-colors duration-500" />
                                <div className="relative">
                                    <h3 className="text-lg font-bold leading-7 text-forest font-serif">Request a Proposal</h3>
                                    <p className="mt-4 text-sm leading-6 text-gray-600">
                                        Ready to move forward with {service.name}? Get a customized proposal for your organization.
                                    </p>
                                    <Button asChild className="w-full mt-8 bg-lime hover:bg-forest text-forest hover:text-white transition-colors duration-300" size="lg">
                                        <Link href="/contact">Contact Us</Link>
                                    </Button>
                                    <p className="mt-4 text-xs text-gray-400 text-center">
                                        No obligation. Confidential.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
