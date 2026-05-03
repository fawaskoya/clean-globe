"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY_INFO } from "@/lib/constants";
import { NAV_LINKS } from "@/lib/navigation";
import { GlobeAltIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function Footer() {
    const pathname = usePathname();

    // Hide Footer on Admin pages
    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return (
        <footer className="relative bg-gradient-to-b from-forest to-olive text-white overflow-hidden" aria-labelledby="footer-heading">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-forest/30 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-lime/5 blur-3xl" />
            </div>

            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32 relative z-10">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime/20">
                                <GlobeAltIcon className="h-6 w-6 text-lime" />
                            </div>
                            <span className="text-2xl font-bold font-sans text-white">
                                {COMPANY_INFO.name}
                            </span>
                        </div>
                        <p className="text-sm leading-6 text-gray-300 max-w-sm">
                            {COMPANY_INFO.tagline}. Enabling businesses, government, and communities to achieve climate targets.
                        </p>
                        {/* Social Icons - Hidden until real links are available */}
                        {/* <div className="flex gap-4">
                            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 hover:bg-primary/30 transition-colors" aria-label="LinkedIn">
                                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </a>
                            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 hover:bg-primary/30 transition-colors" aria-label="Twitter">
                                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                        </div> */}
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white flex items-center gap-2">
                                    <span className="h-1 w-4 bg-lime rounded-full" />
                                    Navigate
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {NAV_LINKS.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm leading-6 text-gray-300 hover:text-lime transition-colors"
                                            >
                                                {item.name}
                                            </Link>

                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white flex items-center gap-2">
                                    <span className="h-1 w-4 bg-lime rounded-full" />
                                    Legal
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link
                                            href="/privacy"
                                            className="text-sm leading-6 text-gray-300 hover:text-lime transition-colors"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/terms"
                                            className="text-sm leading-6 text-gray-300 hover:text-lime transition-colors"
                                        >
                                            Terms of Service
                                        </Link>
                                    </li>
                                </ul>

                                {/* Admin Portal link intentionally not exposed in the public footer.
                                    Staff bookmark /admin/login directly. */}
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-1 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white flex items-center gap-2">
                                    <span className="h-1 w-4 bg-lime rounded-full" />
                                    Contact Us
                                </h3>
                                <ul role="list" className="mt-6 space-y-4 text-sm leading-6 text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <MapPinIcon className="h-5 w-5 text-lime mt-0.5 flex-shrink-0" />
                                        <span>{COMPANY_INFO.address}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <PhoneIcon className="h-5 w-5 text-lime mt-0.5 flex-shrink-0" />
                                        <span>{COMPANY_INFO.phone.join(", ")}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-lime mt-0.5 flex-shrink-0">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        <div>
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
                                            <span className="text-xs text-gray-400 block mt-1">Click to chat on WhatsApp</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <EnvelopeIcon className="h-5 w-5 text-lime mt-0.5 flex-shrink-0" />
                                        <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-lime transition-colors">
                                            {COMPANY_INFO.email}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs leading-5 text-gray-400">
                        &copy; {new Date().getFullYear()} Clean Globe Consultancy. All rights reserved. Doha, Qatar.
                    </p>
                </div>
            </div>
        </footer>
    );
}

