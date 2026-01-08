import { MagnifyingGlassIcon, ChartBarIcon, DocumentTextIcon, RocketLaunchIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const steps = [
    {
        name: 'Discovery',
        description: 'Understanding your baseline and stakeholder requirements.',
        icon: MagnifyingGlassIcon
    },
    {
        name: 'Assessment',
        description: 'Gap analysis and benchmarking against standards.',
        icon: ChartBarIcon
    },
    {
        name: 'Strategy',
        description: 'Tailored frameworks, policies, and action plans.',
        icon: DocumentTextIcon
    },
    {
        name: 'Delivery',
        description: 'Execution support and disclosure to stakeholders.',
        icon: RocketLaunchIcon
    },
];

export function ProcessSteps() {
    return (
        <section className="bg-olive py-24 sm:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section Header - Top */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 pb-12 border-b border-white/10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:max-w-xl text-center lg:text-left"
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-lime font-sans sm:text-4xl brightness-110">
                            How We Work
                        </h2>
                        <p className="mt-4 text-cream/80 text-lg leading-8">
                            A clear, phased process ensuring every initiative is measurable and aligned with your goals.
                        </p>
                    </motion.div>
                    {/* Animated Sustainability Graphic */}
                    <div className="flex-shrink-0 relative w-48 h-48 lg:w-60 lg:h-60 flex items-center justify-center">
                        {/* Circle Background */}
                        <motion.svg
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 w-full h-full text-lime/5" viewBox="0 0 100 100" fill="currentColor"
                        >
                            <circle cx="50" cy="50" r="48" />
                        </motion.svg>

                        {/* Wind Turbine - Animated */}
                        <motion.svg
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="relative z-10 w-32 h-32 lg:w-44 lg:h-44 text-lime" viewBox="0 0 100 100" fill="currentColor" fillOpacity="0.8"
                        >
                            <circle cx="50" cy="50" r="5" />
                            <path d="M50 45 L54 5 L46 5 Z" />
                            <path d="M50 45 L54 5 L46 5 Z" transform="rotate(120 50 50)" />
                            <path d="M50 45 L54 5 L46 5 Z" transform="rotate(240 50 50)" />
                        </motion.svg>
                    </div>
                </div>

                {/* Horizontal Flow Diagram */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4"
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.name}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                            className="relative group h-full"
                        >
                            {/* Arrow connector (between cards) */}
                            {index < steps.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + (index * 0.2), duration: 0.5 }}
                                    className="hidden lg:flex absolute -right-4 top-1/2 transform -translate-y-1/2 z-20"
                                >
                                    <ArrowLongRightIcon className="w-8 h-8 text-lime/50" />
                                </motion.div>
                            )}

                            {/* Card */}
                            <motion.div
                                whileHover={{ y: -5, borderColor: "rgba(158, 191, 35, 0.6)" }}
                                className="h-full bg-forest/50 border border-lime/20 rounded-2xl p-6 transition-colors duration-300"
                            >
                                {/* Step number badge */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center group-hover:bg-lime/20 transition-colors">
                                        <step.icon className="w-5 h-5 text-lime" />
                                    </div>
                                    <span className="text-lime brightness-110 text-xs font-bold uppercase tracking-widest">Step {index + 1}</span>
                                </div>

                                <h3 className="text-xl font-bold font-sans text-lime brightness-110 mb-2">
                                    {step.name}
                                </h3>
                                <p className="text-cream/90 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
