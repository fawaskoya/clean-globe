"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

interface AnimatedProjectCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  category?: string | null;
  image?: string;
  index: number;
}

export function AnimatedProjectCard({
  id,
  slug,
  title,
  description,
  category,
  image,
  index,
}: AnimatedProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link href={`/projects/${slug}`}>
        <div className="bg-white rounded-3xl shadow-md border border-gray-100/50 hover:border-lime/40 overflow-hidden transition-all duration-300 h-full flex flex-col">
          {image && (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-6 flex-1 flex flex-col">
            {category && (
              <span className="text-xs font-medium text-lime mb-2 uppercase tracking-wider">
                {category}
              </span>
            )}
            <h3 className="text-xl font-bold text-forest font-serif mb-2 group-hover:text-lime transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-sm flex-1 line-clamp-3">
              {description}
            </p>
            <div className="mt-4 flex items-center text-lime text-sm font-medium group-hover:gap-2 transition-all">
              Learn More
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

