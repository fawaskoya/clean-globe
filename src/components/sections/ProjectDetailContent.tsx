"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowLongRightIcon, CheckCircleIcon, CalendarDaysIcon, FolderIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { AnimatedProjectCard } from "@/components/ui/AnimatedProjectCard"; // Re-using if useful, or just standard divs

interface ProjectDetailContentProps {
    project: {
        id: string;
        slug: string;
        title: string;
        description: string;
        content: string | null;
        category: string | null;
        images: string[];
        createdAt: Date;
    };
}

// Project-specific animated illustrations (Blueprint style)
const ProjectIllustration = () => {
    return (
        <motion.svg
            viewBox="0 0 200 200"
            className="w-full max-w-md text-lime opacity-80"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
        >
            <defs>
                <pattern id="grid-pattern-detail" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
                </pattern>
            </defs>

            {/* Blueprint Grid */}
            <rect width="200" height="200" fill="url(#grid-pattern-detail)" opacity="0.3" />

            <motion.g
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            >
                {/* Isometric Building Shape - Slightly different from list view */}
                <path
                    d="M100 30 L170 60 L170 150 L100 180 L30 150 L30 60 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path d="M100 30 L100 180" stroke="currentColor" strokeWidth="1" />
                <path d="M100 105 L170 60" stroke="currentColor" strokeWidth="1" />
                <path d="M100 105 L30 60" stroke="currentColor" strokeWidth="1" />

                {/* Internal details */}
                <path d="M65 80 L65 130" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                <path d="M135 80 L135 130" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />

                {/* Pulse Dots */}
                <circle cx="100" cy="30" r="3" fill="currentColor">
                    <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="30" cy="60" r="3" fill="currentColor">
                    <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" begin="1s" />
                </circle>
                <circle cx="170" cy="60" r="3" fill="currentColor">
                    <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" begin="2s" />
                </circle>
            </motion.g>
        </motion.svg>
    );
};

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
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
                                <Link href="/projects" className="text-lime hover:text-white mb-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors group">
                                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Projects
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                {project.category && (
                                    <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-lime rounded-full text-sm font-medium mb-6">
                                        {project.category}
                                    </span>
                                )}
                                <h1 className="text-4xl font-bold tracking-tight text-white font-serif sm:text-5xl mb-6">
                                    {project.title}
                                </h1>
                                <p className="text-lg text-cream/80 leading-relaxed max-w-xl">
                                    {project.description}
                                </p>
                            </motion.div>
                        </div>

                        {/* Right: Animated Illustration */}
                        <div className="lg:w-1/2 flex justify-center">
                            <ProjectIllustration />
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Content Area */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Image Gallery - Primary Image */}
                        {project.images.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative rounded-3xl overflow-hidden shadow-xl aspect-video"
                            >
                                <Image
                                    src={project.images[0]}
                                    alt={project.title}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </motion.div>
                        )}

                        {/* Project Narrative */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-gray-100/50"
                        >
                            <h2 className="text-2xl font-bold text-forest font-serif mb-6">About the Project</h2>
                            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {project.content || project.description}
                            </div>
                        </motion.div>

                        {/* Secondary Images Grid */}
                        {project.images.length > 1 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {project.images.slice(1).map((img, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3]"
                                    >
                                        <Image
                                            src={img}
                                            alt={`${project.title} gallery image ${idx + 2}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="sticky top-28 space-y-8"
                        >
                            {/* Project Info Card */}
                            <div className="bg-cream/50 rounded-3xl p-8 border border-gray-100">
                                <h3 className="text-lg font-bold text-forest font-serif mb-6">Project Details</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white p-2 rounded-lg shadow-sm text-lime">
                                            <FolderIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Category</p>
                                            <p className="font-medium text-forest">{project.category || "General"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white p-2 rounded-lg shadow-sm text-lime">
                                            <CalendarDaysIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Date Added</p>
                                            <p className="font-medium text-forest">
                                                {new Date(project.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Card */}
                            <div className="relative rounded-3xl bg-forest p-8 shadow-xl overflow-hidden group">
                                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-lime/10 blur-2xl group-hover:bg-lime/20 transition-colors duration-500" />
                                <div className="relative">
                                    <h3 className="text-lg font-bold leading-7 text-white font-serif">Have a similar challenge?</h3>
                                    <p className="mt-4 text-sm leading-6 text-cream/80">
                                        See how our expertise can help you achieve similar results.
                                    </p>
                                    <Button asChild className="w-full mt-8 bg-lime hover:bg-white text-forest hover:text-forest transition-all duration-300" size="lg">
                                        <Link href="/contact">Contact Us</Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
