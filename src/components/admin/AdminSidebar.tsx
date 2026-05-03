"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  BriefcaseIcon,
  FolderIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  UsersIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
  { name: "Services", href: "/admin/services", icon: BriefcaseIcon },
  { name: "Projects", href: "/admin/projects", icon: FolderIcon },
  { name: "Blog", href: "/admin/blog", icon: DocumentTextIcon },
  { name: "Testimonials", href: "/admin/testimonials", icon: ChatBubbleLeftRightIcon },
  { name: "Advisory Board", href: "/admin/advisory-board", icon: UserGroupIcon },
  { name: "Contact Enquiries", href: "/admin/contacts", icon: EnvelopeIcon },
  { name: "Users", href: "/admin/users", icon: UsersIcon },
  { name: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-full">
      <div className="flex h-20 items-center gap-3 px-6 border-b border-gray-200">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime/10 text-lime">
          <BriefcaseIcon className="h-6 w-6" />
        </div>
        <span className="text-lg font-bold text-forest font-serif">Admin Panel</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-lime/10 text-lime border border-lime/20"
                  : "text-gray-700 hover:bg-gray-50 hover:text-forest"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

