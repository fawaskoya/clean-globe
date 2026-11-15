"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export interface TrainingCourseFormValues {
  slug: string;
  title: string;
  programme: string;
  level: string;
  summary: string;
  duration: string;
  startDate: string;
  fee: string;
  topicsText: string;
  audienceText: string;
  assessment: string;
  entryRequirements: string;
  certification: string;
  note: string;
  brochureUrl: string;
  displayOrder: number;
  published: boolean;
}

export const EMPTY_TRAINING_COURSE: TrainingCourseFormValues = {
  slug: "",
  title: "",
  programme: "Net Zero Training Programme",
  level: "",
  summary: "",
  duration: "",
  startDate: "Commencing December 2026",
  fee: "",
  topicsText: "",
  audienceText: "",
  assessment: "",
  entryRequirements: "",
  certification: "ISEP Certificate provided",
  note: "",
  brochureUrl: "",
  displayOrder: 0,
  published: true,
};

const input =
  "w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20";
const label = "block text-sm font-semibold text-forest mb-2";
const hint = "text-xs text-gray-500 mt-1";

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export function TrainingCourseForm({ id, initial }: { id?: string; initial: TrainingCourseFormValues }) {
  const router = useRouter();
  const [v, setV] = useState<TrainingCourseFormValues>(initial);
  const [slugTouched, setSlugTouched] = useState(!!id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof TrainingCourseFormValues>(k: K, val: TrainingCourseFormValues[K]) =>
    setV((p) => ({ ...p, [k]: val }));

  const lines = (t: string) => t.split("\n").map((x) => x.trim()).filter(Boolean);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { topicsText, audienceText, ...rest } = v;
      const res = await fetch(id ? `/api/admin/training/${id}` : "/api/admin/training", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rest, topics: lines(topicsText), audience: lines(audienceText) }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg = Array.isArray(body.error)
          ? body.error.map((i: any) => `${i.path?.join(".")}: ${i.message}`).join("; ")
          : body.error;
        throw new Error(msg || "Failed to save");
      }
      router.push("/admin/training");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    if (!id || !confirm("Delete this course? This cannot be undone.")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/training/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      router.push("/admin/training");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-3xl shadow-md border border-gray-100/50 p-8 space-y-6">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={label}>Course title *</label>
          <input
            required
            className={input}
            value={v.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (!slugTouched) set("slug", slugify(e.target.value));
            }}
          />
        </div>
        <div>
          <label className={label}>URL slug *</label>
          <input
            required
            className={input}
            value={v.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set("slug", e.target.value);
            }}
          />
          <p className={hint}>Page address: /training/{v.slug || "…"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={label}>Programme *</label>
          <input
            required
            list="programmes"
            className={input}
            value={v.programme}
            onChange={(e) => set("programme", e.target.value)}
          />
          <datalist id="programmes">
            <option value="Net Zero Training Programme" />
            <option value="Environmental Sustainability Skills" />
          </datalist>
          <p className={hint}>Courses are grouped by programme on the Training page.</p>
        </div>
        <div>
          <label className={label}>Level</label>
          <input className={input} value={v.level} onChange={(e) => set("level", e.target.value)} placeholder="Foundation · ISEP Certified" />
        </div>
      </div>

      <div>
        <label className={label}>Summary *</label>
        <textarea required rows={3} className={input} value={v.summary} onChange={(e) => set("summary", e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className={label}>Duration</label>
          <input className={input} value={v.duration} onChange={(e) => set("duration", e.target.value)} placeholder="14 Guided Learning Hours / 2 Days" />
        </div>
        <div>
          <label className={label}>Start date</label>
          <input className={input} value={v.startDate} onChange={(e) => set("startDate", e.target.value)} />
        </div>
        <div>
          <label className={label}>Fee</label>
          <input className={input} value={v.fee} onChange={(e) => set("fee", e.target.value)} placeholder="Leave blank → “Contact us for fees”" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={label}>What you’ll learn (one per line)</label>
          <textarea rows={6} className={input} value={v.topicsText} onChange={(e) => set("topicsText", e.target.value)} />
        </div>
        <div>
          <label className={label}>Who should attend (one per line)</label>
          <textarea rows={6} className={input} value={v.audienceText} onChange={(e) => set("audienceText", e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className={label}>Assessment</label>
          <input className={input} value={v.assessment} onChange={(e) => set("assessment", e.target.value)} placeholder="20-question MCQ · 70% to pass" />
        </div>
        <div>
          <label className={label}>Entry requirements</label>
          <input className={input} value={v.entryRequirements} onChange={(e) => set("entryRequirements", e.target.value)} />
        </div>
        <div>
          <label className={label}>Certification</label>
          <input className={input} value={v.certification} onChange={(e) => set("certification", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={label}>Highlight note</label>
        <input className={input} value={v.note} onChange={(e) => set("note", e.target.value)} placeholder="e.g. earns credit toward ISEP's Register of Carbon Accountants" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={label}>Brochure (PDF link)</label>
          <input className={input} value={v.brochureUrl} onChange={(e) => set("brochureUrl", e.target.value)} placeholder="/brochures/....pdf" />
        </div>
        <div>
          <label className={label}>Display order</label>
          <input type="number" className={input} value={v.displayOrder} onChange={(e) => set("displayOrder", Number(e.target.value) || 0)} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-forest">
        <input type="checkbox" checked={v.published} onChange={(e) => set("published", e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-lime focus:ring-lime" />
        Published (visible on the website and in the Training menu)
      </label>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading} className="bg-lime hover:bg-lime/90 text-forest">
          {loading ? "Saving..." : id ? "Save Changes" : "Add Course"}
        </Button>
        {id && (
          <Button type="button" variant="outline" onClick={remove} disabled={loading} className="text-red-600 border-red-200 hover:bg-red-50">
            Delete
          </Button>
        )}
        <Link href="/admin/training">
          <Button type="button" variant="outline">Cancel</Button>
        </Link>
      </div>
    </form>
  );
}
