"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

const quickContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type QuickContactFormData = z.infer<typeof quickContactSchema>;

export function QuickContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuickContactFormData>({
    resolver: zodResolver(quickContactSchema),
  });

  const onSubmit = async (data: QuickContactFormData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          company: "",
          phone: "",
          service: "General Inquiry",
          consent: true,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl shadow-md border border-gray-100/50 p-8"
    >
      <h3 className="text-2xl font-bold text-forest font-serif mb-4">Get in Touch</h3>
      <p className="text-gray-600 mb-6">
        Have a question? Send us a quick message and we'll get back to you.
        <br />
        <span className="text-sm mt-2 block">
          Prefer WhatsApp? <a href="https://wa.me/97455225960" target="_blank" rel="noopener noreferrer" className="text-lime font-semibold hover:underline">Chat with us</a>
        </span>
      </p>

      {status === "success" ? (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          Thank you! Your message has been sent successfully.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {status === "error" && errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          <div>
            <input
              {...register("name")}
              placeholder="Your Name"
              className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white placeholder:text-gray-400 focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
            />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Your Email"
              className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white placeholder:text-gray-400 focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
            />
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <textarea
              {...register("message")}
              rows={4}
              placeholder="Your Message"
              className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white placeholder:text-gray-400 focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
            />
            {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-lime hover:bg-lime/90 text-forest"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </Button>
        </form>
      )}
    </motion.div>
  );
}

