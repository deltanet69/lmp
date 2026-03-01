"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
    ArrowLeft, Mail, Phone, Calendar, Tag,
    MessageSquare, Trash2, CheckCircle2, XCircle, Clock
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { logActivity } from "@/lib/activityLog";

type Status = "pending" | "contacted" | "rejected";

interface Enquiry {
    id: string;
    full_name: string;
    email_address: string;
    phone_number: string | null;
    project_type: string;
    message: string | null;
    status: Status;
    created_at: string;
}

const STATUS_CONFIG: Record<Status, { label: string; badgeClass: string; icon: React.ReactNode }> = {
    pending: {
        label: "Pending",
        badgeClass: "bg-amber-100 text-amber-700 border border-amber-200",
        icon: <Clock className="w-3.5 h-3.5" />,
    },
    contacted: {
        label: "Contacted",
        badgeClass: "bg-emerald-100 text-emerald-700 border border-emerald-200",
        icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    rejected: {
        label: "Rejected",
        badgeClass: "bg-red-100 text-red-600 border border-red-200",
        icon: <XCircle className="w-3.5 h-3.5" />,
    },
};

export default function EnquiryDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const supabase = createClient();

    const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        supabase
            .from("enquiry")
            .select("*")
            .eq("id", id)
            .single()
            .then(({ data }) => {
                if (data) setEnquiry(data as Enquiry);
                setLoading(false);
            });
    }, [id]);

    const updateStatus = async (status: Status) => {
        if (!enquiry) return;
        setUpdating(true);
        const { error } = await supabase
            .from("enquiry")
            .update({ status })
            .eq("id", id);
        if (!error) {
            setEnquiry((prev) => prev ? { ...prev, status } : prev);
            await logActivity({
                action: "status_changed",
                entity: "enquiry",
                entity_id: id,
                entity_title: enquiry.full_name,
                detail: status,
            });
        }
        setUpdating(false);
    };

    const handleDelete = async () => {
        if (!confirm("Hapus enquiry ini secara permanen?")) return;
        await logActivity({
            action: "deleted",
            entity: "enquiry",
            entity_id: id,
            entity_title: enquiry?.full_name || "Unknown",
        });
        await supabase.from("enquiry").delete().eq("id", id);
        router.push("/lmpadmin/enquiry");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center gap-3 text-slate-400">
                    <div className="w-8 h-8 border-2 border-slate-200 border-t-[#80FF00] rounded-full animate-spin" />
                    <span className="text-sm">Loading...</span>
                </div>
            </div>
        );
    }

    if (!enquiry) {
        return (
            <div className="text-center text-slate-400 py-20">
                <p className="text-lg font-semibold">Enquiry not found.</p>
                <button
                    onClick={() => router.push("/lmpadmin/enquiry")}
                    className="mt-4 text-sm text-[#19172A] underline"
                >
                    Back to Enquiries
                </button>
            </div>
        );
    }

    const status = (enquiry.status || "pending") as Status;
    const badge = STATUS_CONFIG[status];

    return (
        <div className="space-y-6 max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Enquiry Detail</h1>
                        <p className="text-sm text-slate-500">From {enquiry.full_name}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Current status badge */}
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${badge.badgeClass}`}>
                        {badge.icon} {badge.label}
                    </span>

                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-100 transition-colors border border-red-200"
                    >
                        <Trash2 className="w-4 h-4" />
                        Hapus
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sidebar */}
                <div className="md:col-span-1 space-y-4">
                    {/* Sender Info Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm">
                        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                            Info Pengirim
                        </h2>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#19172A] flex items-center justify-center shrink-0 text-white text-sm font-bold">
                                {enquiry.full_name[0].toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-700">{enquiry.full_name}</p>
                                <p className="text-xs text-slate-400">Pengirim</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Mail className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div className="overflow-hidden">
                                <p className="text-xs text-slate-400 mb-0.5">Email</p>
                                <p className="text-sm text-slate-700 font-medium break-all">{enquiry.email_address}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-xs text-slate-400 mb-0.5">Telepon</p>
                                <p className="text-sm text-slate-700 font-medium">{enquiry.phone_number || "—"}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Tag className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-xs text-slate-400 mb-0.5">Project Type</p>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                                    {enquiry.project_type || "General"}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Calendar className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-xs text-slate-400 mb-0.5">Diterima</p>
                                <p className="text-sm text-slate-700 font-medium">
                                    {new Date(enquiry.created_at).toLocaleString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Status Action Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
                        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                            Update Status
                        </h2>

                        <button
                            onClick={() => updateStatus("contacted")}
                            disabled={updating || status === "contacted"}
                            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-200 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            {status === "contacted" ? "✓ Sudah Contacted" : "Tandai Contacted"}
                        </button>

                        <button
                            onClick={() => updateStatus("rejected")}
                            disabled={updating || status === "rejected"}
                            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-red-200 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm"
                        >
                            <XCircle className="w-4 h-4" />
                            {status === "rejected" ? "✓ Sudah Rejected" : "Tandai Rejected"}
                        </button>

                        {status !== "pending" && (
                            <button
                                onClick={() => updateStatus("pending")}
                                disabled={updating}
                                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 py-2 rounded-lg text-sm font-medium transition-all"
                            >
                                <Clock className="w-3.5 h-3.5" />
                                Reset ke Pending
                            </button>
                        )}

                        {/* Placeholder for future email automation */}
                        <div className="pt-2 border-t border-slate-100">
                            <p className="text-xs text-slate-400 text-center">
                                📧 Automated email reply akan dikonfigurasi di sini
                            </p>
                        </div>
                    </div>
                </div>

                {/* Message Body */}
                <div className="md:col-span-2 space-y-4">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm min-h-[300px]">
                        <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
                            <MessageSquare className="w-5 h-5 text-[#80FF00]" />
                            <h2 className="font-bold text-slate-700">Pesan dari {enquiry.full_name}</h2>
                        </div>
                        <div className="text-slate-600 whitespace-pre-wrap text-sm leading-relaxed">
                            {enquiry.message || (
                                <span className="text-slate-400 italic">Tidak ada pesan yang disertakan.</span>
                            )}
                        </div>
                    </div>

                    {/* Quick contact info for easy copying */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                            Quick Copy
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-white border border-slate-200 rounded-lg p-3 group cursor-pointer hover:border-[#19172A] transition-colors"
                                onClick={() => navigator.clipboard?.writeText(enquiry.email_address)}
                                title="Klik untuk copy"
                            >
                                <p className="text-xs text-slate-400 mb-1">Email</p>
                                <p className="text-sm font-mono text-slate-700 truncate">{enquiry.email_address}</p>
                            </div>
                            {enquiry.phone_number && (
                                <div className="bg-white border border-slate-200 rounded-lg p-3 cursor-pointer hover:border-[#19172A] transition-colors"
                                    onClick={() => navigator.clipboard?.writeText(enquiry.phone_number!)}
                                    title="Klik untuk copy"
                                >
                                    <p className="text-xs text-slate-400 mb-1">Telepon</p>
                                    <p className="text-sm font-mono text-slate-700">{enquiry.phone_number}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
