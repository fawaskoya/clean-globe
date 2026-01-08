"use client";

import { ContactForm } from "@/components/features/ContactForm";
import { COMPANY_INFO } from "@/lib/constants";
import { EnvelopeIcon, PhoneIcon, MapPinIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export function ContactContent() {
    return (
        <div className="bg-white isolate">
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
                            <span className="text-sm font-medium text-lime">Get in Touch</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl font-bold tracking-tight text-lime font-serif sm:text-6xl"
                        >
                            Contact Us
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-6 text-lg leading-8 text-cream/80"
                        >
                            Ready to start your sustainability journey? We are here to help you achieve your goals.
                        </motion.p>
                    </div>

                    {/* Creative Vector Illustration - Communication Map */}
                    <div className="lg:w-1/2 flex justify-center">
                        <motion.svg
                            viewBox="0 0 200 200"
                            className="w-full max-w-md text-lime opacity-80"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <motion.g
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {/* Abstract Map/Path */}
                                <path d="M40 100 Q 100 40 160 100 T 100 160" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />

                                {/* Location Pin */}
                                <g transform="translate(100, 100)">
                                    <path d="M-15 -25 C-15 -40 15 -40 15 -25 C15 -10 0 10 0 10 C0 10 -15 -10 -15 -25" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
                                    <circle cx="0" cy="-25" r="5" fill="currentColor" />
                                    <animateTransform attributeName="transform" type="translate" values="100,95; 100,105; 100,95" dur="3s" repeatCount="indefinite" />
                                </g>

                                {/* Signal Circles */}
                                <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3">
                                    <animate attributeName="r" values="30;40;30" dur="3s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2">
                                    <animate attributeName="r" values="50;60;50" dur="3s" repeatCount="indefinite" begin="0.5s" />
                                    <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" begin="0.5s" />
                                </circle>
                            </motion.g>
                        </motion.svg>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 pb-14 grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >


                    <div className="space-y-8">
                        <div className="flex gap-x-4 group">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime/10 group-hover:bg-lime transition-colors duration-300">
                                <MapPinIcon className="h-6 w-6 text-lime group-hover:text-forest transition-colors duration-300" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold leading-7 text-forest">Our Office</h3>
                                <p className="mt-2 leading-7 text-gray-600 max-w-xs">{COMPANY_INFO.address}</p>
                            </div>
                        </div>

                        <div className="flex gap-x-4 group">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime/10 group-hover:bg-lime transition-colors duration-300">
                                <PhoneIcon className="h-6 w-6 text-lime group-hover:text-forest transition-colors duration-300" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold leading-7 text-forest">Phone</h3>
                                <p className="mt-2 leading-7 text-gray-600">
                                    {COMPANY_INFO.phone.map(p => <span key={p} className="block">{p}</span>)}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-x-4 group">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime/10 group-hover:bg-lime transition-colors duration-300">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-lime group-hover:text-forest transition-colors duration-300">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-base font-semibold leading-7 text-forest">WhatsApp</h3>
                                <div className="mt-2 leading-7 text-gray-600">
                                    {COMPANY_INFO.phone.map((phone) => (
                                        <a
                                            key={phone}
                                            href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-lime transition-colors block font-medium"
                                        >
                                            {phone}
                                        </a>
                                    ))}
                                    <span className="text-xs text-lime font-medium mt-1 block">Click to chat</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-x-4 group">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime/10 group-hover:bg-lime transition-colors duration-300">
                                <EnvelopeIcon className="h-6 w-6 text-lime group-hover:text-forest transition-colors duration-300" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold leading-7 text-forest">Email</h3>
                                <p className="mt-2 leading-7 text-gray-600">
                                    <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-lime transition-colors">{COMPANY_INFO.email}</a>
                                </p>

                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <ContactForm />
                </motion.div>

            </div>
        </div>
    );
}
