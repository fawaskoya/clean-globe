"use client";

import Link from "next/link";
import { CTASection } from "@/components/sections/CTASection";
import { BlogList } from "@/components/features/BlogList";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { BlogPost } from "@/lib/posts";

interface InsightsContentProps {
    posts: BlogPost[];
}

export function InsightsContent({ posts }: InsightsContentProps) {
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
                                <span className="text-sm font-medium text-lime">Latest News</span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-4xl font-bold tracking-tight text-lime font-serif sm:text-6xl"
                            >
                                Insights
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mt-6 text-lg leading-8 text-cream/80"
                            >
                                Expert perspectives on the evolving landscape of corporate sustainability.
                            </motion.p>
                        </div>

                        {/* Creative Vector Illustration - Growth Trends */}
                        <div className="lg:w-1/2 flex justify-center">
                            <motion.svg
                                viewBox="0 0 200 200"
                                className="w-full max-w-md text-lime opacity-80"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <defs>
                                    <linearGradient id="chart-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                                        <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
                                    </linearGradient>
                                </defs>
                                <motion.g
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                >
                                    {/* Bar Chart Bars - Animated from bottom using SVG animate */}
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

                                    {/* Floating Points */}
                                    <motion.circle
                                        cx="150"
                                        cy="40"
                                        r="4"
                                        fill="currentColor"
                                        animate={{
                                            r: [3, 5, 3],
                                            opacity: [0.7, 1, 0.7],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                </motion.g>
                            </motion.svg>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 pb-14">
                    <BlogList posts={posts} />
                </div>
            </div>

            <CTASection title="Stay Updated" description="Follow our insights to stay ahead of regulatory changes and market trends." />
        </>
    );
}
