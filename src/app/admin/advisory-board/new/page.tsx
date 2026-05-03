"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  bio: z.string().min(1, "Bio is required"),
  image: z.string().optional(),
  displayOrder: z.number(),
  published: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export default function NewAdvisoryMemberPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { displayOrder: 0, published: true },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/advisory-board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create member");
      }
      router.push("/admin/advisory-board");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/advisory-board" className="text-lime hover:text-forest mb-4 inline-block">
          ← Back to Advisory Board
        </Link>
        <h1 className="text-3xl font-bold text-forest font-serif">Add Board Member</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-md border border-gray-100/50 p-8 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">Name *</label>
            <input {...register("name")} className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20" />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">Role / Title *</label>
            <input {...register("role")} className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20" />
            {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">Bio *</label>
          <textarea {...register("bio")} rows={4} className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20" />
          {errors.bio && <p className="text-red-600 text-sm mt-1">{errors.bio.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">Image URL</label>
            <input {...register("image")} type="url" placeholder="https://..." className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">Display Order</label>
            <input {...register("displayOrder", { valueAsNumber: true })} type="number" className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("published")} className="h-4 w-4 rounded border-gray-300 text-lime focus:ring-lime" />
          <label className="text-sm font-medium text-forest">Published</label>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={loading} className="bg-lime hover:bg-lime/90 text-forest">
            {loading ? "Creating..." : "Add Member"}
          </Button>
          <Link href="/admin/advisory-board">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
