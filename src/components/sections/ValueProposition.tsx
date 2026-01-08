import { TrophyIcon, ShieldCheckIcon, WrenchScrewdriverIcon, ChartBarSquareIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const strengths = [
    { text: 'Credible: Data-driven, aligned with LEED, WELL, and GSAS', icon: ShieldCheckIcon },
    { text: 'Pragmatic: Solutions that work in the real world', icon: WrenchScrewdriverIcon },
    { text: 'Measurable: Focus on tangible outcomes and ROI', icon: ChartBarSquareIcon },
];

export function ValueProposition() {
    return (
        <motion.div
            whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-gray-100 overflow-hidden h-full flex flex-col justify-between group"
        >
            {/* Decorative Background */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-forest/5 blur-3xl opacity-50 group-hover:bg-lime/10 transition-colors duration-500" />

            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime/10 text-lime group-hover:bg-lime group-hover:text-forest transition-colors duration-300 shadow-sm">
                        <TrophyIcon className="h-7 w-7" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-forest group-hover:text-lime transition-colors duration-300 font-serif">Why CGC?</h2>
                </div>
                <p className="text-forest/80 text-lg leading-relaxed mb-8">A veteran-led firm combining engineering and governance expertise.</p>
                <ul className="space-y-4">
                    {strengths.map((item, idx) => (
                        <motion.li
                            key={item.text}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ x: 5, backgroundColor: "rgba(158, 191, 35, 0.1)" }}
                            className="flex gap-x-4 text-base font-medium text-forest/90 p-4 rounded-xl border border-transparent hover:border-lime/20 transition-all items-center bg-gray-50/50"
                        >
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white border border-gray-100 text-lime shadow-sm group-hover:border-lime/30 transition-colors">
                                <item.icon className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <span>{item.text}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

