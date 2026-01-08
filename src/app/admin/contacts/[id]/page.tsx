
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
    EnvelopeIcon,
    PhoneIcon,
    BuildingOfficeIcon,
    BriefcaseIcon,
    CalendarIcon,
    CheckCircleIcon,
    TrashIcon
} from "@heroicons/react/24/outline";

export default function ContactDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [contact, setContact] = useState<any>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await fetch(`/api/admin/contacts/${id}`);
                if (!response.ok) throw new Error("Failed to fetch contact");
                const data = await response.json();
                setContact(data);
            } catch (err) {
                setError("Failed to load contact details");
            } finally {
                setFetching(false);
            }
        };

        if (id) fetchContact();
    }, [id]);

    const updateStatus = async (updates: any) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/admin/contacts/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
            });

            if (!response.ok) throw new Error("Failed to update contact");

            const updatedContact = await response.json();
            setContact(updatedContact);
        } catch (err: any) {
            setError(err.message || "Failed to update");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this enquiry? This cannot be undone.")) return;

        setLoading(true);
        try {
            const response = await fetch(`/api/admin/contacts/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete contact");

            router.push("/admin/contacts");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "An error occurred");
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading enquiry...</p>
                </div>
            </div>
        );
    }

    if (!contact) return <div className="text-center py-12">Contact not found</div>;

    return (
        <div>
            <div className="mb-8">
                <Link href="/admin/contacts" className="text-lime hover:text-forest mb-4 inline-block">
                    ← Back to Enquiries
                </Link>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold text-forest font-serif">Enquiry Details</h1>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => updateStatus({ read: !contact.read })}
                            disabled={loading}
                            className={contact.read ? "bg-gray-100" : "bg-white"}
                        >
                            {contact.read ? "Mark as Unread" : "Mark as Read"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => updateStatus({ processed: !contact.processed })}
                            disabled={loading}
                            className={contact.processed ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-white"}
                        >
                            {contact.processed ? "Mark Unprocessed" : "Mark Processed"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleDelete}
                            disabled={loading}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                            <TrashIcon className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Message */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl shadow-md border border-gray-100/50 p-8">
                        <h2 className="text-xl font-bold text-forest font-serif mb-6 border-b pb-4">Message</h2>
                        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {contact.message}
                        </div>
                    </div>
                </div>

                {/* Sidebar - Meta Info */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl shadow-md border border-gray-100/50 p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Sender Details</h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-lime/10 rounded-lg shrink-0">
                                    <div className="h-5 w-5 text-lime font-bold flex items-center justify-center">
                                        {contact.name.charAt(0)}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{contact.name}</p>
                                    <p className="text-sm text-gray-500">Name</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-lime/10 rounded-lg shrink-0">
                                    <EnvelopeIcon className="h-5 w-5 text-lime" />
                                </div>
                                <div className="overflow-hidden">
                                    <a href={`mailto:${contact.email}`} className="font-semibold text-lime hover:underline truncate block">
                                        {contact.email}
                                    </a>
                                    <p className="text-sm text-gray-500">Email</p>
                                </div>
                            </div>

                            {contact.phone && (
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-lime/10 rounded-lg shrink-0">
                                        <PhoneIcon className="h-5 w-5 text-lime" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{contact.phone}</p>
                                        <p className="text-sm text-gray-500">Phone</p>
                                    </div>
                                </div>
                            )}

                            {contact.company && (
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-lime/10 rounded-lg shrink-0">
                                        <BuildingOfficeIcon className="h-5 w-5 text-lime" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{contact.company}</p>
                                        <p className="text-sm text-gray-500">Company</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-md border border-gray-100/50 p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Enquiry Info</h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-orange-100 rounded-lg shrink-0">
                                    <BriefcaseIcon className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{contact.service || "General Enquiry"}</p>
                                    <p className="text-sm text-gray-500">Service Interest</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                                    <CalendarIcon className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {new Date(contact.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(contact.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg shrink-0 ${contact.read ? "bg-green-100" : "bg-gray-100"}`}>
                                    <CheckCircleIcon className={`h-5 w-5 ${contact.read ? "text-green-600" : "text-gray-400"}`} />
                                </div>
                                <div>
                                    <p className={`font-semibold ${contact.read ? "text-green-700" : "text-gray-600"}`}>
                                        {contact.read ? "Read" : "Unread"}
                                    </p>
                                    <p className="text-sm text-gray-500">Status</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
