"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MainContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    return (
        <main className={cn("flex-grow", isAdmin ? "pt-0" : "pt-24")}>
            {children}
        </main>
    );
}
