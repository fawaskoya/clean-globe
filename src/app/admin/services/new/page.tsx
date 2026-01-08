"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const serviceFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  shortDescription: z.string().min(1, "Short description is required"),
  description: z.string().min(1, "Description is required"),
  fullDescription: z.string().min(1, "Full description is required"),
  image: z.string().optional(),
  deliverables: z.string(),
  timeline: z.string().min(1, "Timeline is required"),
  faqs: z.string(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  published: z.boolean(),
});

type ServiceFormData = z.infer<typeof serviceFormSchema>;

export default function NewServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      deliverables: "[]",
      faqs: "[]",
      published: false,
    },
  });

  const onSubmit = async (data: ServiceFormData) => {
    setLoading(true);
    setError("");

    try {
      const deliverables = JSON.parse(data.deliverables || "[]");
      const faqs = JSON.parse(data.faqs || "[]");

      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          deliverables,
          faqs,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create service");
      }

      router.push("/admin/services");
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
        <Link href="/admin/services" className="text-lime hover:text-forest mb-4 inline-block">
          ← Back to Services
        </Link>
        <h1 className="text-3xl font-bold text-forest font-serif">Create New Service</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-md border border-gray-100/50 p-8 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Service Name *
            </label>
            <input
              {...register("name")}
              className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Slug *
            </label>
            <input
              {...register("slug")}
              placeholder="esg-advisory"
              className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
            />
            {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            Short Description *
          </label>
          <input
            {...register("shortDescription")}
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
          {errors.shortDescription && <p className="text-red-600 text-sm mt-1">{errors.shortDescription.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            Description *
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            Full Description *
          </label>
          <textarea
            {...register("fullDescription")}
            rows={6}
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
          {errors.fullDescription && <p className="text-red-600 text-sm mt-1">{errors.fullDescription.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            Deliverables (JSON array)
          </label>
          <textarea
            {...register("deliverables")}
            rows={4}
            placeholder='["Deliverable 1", "Deliverable 2"]'
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white font-mono text-sm focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            Timeline *
          </label>
          <input
            {...register("timeline")}
            placeholder="Typical engagement: 6 to 10 weeks"
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
          {errors.timeline && <p className="text-red-600 text-sm mt-1">{errors.timeline.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            FAQs (JSON array)
          </label>
          <textarea
            {...register("faqs")}
            rows={6}
            placeholder='[{"question": "Question?", "answer": "Answer"}]'
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white font-mono text-sm focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Meta Title
            </label>
            <input
              {...register("metaTitle")}
              className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Image URL
            </label>
            <input
              {...register("image")}
              type="url"
              className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            Meta Description
          </label>
          <textarea
            {...register("metaDescription")}
            rows={2}
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("published")}
            className="h-4 w-4 rounded border-gray-300 text-lime focus:ring-lime"
          />
          <label className="text-sm font-medium text-forest">Publish immediately</label>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-lime hover:bg-lime/90 text-forest"
          >
            {loading ? "Creating..." : "Create Service"}
          </Button>
          <Link href="/admin/services">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

