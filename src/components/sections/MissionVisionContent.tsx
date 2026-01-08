"use client";

import { CTASection } from "@/components/sections/CTASection";
import {
    RocketLaunchIcon,
    EyeIcon,
    ShieldCheckIcon,
    WrenchScrewdriverIcon,
    ChartBarSquareIcon,
    SparklesIcon,
    UserGroupIcon,
    GlobeAltIcon,
    LightBulbIcon
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const values = [
    {
        title: "Integrity",
        description: "We uphold the highest ethical standards, ensuring transparent and honest guidance in every engagement.",
        icon: ShieldCheckIcon,
    },
    {
        title: "Excellence",
        description: "We are committed to delivering rigorous, high-quality analysis and solutions that stand up to scrutiny.",
        icon: SparklesIcon,
    },
    {
        title: "Innovation",
        description: "We leverage cutting-edge technology and methodologies to solving complex sustainability challenges.",
        icon: LightBulbIcon,
    },
    {
        title: "Partnership",
        description: "We believe in long-term collaboration, working as an extension of your team to drive lasting change.",
        icon: UserGroupIcon,
    },
    {
        title: "Impact",
        description: "We focus on tangible outcomes—measurable carbon reduction, energy savings, and social value creation.",
        icon: ChartBarSquareIcon,
    },
    {
        title: "Global Vision",
        description: "We align local actions with global standards (UN SDGs, Paris Agreement) for meaningful contribution.",
        icon: GlobeAltIcon,
    }
];

export function MissionVisionContent() {
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
                            <span className="text-sm font-medium text-lime">Our Core</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl font-bold tracking-tight text-lime font-serif sm:text-6xl"
                        >
                            Mission & Vision
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-6 text-lg leading-8 text-cream/80"
                        >
                            Defining our purpose and the future we are striving to build.
                        </motion.p>
                    </div>

                    {/* Creative Vector Illustration - Compass/Direction */}
                    <div className="lg:w-1/2 flex justify-center">
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
                                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.2" />
                            </motion.g>

                            {/* Compass Needle */}
                            <motion.g
                                initial={{ rotate: -45 }}
                                animate={{ rotate: 0 }}
                                transition={{ duration: 2, type: "spring" }}
                                style={{ transformOrigin: "100px 100px" }}
                            >
                                <path d="M100 20 L115 100 L100 180 L85 100 Z" fill="currentColor" opacity="0.8" />
                                <circle cx="100" cy="100" r="3" fill="#031926" />
                            </motion.g>
                        </motion.svg>
                    </div>
                </div>
            </div>

            {/* Mission & Vision Cards */}
            <div className="bg-white py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                        {/* Mission Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative group"
                        >
                            <div className="relative bg-white rounded-3xl p-10 h-full shadow-md border border-gray-100/50 hover:border-lime/40 overflow-hidden transition-all duration-300 hover:shadow-lg">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-lime/10 text-lime group-hover:bg-lime group-hover:text-forest transition-colors duration-300">
                                        <RocketLaunchIcon className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <span className="text-lime text-sm font-semibold uppercase tracking-wider">Our Purpose</span>
                                        <h2 className="text-3xl font-bold tracking-tight text-forest font-serif">Our Mission</h2>
                                    </div>
                                </div>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    To empower businesses and organizations across the Middle East to achieve their sustainability targets through rigorous assessment, strategic planning, and practical implementation. We are dedicated to driving measurable environmental impact while enhancing operational resilience.
                                </p>
                            </div>
                        </motion.div>

                        {/* Vision Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative group"
                        >
                            <div className="relative bg-white rounded-3xl p-10 h-full shadow-md border border-gray-100/50 hover:border-lime/40 overflow-hidden transition-all duration-300 hover:shadow-lg">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-lime/10 text-lime group-hover:bg-lime group-hover:text-forest transition-colors duration-300">
                                        <EyeIcon className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <span className="text-lime text-sm font-semibold uppercase tracking-wider">Our Aspiration</span>
                                        <h2 className="text-3xl font-bold tracking-tight text-forest font-serif">Our Vision</h2>
                                    </div>
                                </div>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    To be the region's most trusted sustainability partner, recognized for catalysing the transition to a net-zero circular economy. We envision a future where profit and planet thrive in harmony.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Values Section */}
            <div className="bg-cream py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-lime text-sm font-semibold uppercase tracking-wider">Guiding Principles</span>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-forest font-serif">Our Values</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            The compass that guides our decisions and interactions.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group h-full"
                            >
                                <div className="relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100/50 hover:border-lime/40 h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-cream text-lime mb-6 group-hover:bg-lime group-hover:text-forest transition-colors duration-300`}>
                                        <value.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-forest font-serif mb-3">{value.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>


            <CTASection title="Partner with Purpose" description="Join us in building a sustainable future. Let's discuss your goals." />
        </>
    );
}
