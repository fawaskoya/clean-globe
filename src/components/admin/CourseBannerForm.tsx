"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export interface CourseBannerFormValues {
  providerName: string;
  providerTagline: string;
  logoUrl: string;
  badge: string;
  badgeNote: string;
  headline: string;
  subheadline: string;
  description: string;
  coursesIntro: string;
  coursesText: string; // one course per line
  footerText: string;
  ctaLabel: string;
  ctaHref: string;
  displayOrder: number;
  published: boolean;
}

export const EMPTY_COURSE_BANNER: CourseBannerFormValues = {
  providerName: "",
  providerTagline: "",
  logoUrl: "",
  badge: "",
  badgeNote: "",
  headline: "",
  subheadline: "",
  description: "",
  coursesIntro: "Courses we are offering",
  coursesText: "",
  footerText: "",
  ctaLabel: "Enroll Now",
  ctaHref: "",
  displayOrder: 0,
  published: true,
};

const input =
  "w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20";
const label = "block text-sm font-semibold text-forest mb-2";
const hint = "text-xs text-gray-500 mt-1";

export function CourseBannerForm({
  id,
  initial,
}: {
  id?: string;
  initial: CourseBannerFormValues;
}) {
  const router = useRouter();
  const [values, setValues] = useState<CourseBannerFormValues>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof CourseBannerFormValues>(key: K, value: CourseBannerFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { coursesText, ...rest } = values;
      const res = await fetch(id ? `/api/admin/courses/${id}` : "/api/admin/courses", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...rest,
          courses: coursesText.split("\n").map((c) => c.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg = Array.isArray(body.error)
          ? body.error.map((i: any) => `${i.path?.join(".")}: ${i.message}`).join("; ")
          : body.error;
        throw new Error(msg || "Failed to save");
      }
      router.push("/admin/courses");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    if (!id || !confirm("Delete this banner? This cannot be undone.")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      router.push("/admin/courses");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-3xl shadow-md border border-gray-100/50 p-8 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={label}>Provider name</label>
          <input className={input} value={values.providerName} onChange={(e) => set("providerName", e.target.value)} placeholder="ISEP" />
        </div>
        <div>
          <label className={label}>Provider tagline</label>
          <input className={input} value={values.providerTagline} onChange={(e) => set("providerTagline", e.target.value)} placeholder="Institute of Sustainability & Environmental Professionals" />
        </div>
      </div>

      <div>
        <label className={label}>Provider logo (image URL or /path)</label>
        <input className={input} value={values.logoUrl} onChange={(e) => set("logoUrl", e.target.value)} placeholder="/isep-logo.png or https://..." />
        <p className={hint}>Shown on the left of the banner. Leave blank to show the provider name as text.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={label}>Badge</label>
          <input className={input} value={values.badge} onChange={(e) => set("badge", e.target.value)} placeholder="Certified Courses" />
        </div>
        <div>
          <label className={label}>Start date / note</label>
          <input className={input} value={values.badgeNote} onChange={(e) => set("badgeNote", e.target.value)} placeholder="Commencing December 2026" />
        </div>
      </div>

      <div>
        <label className={label}>Headline *</label>
        <input required className={input} value={values.headline} onChange={(e) => set("headline", e.target.value)} placeholder="Empower your people." />
      </div>
      <div>
        <label className={label}>Sub-headline</label>
        <input className={input} value={values.subheadline} onChange={(e) => set("subheadline", e.target.value)} placeholder="Build a sustainable future." />
      </div>
      <div>
        <label className={label}>Description</label>
        <textarea rows={3} className={input} value={values.description} onChange={(e) => set("description", e.target.value)} placeholder="Clean Globe Consultancy is proud to be an ISEP Course provider..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={label}>Courses list heading</label>
          <input className={input} value={values.coursesIntro} onChange={(e) => set("coursesIntro", e.target.value)} />
        </div>
        <div />
      </div>
      <div>
        <label className={label}>Courses (one per line)</label>
        <textarea rows={6} className={input} value={values.coursesText} onChange={(e) => set("coursesText", e.target.value)} placeholder={"Environmental Sustainability Skills for the Workforce\nIntroduction to Net-Zero"} />
        <p className={hint}>Each course becomes a button that opens the contact form with that course pre-selected, so enquiries arrive under Contact Enquiries.</p>
      </div>

      <div>
        <label className={label}>Footer text</label>
        <input className={input} value={values.footerText} onChange={(e) => set("footerText", e.target.value)} placeholder="Take the next step towards a more sustainable future." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className={label}>Button label</label>
          <input className={input} value={values.ctaLabel} onChange={(e) => set("ctaLabel", e.target.value)} />
        </div>
        <div>
          <label className={label}>Button link (optional)</label>
          <input className={input} value={values.ctaHref} onChange={(e) => set("ctaHref", e.target.value)} placeholder="/contact?course=..." />
          <p className={hint}>Blank = open the contact form for this provider.</p>
        </div>
        <div>
          <label className={label}>Display order</label>
          <input type="number" className={input} value={values.displayOrder} onChange={(e) => set("displayOrder", Number(e.target.value) || 0)} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input id="published" type="checkbox" checked={values.published} onChange={(e) => set("published", e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-lime focus:ring-lime" />
        <label htmlFor="published" className="text-sm font-medium text-forest">Published (visible on the home page)</label>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading} className="bg-lime hover:bg-lime/90 text-forest">
          {loading ? "Saving..." : id ? "Save Changes" : "Add Banner"}
        </Button>
        {id && (
          <Button type="button" variant="outline" onClick={remove} disabled={loading} className="text-red-600 border-red-200 hover:bg-red-50">
            Delete
          </Button>
        )}
        <Link href="/admin/courses">
          <Button type="button" variant="outline">Cancel</Button>
        </Link>
      </div>
    </form>
  );
}
