"use client";

import Link from "next/link";
import { ArrowLongRightIcon, ChartBarIcon, GlobeAltIcon, BoltIcon, SunIcon, BuildingOffice2Icon, CheckCircleIcon, ComputerDesktopIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "esg-advisory": ChartBarIcon,
    "sustainability-advisory": GlobeAltIcon,
    "energy-advisory": BoltIcon,
    "climate-change-advisory": SunIcon,
    "net-zero-advisory": BuildingOffice2Icon,
    "sustainability-technology": ComputerDesktopIcon,
    "sustainability-training": AcademicCapIcon,
};

interface ServiceCardProps {
    title: string;
    description: string;
    slug: string;
    deliverables?: string[];
    compact?: boolean;
}

export function ServiceCard({ title, description, slug, deliverables, compact = false }: ServiceCardProps) {
    const Icon = iconMap[slug] || GlobeAltIcon;

    return (
        <Link href={`/services/${slug}`} className="block h-full">
            <motion.div
                whileHover={{ y: -10, boxShadow: "0 25px 30px -5px rgb(0 0 0 / 0.15), 0 10px 10px -5px rgb(0 0 0 / 0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`group relative flex flex-col h-full rounded-3xl bg-white shadow-md border border-gray-100/50 hover:border-lime/40 overflow-hidden transition-colors duration-300 ${compact ? 'p-5' : 'p-8'}`}
            >
                {/* Decorative Background Element */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        rotate: [0, 90, 0]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className={`absolute -right-12 -top-12 rounded-full bg-lime/5 blur-3xl group-hover:bg-lime/10 ${compact ? 'h-32 w-32' : 'h-40 w-40'}`}
                />

                <div className="flex-1 relative z-10 flex flex-col">
                    {/* Icon Header */}
                    <div className={`flex items-center gap-3 ${compact ? 'mb-4' : 'mb-6'}`}>
                        <div className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-lime/10 to-transparent text-lime group-hover:from-lime group-hover:to-lime/80 group-hover:text-forest transition-all duration-300 shadow-sm shrink-0 ${compact ? 'w-12 h-12' : 'w-14 h-14'}`}>
                            <Icon className={compact ? 'h-6 w-6' : 'h-7 w-7'} />
                        </div>
                        <h3 className={`font-bold font-serif text-forest group-hover:text-lime transition-colors duration-300 leading-tight ${compact ? 'text-xl' : 'text-2xl'}`}>
                            {title}
                        </h3>
                    </div>

                    <p className={`leading-relaxed text-gray-600 ${compact ? 'text-base mb-4 pb-4' : 'text-base mb-8 pb-6 min-h-[5rem] border-b border-gray-100'}`}>
                        {description}
                    </p>

                    {deliverables && deliverables.length > 0 && (
                        <ul className={`${compact ? 'mb-4 space-y-2' : 'mb-8 space-y-3'} flex-1 ${!compact ? 'border-b border-gray-100 pb-6' : ''}`}>
                            {deliverables.slice(0, 4).map((item, idx) => (
                                <li key={idx} className={`flex items-start gap-3 text-gray-600 group-hover:text-gray-900 transition-colors ${compact ? 'text-xs' : 'text-sm'}`}>
                                    <CheckCircleIcon className={`text-lime shrink-0 mt-0.5 ${compact ? 'h-4 w-4' : 'h-5 w-5'}`} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className={`mt-auto relative z-10 flex items-center justify-between font-bold text-lime group-hover:text-forest transition-colors ${compact ? 'pt-4 text-sm' : `pt-6 text-sm ${!deliverables || deliverables.length === 0 ? 'border-t border-gray-100' : ''}`}`}>
                    <span>Explore Service</span>
                    <div className={`rounded-full bg-lime/10 flex items-center justify-center group-hover:bg-lime group-hover:text-white transition-all duration-300 ${compact ? 'h-7 w-7' : 'h-8 w-8'}`}>
                        <ArrowLongRightIcon className={compact ? 'h-4 w-4' : 'h-4 w-4'} />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
