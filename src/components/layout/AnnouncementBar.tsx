"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { ANNOUNCE_HEIGHT } from "@/lib/training";

const STORAGE_KEY = "cgc-ticker-dismissed";

function setOffset(px: string) {
  document.documentElement.style.setProperty("--announce-h", px);
}

/**
 * Slim scrolling ticker fixed above the header. Text items are separated by
 * " | " in Admin > Settings. Pauses on hover, static for reduced-motion users,
 * dismissible (remembered per browser until the text changes).
 */
export function AnnouncementBar({ text, link }: { text: string; link: string | null }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(STORAGE_KEY) === text;
    } catch {}
    if (dismissed || isAdmin) {
      setHidden(true);
      setOffset("0px");
    } else {
      setHidden(false);
      setOffset(ANNOUNCE_HEIGHT);
    }
  }, [text, isAdmin]);

  if (hidden || isAdmin) return null;

  const items = text.split("|").map((s) => s.trim()).filter(Boolean);
  const run = (key: string, ariaHidden = false) => (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined} key={key}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center whitespace-nowrap px-6">
          <span className="mr-3 text-[#BDD631]">✦</span>
          {item}
        </span>
      ))}
    </div>
  );

  const track = (
    <div className="ticker-track flex w-max">
      {run("a")}
      {run("b", true)}
      {run("c", true)}
      {run("d", true)}
    </div>
  );

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, text);
    } catch {}
    setHidden(true);
    setOffset("0px");
  };

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="ticker fixed inset-x-0 top-0 z-[60] flex items-center bg-navy text-white text-sm font-semibold tracking-wide border-b border-[#BDD631]/40"
      style={{ height: ANNOUNCE_HEIGHT }}
    >
      <span className="relative z-10 hidden sm:flex h-full shrink-0 items-center bg-[#BDD631] px-4 text-xs font-extrabold uppercase tracking-widest text-navy">
        New
      </span>
      {link ? (
        <Link href={link} className="ticker-viewport relative h-full flex-1 overflow-hidden flex items-center hover:text-[#BDD631]">
          {track}
        </Link>
      ) : (
        <div className="ticker-viewport relative h-full flex-1 overflow-hidden flex items-center">{track}</div>
      )}
      {link && (
        <Link
          href={link}
          className="relative z-10 hidden md:flex h-full shrink-0 items-center px-4 text-xs font-bold uppercase tracking-wider text-[#BDD631] hover:text-white"
        >
          Enquire now →
        </Link>
      )}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="relative z-10 flex h-full shrink-0 items-center px-3 text-white/70 hover:text-white"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
