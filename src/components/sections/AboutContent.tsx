"use client";

import { CTASection } from "@/components/sections/CTASection";
import {
    SparklesIcon,
    GlobeAmericasIcon,
    CheckBadgeIcon,
    UserGroupIcon,
    BuildingOffice2Icon
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export function AboutContent() {
    return (
        <>
            {/* Header */}
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
                            <span className="text-sm font-medium text-lime">Who We Are</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl font-bold tracking-tight text-lime font-serif sm:text-6xl"
                        >
                            About Clean Globe
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-6 text-lg leading-8 text-cream/80"
                        >
                            Clean Globe Consultancy (CGC) is a premier advisory firm dedicated to guiding organizations toward a sustainable, resilient, and net-zero future.
                        </motion.p>
                    </div>

                    {/* Creative Vector Illustration - Network Globe */}
                    <div className="lg:w-1/2 flex justify-center">
                        <motion.svg
                            viewBox="0 0 200 200"
                            className="w-full max-w-md text-lime opacity-80"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <defs>
                                <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
                                </linearGradient>
                            </defs>
                            <motion.g
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                style={{ transformOrigin: "100px 100px" }}
                            >
                                {/* Globe Grid */}
                                <circle cx="100" cy="100" r="80" fill="none" stroke="url(#grid-grad)" strokeWidth="0.5" />
                                <ellipse cx="100" cy="100" rx="80" ry="20" fill="none" stroke="url(#grid-grad)" strokeWidth="0.5" transform="rotate(0 100 100)" />
                                <ellipse cx="100" cy="100" rx="80" ry="20" fill="none" stroke="url(#grid-grad)" strokeWidth="0.5" transform="rotate(45 100 100)" />
                                <ellipse cx="100" cy="100" rx="80" ry="20" fill="none" stroke="url(#grid-grad)" strokeWidth="0.5" transform="rotate(90 100 100)" />
                                <ellipse cx="100" cy="100" rx="80" ry="20" fill="none" stroke="url(#grid-grad)" strokeWidth="0.5" transform="rotate(135 100 100)" />

                                {/* Moving Nodes */}
                                <motion.circle cx="170" cy="100" r="3" fill="currentColor" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                                <motion.circle cx="30" cy="100" r="3" fill="currentColor" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
                                <motion.circle cx="100" cy="30" r="3" fill="currentColor" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                                <motion.circle cx="100" cy="170" r="3" fill="currentColor" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />
                            </motion.g>
                        </motion.svg>
                    </div>
                </div>
            </div>

            {/* Our Story / Introduction */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-lime font-semibold uppercase tracking-wider text-sm">Our Origin</span>
                            <h2 className="mt-2 text-3xl font-bold track-tight text-forest font-serif sm:text-4xl mb-6">
                                Bridging Strategy and Sustainability
                            </h2>
                            <div className="text-lg leading-8 text-gray-600 space-y-6">
                                <p>
                                    Based in Qatar and operating globally, CGC was founded on a simple belief: sustainability is not just a compliance requirement, but a strategic advantage.
                                </p>
                                <p>
                                    As the region undergoes a massive transformation driven by Vision 2030 initiatives, we saw a gap for a consultancy that could offer more than just reports. We offer impact.
                                </p>
                                <p>
                                    From humble beginnings as a specialized advisory unit, we have grown into a full-service sustainability partner, trusted by government entities, major developers, and private enterprises to decipher the complexities of ESG, Carbon, and Green Certification.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-3xl overflow-hidden bg-cream aspect-[4/3] flex items-center justify-center p-8"
                        >
                            {/* Abstract Visualization of Growth */}
                            <div className="absolute inset-0 bg-gradient-to-br from-olive/20 to-forest/5" />
                            <GlobeAmericasIcon className="w-64 h-64 text-forest/20 absolute -right-12 -bottom-12" />
                            <BuildingOffice2Icon className="w-48 h-48 text-lime/30 absolute left-8 top-8" />

                            <div className="relative z-10 grid grid-cols-2 gap-4">
                                <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                                    <div className="text-3xl font-bold text-lime">50+</div>
                                    <div className="text-sm text-forest mt-1">Projects Delivered</div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                                    <div className="text-3xl font-bold text-lime">1M+</div>
                                    <div className="text-sm text-forest mt-1">Sq.m Certified</div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm text-center col-span-2">
                                    <div className="text-3xl font-bold text-lime">100%</div>
                                    <div className="text-sm text-forest mt-1">Client Retention</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-cream py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold track-tight text-forest font-serif sm:text-4xl">
                            Why Clients Trust Us
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            We combine deep technical expertise with local market knowledge.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-transparent hover:border-lime/30 transition-all">
                            <CheckBadgeIcon className="h-10 w-10 text-lime mb-4" />
                            <h3 className="text-xl font-bold text-forest mb-2">Technical Rigor</h3>
                            <p className="text-gray-600">
                                Our team comprises certified engineers, scientists, and auditors. We don't guess; we calculate.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-transparent hover:border-lime/30 transition-all">
                            <UserGroupIcon className="h-10 w-10 text-lime mb-4" />
                            <h3 className="text-xl font-bold text-forest mb-2">Local Presence</h3>
                            <p className="text-gray-600">
                                We understand the regulatory landscape of Qatar and the Gulf, ensuring your strategy is compliant and relevant.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-transparent hover:border-lime/30 transition-all">
                            <SparklesIcon className="h-10 w-10 text-lime mb-4" />
                            <h3 className="text-xl font-bold text-forest mb-2">Full Lifecycle</h3>
                            <p className="text-gray-600">
                                From the initial feasibility study to post-occupancy monitoring, we are with you every step of the way.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <CTASection title="Ready to collaborate?" description="Let's discuss how we can support your organization's journey." />
        </>
    );
}
