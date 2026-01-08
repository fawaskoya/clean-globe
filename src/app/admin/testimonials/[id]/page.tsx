"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const testimonialFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().optional(),
  role: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  image: z.string().optional(),
  rating: z.number().min(1).max(5),
  displayOrder: z.number(),
  published: z.boolean(),
});

type TestimonialFormData = z.infer<typeof testimonialFormSchema>;

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      rating: 5,
      displayOrder: 0,
      published: true,
    },
  });

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await fetch(`/api/admin/testimonials/${id}`);
        if (!response.ok) throw new Error("Failed to fetch testimonial");
        const data = await response.json();
        reset(data);
      } catch (err) {
        setError("Failed to load testimonial");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchTestimonial();
  }, [id, reset]);

  const onSubmit = async (data: TestimonialFormData) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update testimonial");
      }

      router.push("/admin/testimonials");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete testimonial");

      router.push("/admin/testimonials");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/testimonials" className="text-lime hover:text-forest mb-4 inline-block">
          ← Back to Testimonials
        </Link>
        <h1 className="text-3xl font-bold text-forest font-serif">Edit Testimonial</h1>
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
              Name *
            </label>
            <input
              {...register("name")}
              className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Company
            </label>
            <input
              {...register("company")}
              className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            Role/Position
          </label>
          <input
            {...register("role")}
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            Testimonial Content *
          </label>
          <textarea
            {...register("content")}
            rows={6}
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
          {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Rating (1-5) *
            </label>
            <input
              {...register("rating", { valueAsNumber: true })}
              type="number"
              min="1"
              max="5"
              className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
            />
            {errors.rating && <p className="text-red-600 text-sm mt-1">{errors.rating.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Display Order
            </label>
            <input
              {...register("displayOrder", { valueAsNumber: true })}
              type="number"
              className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
            />
          </div>
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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("published")}
            className="h-4 w-4 rounded border-gray-300 text-lime focus:ring-lime"
          />
          <label className="text-sm font-medium text-forest">Published</label>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-lime hover:bg-lime/90 text-forest"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleDelete}
            disabled={loading}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Delete
          </Button>
          <Link href="/admin/testimonials">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

