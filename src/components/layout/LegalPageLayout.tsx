"use client";

import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

interface LegalPageLayoutProps {
    title: string;
    lastUpdated: string;
    children: React.ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
    return (
        <div className="bg-cream min-h-screen">
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
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                    >
                        <SparklesIcon className="h-5 w-5 text-lime" />
                        <span className="text-sm font-medium text-lime">Legal</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl font-bold tracking-tight text-lime font-serif sm:text-6xl"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-6 text-lg leading-8 text-cream/80"
                    >
                        Last Updated: {lastUpdated}
                    </motion.p>
                </div>
            </div>

            <div className="mx-auto max-w-3xl px-6 lg:px-8 py-24">
                <div className="prose prose-lg text-gray prose-headings:text-forest prose-strong:text-forest prose-a:text-lime hover:prose-a:text-forest">
                    {children}
                </div>
            </div>
        </div>
    );
}
