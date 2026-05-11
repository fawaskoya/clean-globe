"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { NAV_LINKS } from "@/lib/navigation";

const SERVICE_OPTIONS = [
    "General Inquiry",
    ...(NAV_LINKS.find((l) => l.href === "/services")?.children?.map((c) => c.name) ?? []),
];

export function ContactForm() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "General Inquiry",
        message: "",
        consent: false,
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.consent) {
            setStatus("error");
            setErrorMessage("Please agree to the privacy policy to submit the form.");
            return;
        }

        setStatus("submitting");
        setErrorMessage("");

        try {
            // Get reCAPTCHA token if available
            let recaptchaToken = null;
            if (executeRecaptcha) {
                try {
                    recaptchaToken = await executeRecaptcha("contact_form");
                } catch (recaptchaError) {
                    console.error("reCAPTCHA error:", recaptchaError);
                    // Continue without token if reCAPTCHA fails
                }
            }

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    recaptchaToken,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                // Reset form data
                setFormData({
                    name: "",
                    company: "",
                    email: "",
                    phone: "",
                    service: "General Inquiry",
                    message: "",
                    consent: false,
                });
            } else {
                setStatus("error");
                setErrorMessage(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Network error. Please check your connection and try again.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    if (status === "success") {
        return (
            <div className="rounded-3xl bg-green-50 p-8 text-center border border-green-200/50">
                <CheckCircleIcon className="mx-auto h-12 w-12 text-lime" />
                <h3 className="mt-4 text-xl font-bold text-forest">Message Sent!</h3>
                <p className="mt-2 text-gray-600">
                    Thank you for contacting Clean Globe Consultancy. Our team will review your inquiry and get back to you shortly.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setStatus("idle");
                            setFormData({
                                name: "",
                                company: "",
                                email: "",
                                phone: "",
                                service: "General Inquiry",
                                message: "",
                                consent: false,
                            });
                        }}
                    >
                        Send Another Message
                    </Button>
                    <a
                        href="https://wa.me/97455225960"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-forest text-sm font-medium hover:text-lime transition-colors inline-flex items-center justify-center gap-2"
                    >
                        <span>Need a faster response? Chat on WhatsApp</span>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white px-6 py-8 md:p-12 shadow-md border border-gray-100/50 rounded-3xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold leading-6 text-forest">
                        Full Name
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="block w-full rounded-md border border-gray-200 px-3.5 py-2 text-gray-900 bg-white placeholder:text-gray-400 focus:border-lime focus:ring-2 focus:ring-lime/20 sm:text-sm sm:leading-6 transition-all"
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="company" className="block text-sm font-semibold leading-6 text-forest">
                        Company
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="text"
                            name="company"
                            id="company"
                            required
                            className="block w-full rounded-md border border-gray-200 px-3.5 py-2 text-gray-900 bg-white placeholder:text-gray-400 focus:border-lime focus:ring-2 focus:ring-lime/20 sm:text-sm sm:leading-6 transition-all"
                            onChange={handleChange}
                            value={formData.company}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-forest">
                        Email
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            className="block w-full rounded-md border border-gray-200 px-3.5 py-2 text-gray-900 bg-white placeholder:text-gray-400 focus:border-lime focus:ring-2 focus:ring-lime/20 sm:text-sm sm:leading-6 transition-all"
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-forest">
                        Phone (Optional)
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            className="block w-full rounded-md border border-gray-200 px-3.5 py-2 text-gray-900 bg-white placeholder:text-gray-400 focus:border-lime focus:ring-2 focus:ring-lime/20 sm:text-sm sm:leading-6 transition-all"
                            onChange={handleChange}
                            value={formData.phone}
                        />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="service" className="block text-sm font-semibold leading-6 text-forest">
                        Area of Interest
                    </label>
                    <div className="mt-2.5">
                        <select
                            id="service"
                            name="service"
                            className="block w-full rounded-md border border-gray-200 px-3.5 py-2 text-gray-900 bg-white focus:border-lime focus:ring-2 focus:ring-lime/20 sm:text-sm sm:leading-6 transition-all"
                            onChange={handleChange}
                            value={formData.service}
                        >
                            {SERVICE_OPTIONS.map((opt) => (
                                <option key={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-forest">
                        Message
                    </label>
                    <div className="mt-2.5">
                        <textarea
                            name="message"
                            id="message"
                            rows={4}
                            required
                            className="block w-full rounded-md border border-gray-200 px-3.5 py-2 text-gray-900 bg-white placeholder:text-gray-400 focus:border-lime focus:ring-2 focus:ring-lime/20 sm:text-sm sm:leading-6 transition-all"
                            onChange={handleChange}
                            value={formData.message}
                        />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <div className="flex gap-x-4 items-start">
                        <div className="flex h-6 items-center">
                            <input
                                id="consent"
                                name="consent"
                                type="checkbox"
                                required
                                className="h-4 w-4 rounded border-gray-300 text-lime focus:ring-lime"
                                checked={formData.consent}
                                onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                            />
                        </div>
                        <label htmlFor="consent" className="text-sm leading-6 text-gray-600">
                            I agree to the <a href="/privacy" className="font-semibold text-lime hover:underline">privacy policy</a> and consent to being contacted by CGC.
                        </label>
                    </div>
                </div>
            </div>

            {status === "error" && (
                <div className="rounded-md bg-red-50 p-4 mt-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Submission Error</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{errorMessage}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 flex justify-end">
                <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
                    {status === "submitting" ? "Sending..." : "Send Message"}
                </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                    Prefer to chat? <a href="https://wa.me/97455225960" className="text-lime font-semibold hover:underline">Message us on WhatsApp</a>
                </p>
            </div>
        </form >
    );
}
