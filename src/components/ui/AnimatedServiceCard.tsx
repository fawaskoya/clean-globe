"use client";

import { motion } from "framer-motion";
import { ServiceCard } from "./ServiceCard";

interface AnimatedServiceCardProps {
  slug: string;
  title: string;
  description: string;
  index: number;
}

export function AnimatedServiceCard({ slug, title, description, index }: AnimatedServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <ServiceCard
        slug={slug}
        title={title}
        description={description}
        compact={false}
      />
    </motion.div>
  );
}

