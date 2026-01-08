"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  images: z.string(),
  category: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  published: z.boolean(),
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

export default function EditProjectPage() {
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
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/admin/projects/${id}`);
        if (!response.ok) throw new Error("Failed to fetch project");
        const data = await response.json();
        reset({
          ...data,
          images: JSON.stringify(data.images || []),
        });
      } catch (err) {
        setError("Failed to load project");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchProject();
  }, [id, reset]);

  const onSubmit = async (data: ProjectFormData) => {
    setLoading(true);
    setError("");

    try {
      const images = JSON.parse(data.images || "[]");

      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          images,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update project");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");

      router.push("/admin/projects");
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
        <Link href="/admin/projects" className="text-lime hover:text-forest mb-4 inline-block">
          ← Back to Projects
        </Link>
        <h1 className="text-3xl font-bold text-forest font-serif">Edit Project</h1>
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
              className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
            />
            {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>}
          </div>
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
            Content *
          </label>
          <textarea
            {...register("content")}
            rows={10}
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
          {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            Images (JSON array of URLs)
          </label>
          <textarea
            {...register("images")}
            rows={4}
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white font-mono text-sm focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
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
              Meta Title
            </label>
            <input
              {...register("metaTitle")}
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
          <Link href="/admin/projects">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

