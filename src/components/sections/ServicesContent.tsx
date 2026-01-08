"use client";

import { ServiceCard } from "@/components/ui/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { ALL_SERVICES } from "@/lib/services-data";
import { ServiceData } from "@/lib/services-data";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

interface ServicesContentProps {
    services: ServiceData[];
}

export function ServicesContent({ services }: ServicesContentProps) {
    return (
        <>
            <div className="bg-white">
                <div className="relative isolate overflow-hidden bg-olive pt-4 pb-10 sm:pt-6 sm:pb-14">
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
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
                        <div className="mx-auto max-w-2xl text-center lg:text-left lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                            >
                                <SparklesIcon className="h-5 w-5 text-lime" />
                                <span className="text-sm font-medium text-lime">Our Expertise</span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-4xl font-bold tracking-tight text-lime font-serif sm:text-6xl"
                            >
                                Our Services
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mt-6 text-lg leading-8 text-cream/80"
                            >
                                Pragmatic solutions ensuring compliance and driving value across all dimensions of sustainability.
                            </motion.p>
                        </div>

                        {/* Creative Vector Illustration - Interconnected Gears */}
                        <div className="lg:w-1/2 flex justify-center">
                            <motion.svg
                                viewBox="0 0 200 200"
                                className="w-full max-w-md text-lime opacity-80"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <defs>
                                    <linearGradient id="gear-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
                                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
                                    </linearGradient>
                                </defs>
                                <motion.g
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="origin-center"
                                    style={{ transformOrigin: "100px 100px" }}
                                >
                                    {/* Central Gear */}
                                    <circle cx="100" cy="100" r="40" fill="url(#gear-grad)" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                                    <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
                                    <path d="M100 50 L100 150 M50 100 L150 100" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />

                                    {/* Orbiting Elements */}
                                    <motion.circle cx="100" cy="40" r="5" fill="currentColor" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                                    <motion.circle cx="160" cy="100" r="5" fill="currentColor" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                                    <motion.circle cx="100" cy="160" r="5" fill="currentColor" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
                                    <motion.circle cx="40" cy="100" r="5" fill="currentColor" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />
                                </motion.g>

                                {/* Outer Ring */}
                                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.3" />
                            </motion.svg>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-[100rem] px-6 lg:px-8 py-16 pb-24">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        className="space-y-8"
                    >
                        {/* Row 1: 4 cards */}
                        <div className="flex flex-wrap justify-center gap-6">
                            {services.slice(0, 4).map((service) => (
                                <motion.div
                                    key={service.slug}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                    }}
                                    className="w-full sm:w-[48%] lg:w-[23%]"
                                >
                                    <ServiceCard
                                        slug={service.slug}
                                        title={service.name}
                                        description={service.shortDescription}
                                        deliverables={service.deliverables}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Row 2: Remaining cards centered (3 items) */}
                        <div className="flex flex-wrap justify-center gap-6">
                            {services.slice(4).map((service) => (
                                <motion.div
                                    key={service.slug}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                    }}
                                    className="w-full sm:w-[48%] lg:w-[23%]"
                                >
                                    <ServiceCard
                                        slug={service.slug}
                                        title={service.name}
                                        description={service.shortDescription}
                                        deliverables={service.deliverables}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <CTASection title="Not sure where to start?" description="Contact us for a preliminary assessment of your sustainability needs." />
        </>
    );
}
