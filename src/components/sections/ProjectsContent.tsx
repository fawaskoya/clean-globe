"use client";

import { AnimatedProjectCard } from "@/components/ui/AnimatedProjectCard";
import { CTASection } from "@/components/sections/CTASection";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { Project } from "@prisma/client";

interface ProjectsContentProps {
    projects: Project[];
}

export function ProjectsContent({ projects }: ProjectsContentProps) {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-olive pt-8 pb-16 sm:pt-12 sm:pb-24">
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
                            <span className="text-sm font-medium text-lime">Our Work</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl font-bold tracking-tight text-lime font-serif sm:text-6xl"
                        >
                            Projects
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-6 text-lg leading-8 text-cream/80"
                        >
                            Discover our impactful sustainability initiatives and successful project implementations across the region.
                        </motion.p>
                    </div>

                    {/* Creative Vector Illustration - Blueprint/Building */}
                    <div className="lg:w-1/2 flex justify-center">
                        <motion.svg
                            viewBox="0 0 200 200"
                            className="w-full max-w-md text-lime opacity-80"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <defs>
                                <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
                                </pattern>
                            </defs>

                            {/* Blueprint Grid */}
                            <rect width="200" height="200" fill="url(#grid-pattern)" opacity="0.3" />

                            <motion.g
                                initial={{ opacity: 0, pathLength: 0 }}
                                animate={{ opacity: 1, pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            >
                                {/* Isometric Building Shape */}
                                <path
                                    d="M100 40 L160 70 L160 140 L100 170 L40 140 L40 70 Z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <path d="M100 40 L100 170" stroke="currentColor" strokeWidth="1" />
                                <path d="M100 100 L160 70" stroke="currentColor" strokeWidth="1" />
                                <path d="M100 100 L40 70" stroke="currentColor" strokeWidth="1" />

                                {/* Pulse Dots */}
                                <circle cx="100" cy="40" r="3" fill="currentColor">
                                    <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="40" cy="70" r="3" fill="currentColor">
                                    <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" begin="0.5s" />
                                </circle>
                                <circle cx="160" cy="70" r="3" fill="currentColor">
                                    <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" begin="1s" />
                                </circle>
                            </motion.g>
                        </motion.svg>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 pb-24">
                {projects.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">Coming soon. We are currently updating our portfolio.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => {
                            const images = JSON.parse(project.images || "[]");
                            return (
                                <AnimatedProjectCard
                                    key={project.id}
                                    id={project.id}
                                    slug={project.slug}
                                    title={project.title}
                                    description={project.description}
                                    category={project.category || "Project"}
                                    image={images.length > 0 ? images[0] : undefined}
                                    index={index}
                                />
                            );
                        })}
                    </div>
                )}
            </div>

            <CTASection title="Have a Project in Mind?" description="Let's discuss how we can help you achieve your sustainability goals." />
        </div>
    );
}
