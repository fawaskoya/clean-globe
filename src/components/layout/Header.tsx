"use client";

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { COMPANY_INFO } from "@/lib/constants";
import { NAV_LINKS, type NavLink } from "@/lib/navigation";
import { DropdownMenu } from "./DropdownMenu";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [navLinks, setNavLinks] = useState<NavLink[]>(NAV_LINKS);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fetch live services and rebuild the Services dropdown from the DB.
    // If the DB has no published services, keep the static NAV_LINKS
    // fallback so the dropdown is never empty.
    useEffect(() => {
        fetch("/api/public/services")
            .then(async (r) => {
                if (!r.ok) throw new Error("services fetch failed");
                return r.json();
            })
            .then((services: Array<{ name: string; slug: string }>) => {
                if (!Array.isArray(services) || services.length === 0) return;
                setNavLinks((prev) =>
                    prev.map((link) =>
                        link.href === "/services"
                            ? {
                                  ...link,
                                  children: services.map((s) => ({
                                      name: s.name,
                                      href: `/services/${s.slug}`,
                                  })),
                              }
                            : link
                    )
                );
            })
            .catch(() => {});
    }, []);

    const isActive = (href: string) => {
        return pathname === href || pathname?.startsWith(href + "/");
    };

    // Hide Header on Admin pages
    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-1.5" : "bg-white/80 backdrop-blur-sm py-2.5"
            )}
        >
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
                aria-label="Global"
            >
                {/* Logo - Enhanced and Bigger */}
                <div className="flex lg:flex-1">
                    <Link
                        href="/"
                        className="group relative -m-1.5 p-1.5"
                        onMouseEnter={() => setHoveredLink("logo")}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        <span className="sr-only">{COMPANY_INFO.name}</span>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            className="relative"
                        >
                            <Image
                                src="/logo.png"
                                alt={COMPANY_INFO.name}
                                width={500}
                                height={120}
                                className={cn(
                                    "w-auto object-contain transition-all duration-300",
                                    scrolled ? "h-16 lg:h-20" : "h-20 lg:h-24",
                                    hoveredLink === "logo" && "brightness-110 drop-shadow-lg"
                                )}
                                style={{
                                    filter: hoveredLink === "logo"
                                        ? "contrast(1.2) saturate(1.2) drop-shadow(0 4px 12px rgba(65, 151, 69, 0.3))"
                                        : "contrast(1.15) saturate(1.1)"
                                }}
                                priority
                            />
                            {/* Glow effect on hover */}
                            <motion.div
                                className="absolute inset-0 rounded-lg bg-lime/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={false}
                                animate={{ opacity: hoveredLink === "logo" ? 0.3 : 0 }}
                            />
                        </motion.div>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex lg:hidden">
                    <motion.button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 hover:bg-lime/10 transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </motion.button>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex lg:gap-x-8 xl:gap-x-12">
                    {navLinks.map((item, index) => {
                        const active = isActive(item.href);

                        // Check if any child is active
                        const hasActiveChild = item.children?.some(child =>
                            isActive(child.href) || child.children?.some(subChild => isActive(subChild.href))
                        );

                        if (item.children && item.children.length > 0) {
                            return (
                                <DropdownMenu
                                    key={item.name}
                                    item={item}
                                    isActive={active || !!hasActiveChild}
                                    hoveredLink={hoveredLink}
                                    onHover={setHoveredLink}
                                />
                            );
                        }

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative group px-2 py-2"
                                onMouseEnter={() => setHoveredLink(item.href)}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                <motion.span
                                    className={cn(
                                        "relative text-base font-semibold leading-6 transition-colors duration-300 block",
                                        active ? "text-lime" : "text-forest group-hover:text-lime"
                                    )}
                                    whileHover={{ y: -2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    {item.name}

                                    {/* Animated Underline */}
                                    <motion.span
                                        className={cn(
                                            "absolute bottom-0 left-0 h-0.5 bg-lime origin-left",
                                            active ? "w-full" : "w-0"
                                        )}
                                        initial={false}
                                        animate={{
                                            width: hoveredLink === item.href || active ? "100%" : "0%",
                                        }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    />

                                    {/* Hover background */}
                                    <motion.span
                                        className="absolute inset-0 rounded-lg bg-lime/5 -z-10"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: hoveredLink === item.href ? 1 : 0,
                                            scale: hoveredLink === item.href ? 1 : 0.8,
                                        }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </motion.span>

                                {/* Active indicator dot */}
                                {active && (
                                    <motion.span
                                        className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 bg-lime rounded-full"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        style={{ x: "-50%" }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* CTA Button */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <Button asChild className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <Link href="/contact">Book a Consultation</Link>
                        </Button>
                    </motion.div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <Dialog
                        as="div"
                        className="lg:hidden"
                        open={mobileMenuOpen}
                        onClose={setMobileMenuOpen}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <DialogPanel
                            as={motion.div}
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <Link
                                    href="/"
                                    className="-m-1.5 p-1.5"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">{COMPANY_INFO.name}</span>
                                    <Image
                                        src="/logo.png"
                                        alt={COMPANY_INFO.name}
                                        width={300}
                                        height={80}
                                        className="h-16 w-auto object-contain"
                                        priority
                                    />
                                </Link>
                                <motion.button
                                    type="button"
                                    className="-m-2.5 rounded-lg p-2.5 text-gray-700 hover:bg-lime/10 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                    whileHover={{ rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </motion.button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-200">
                                    <div className="space-y-1 py-6">
                                        {navLinks.map((item, index) => {
                                            const active = isActive(item.href);
                                            const hasActiveChild = item.children?.some(child =>
                                                isActive(child.href) || child.children?.some(subChild => isActive(subChild.href))
                                            );
                                            return (
                                                <motion.div
                                                    key={item.name}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <Link
                                                        href={item.href}
                                                        className={cn(
                                                            "-mx-3 flex items-center gap-3 rounded-lg px-3 py-3 text-base font-semibold leading-7 transition-all duration-200",
                                                            active || hasActiveChild
                                                                ? "bg-lime/10 text-lime"
                                                                : "text-forest hover:bg-lime/5 hover:text-lime"
                                                        )}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {(active || hasActiveChild) && (
                                                            <motion.span
                                                                className="w-2 h-2 rounded-full bg-lime"
                                                                layoutId="mobileActiveDot"
                                                            />
                                                        )}
                                                        <span>{item.name}</span>
                                                    </Link>
                                                    {item.children && item.children.length > 0 && (
                                                        <div className="ml-6 mt-1 space-y-1">
                                                            {item.children.map((child) => (
                                                                <Link
                                                                    key={child.href}
                                                                    href={child.href}
                                                                    className={cn(
                                                                        "block px-3 py-2 text-sm rounded-lg transition-all duration-200",
                                                                        isActive(child.href)
                                                                            ? "bg-lime/10 text-lime font-medium"
                                                                            : "text-gray-600 hover:bg-lime/5 hover:text-lime"
                                                                    )}
                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                >
                                                                    {child.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                    <div className="py-6">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                className="w-full shadow-lg"
                                                asChild
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <Link href="/contact">Book a Consultation</Link>
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </Dialog>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
