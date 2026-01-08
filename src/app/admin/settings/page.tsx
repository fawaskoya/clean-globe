"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";

const settingsSchema = z.object({
  whatsappNumber: z.string().optional(),
  whatsappMessage: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
  googleSearchConsole: z.string().optional(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/admin/settings");
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();
        reset(data);
      } catch (err) {
        setError("Failed to load settings");
      } finally {
        setFetching(false);
      }
    };

    fetchSettings();
  }, [reset]);

  const onSubmit = async (data: SettingsFormData) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update settings");
      }

      setSuccess("Settings updated successfully!");
      setTimeout(() => setSuccess(""), 5000);
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
        <h1 className="text-3xl font-bold text-forest font-serif">Site Settings</h1>
        <p className="text-gray-600 mt-2">Configure website settings</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-md border border-gray-100/50 p-8 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            {success}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            WhatsApp Number
          </label>
          <input
            {...register("whatsappNumber")}
            placeholder="+97412345678"
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
          <p className="text-xs text-gray-500 mt-1">Include country code (e.g., +974)</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            WhatsApp Default Message
          </label>
          <textarea
            {...register("whatsappMessage")}
            rows={3}
            placeholder="Hello! I'm interested in your services."
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            Google Analytics ID
          </label>
          <input
            {...register("googleAnalyticsId")}
            placeholder="G-XXXXXXXXXX"
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            Google Search Console Verification
          </label>
          <input
            {...register("googleSearchConsole")}
            placeholder="Verification code"
            className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-lime hover:bg-lime/90 text-forest"
          >
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}

