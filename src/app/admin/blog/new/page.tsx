"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().optional(),
  tags: z.string(),
  category: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  published: z.boolean(),
});

type BlogFormData = z.infer<typeof blogFormSchema>;

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      tags: "[]",
      published: false,
    },
  });

  const onSubmit = async (data: BlogFormData) => {
    setLoading(true);
    setError("");

    try {
      const tags = JSON.parse(data.tags || "[]");

      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          tags,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create blog post");
      }

      router.push("/admin/blog");
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
        <Link href="/admin/blog" className="text-lime hover:text-forest mb-4 inline-block">
          ← Back to Blog
        </Link>
        <h1 className="text-3xl font-bold text-forest font-serif">Create New Blog Post</h1>
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
              Title *
            </label>
            <input
              {...register("title")}
              className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Slug *
            </label>
            <input
              {...register("slug")}
              placeholder="my-blog-post"
              className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
            />
            {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            Excerpt *
          </label>
          <textarea
            {...register("excerpt")}
            rows={2}
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
          {errors.excerpt && <p className="text-red-600 text-sm mt-1">{errors.excerpt.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            Content *
          </label>
          <textarea
            {...register("content")}
            rows={12}
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20 font-mono text-sm"
          />
          {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Category
            </label>
            <input
              {...register("category")}
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
            Tags (JSON array)
          </label>
          <textarea
            {...register("tags")}
            rows={2}
            placeholder='["sustainability", "esg"]'
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
              Meta Description
            </label>
            <textarea
              {...register("metaDescription")}
              rows={2}
              className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
            />
          </div>
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
            {loading ? "Creating..." : "Create Post"}
          </Button>
          <Link href="/admin/blog">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

