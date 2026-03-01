"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Mail, Phone, Calendar, Tag, MessageSquare, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Enquiry {
    id: string;
    full_name: string;
    email_address: string;
    phone_number: string;
    project_type: string;
    message: string;
    created_at: string;
}

export default function EnquiryDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const supabase = createClient();
    const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const { data } = await supabase.from("enquiry").select("*").eq("id", id).single();
            if (data) setEnquiry(data);
            setLoading(false);
        };
        fetch();
    }, [id]);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this enquiry?")) return;
        await supabase.from("enquiry").delete().eq("id", id);
        router.push("/lmpadmin/enquiry");
    };

    if (loading) return <div className="flex items-center justify-center h-64 text-slate-400">Loading...</div>;
    if (!enquiry) return <div className="text-center text-slate-400 py-20">Enquiry not found.</div>;

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button type="button" onClick={() => router.back()} className="text-slate-400 hover:text-slate-600">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Enquiry Details</h1>
                        <p className="text-sm text-slate-500">From {enquiry.full_name}</p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-100 transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                    Delete
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Info Sidebar */}
                <div className="md:col-span-1 space-y-4">
                    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-2 uppercase tracking-wider">Sender Info</h2>

                        <div className="flex items-start gap-3">
                            <Mail className="w-4 h-4 text-slate-400 mt-1" />
                            <div className="overflow-hidden">
                                <p className="text-xs text-slate-400">Email Address</p>
                                <p className="text-sm text-slate-700 font-medium break-all">{enquiry.email_address}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Phone className="w-4 h-4 text-slate-400 mt-1" />
                            <div>
                                <p className="text-xs text-slate-400">Phone Number</p>
                                <p className="text-sm text-slate-700 font-medium">{enquiry.phone_number || "—"}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Tag className="w-4 h-4 text-slate-400 mt-1" />
                            <div>
                                <p className="text-xs text-slate-400">Project Type</p>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 mt-1">
                                    {enquiry.project_type || "General Inquiry"}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Calendar className="w-4 h-4 text-slate-400 mt-1" />
                            <div>
                                <p className="text-xs text-slate-400">Submitted At</p>
                                <p className="text-sm text-slate-700 font-medium">
                                    {new Date(enquiry.created_at).toLocaleString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    <a
                        href={`mailto:${enquiry.email_address}?subject=Re: Portfolio Enquiry - ${enquiry.project_type}`}
                        className="flex items-center justify-center gap-2 bg-[#19172A] text-[#80FF00] w-full py-3 rounded-xl font-bold hover:bg-[#2d2b3f] transition-all shadow-sm"
                    >
                        Reply via Email
                    </a>
                </div>

                {/* Message Body */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm min-h-[300px]">
                        <div className="flex items-center gap-2 mb-4 text-slate-700">
                            <MessageSquare className="w-5 h-5 text-[#80FF00]" />
                            <h2 className="font-bold">Message Content</h2>
                        </div>
                        <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-wrap">
                            {enquiry.message || "No message content provided."}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
