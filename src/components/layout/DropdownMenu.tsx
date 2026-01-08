"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/navigation";

interface DropdownMenuProps {
  item: NavLink;
  isActive: boolean;
  hoveredLink: string | null;
  onHover: (href: string | null) => void;
}

export function DropdownMenu({ item, isActive, hoveredLink, onHover }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
    onHover(item.href);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      onHover(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!item.children || item.children.length === 0) {
    return null;
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className={cn(
          "relative group px-2 py-2 flex items-center gap-1",
          isActive ? "text-lime" : "text-forest group-hover:text-lime"
        )}
      >
        <span className="text-base font-semibold leading-6 transition-colors duration-300">
          {item.name}
        </span>
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            isOpen ? "rotate-180" : ""
          )}
        />
        {isActive && (
          <motion.span
            className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 bg-lime rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ x: "-50%" }}
          />
        )}
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-gray-100/50 py-2 z-50"
          >
            {item.children.map((child, index) => (
              <div key={child.href}>
                {child.children && child.children.length > 0 ? (
                  <NestedDropdown child={child} index={index} />
                ) : (
                  <Link
                    href={child.href}
                    className="block px-4 py-2 text-sm text-forest hover:bg-lime/10 hover:text-lime transition-colors"
                  >
                    {child.name}
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NestedDropdown({ child, index }: { child: NavLink; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center justify-between px-4 py-2 text-sm text-forest hover:bg-lime/10 transition-colors">
        <span className="font-semibold">{child.name}</span>
        <ChevronDownIcon className="h-3 w-3 rotate-[-90deg]" />
      </div>
      <AnimatePresence>
        {isOpen && child.children && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-full top-0 ml-2 w-56 rounded-xl bg-white shadow-lg border border-gray-100/50 py-2 z-50"
          >
            {child.children.map((subChild) => (
              <Link
                key={subChild.href}
                href={subChild.href}
                className="block px-4 py-2 text-sm text-forest hover:bg-lime/10 hover:text-lime transition-colors"
              >
                {subChild.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

