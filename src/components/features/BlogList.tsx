"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    content: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export function BlogList({ posts }: { posts: BlogPost[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
        return Array.from(tags).sort();
    }, [posts]);

    const filteredPosts = posts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
        return matchesSearch && matchesTag;
    });

    return (
        <div>
            {/* Controls */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center"
            >
                <div className="relative w-full md:max-w-xs">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-md border border-gray-200 bg-white py-2 pl-10 text-gray-900 placeholder:text-gray-400 focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all sm:text-sm sm:leading-6"
                        placeholder="Search insights..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap gap-2 justify-center"
                >
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${selectedTag === null
                            ? "bg-lime text-forest shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        All
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${selectedTag === tag
                                ? "bg-lime text-forest shadow-sm"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </motion.div>
            </motion.div>

            {/* Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode="wait">
                    {filteredPosts.map((post) => (
                        <motion.div
                            key={post.slug}
                            variants={itemVariants}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link
                                href={`/insights/${post.slug}`}
                                className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-100/50 hover:border-lime/40 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full"
                            >
                                <div className="flex flex-1 flex-col justify-between p-6 relative">
                                    {/* Decorative background element */}
                                    <motion.div
                                        className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-lime/5 blur-2xl group-hover:bg-lime/10 transition-colors duration-300"
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            opacity: [0.3, 0.5, 0.3],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />

                                    <div className="flex-1 relative z-10">
                                        <motion.p
                                            className="text-sm font-medium text-lime mb-3"
                                            whileHover={{ x: 2 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {post.tags.slice(0, 3).join(", ")}
                                        </motion.p>
                                        <div className="mt-2 block">
                                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-lime transition-colors duration-300 font-sans mb-3">
                                                {post.title}
                                            </h3>
                                            <p className="mt-3 text-base text-gray-500 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between relative z-10 pt-4 border-t border-gray-100 group-hover:border-lime/30 transition-colors duration-300">
                                        <div className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                                            <time dateTime={post.date}>{post.date}</time>
                                        </div>
                                        <motion.div
                                            className="flex items-center gap-1 text-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            whileHover={{ x: 4 }}
                                        >
                                            <span className="text-sm font-medium">Read more</span>
                                            <ArrowRightIcon className="h-4 w-4" />
                                        </motion.div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {filteredPosts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-full text-center py-12 text-gray-500"
                    >
                        <p className="text-lg">No insights found matching your criteria.</p>
                        <p className="text-sm mt-2 text-gray-400">Try adjusting your search or filters.</p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
