"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
    ArrowLeft, Mail, Phone, Calendar, Tag,
    MessageSquare, Trash2, CheckCircle2, XCircle, Clock, Copy, Check
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { logActivity } from "@/lib/activityLog";

type Status = "pending" | "contacted" | "rejected";

// Maps any unknown/legacy DB status (e.g. "new") to a known Status
function normalizeStatus(raw: string | null | undefined): Status {
    if (raw === "contacted") return "contacted";
    if (raw === "rejected") return "rejected";
    return "pending";
}

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

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button
            onClick={handleCopy}
            title="Copy"
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors ml-1 shrink-0"
        >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
    );
}

export default function EnquiryDetailPage() {
    const router = useRouter();
    const params = useParams();
    const supabase = createClient();

    // Fix for static hosting: extract UUID from URL if param is placeholder '1'
    const [id, setId] = useState<string>(params.id as string);

    useEffect(() => {
        if (typeof window !== "undefined" && (id === "1" || !id)) {
            const pathParts = window.location.pathname.split("/").filter(Boolean);
            const idx = pathParts.indexOf("enquiry");
            if (idx !== -1 && pathParts[idx + 1] && pathParts[idx + 1] !== "1") {
                setId(pathParts[idx + 1]);
            }
        }
    }, [id]);

    const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    useEffect(() => {
        supabase
            .from("enquiry")
            .select("*")
            .eq("id", id)
            .single()
            .then(({ data, error }) => {
                if (error) console.error("[EnquiryDetail] fetch error:", error);
                if (data) setEnquiry(data as Enquiry);
                setLoading(false);
            });
    }, [id]);

    const updateStatus = async (newStatus: Status) => {
        if (!enquiry || updating) return;
        setUpdating(true);
        setUpdateError(null);
        setSuccessMsg(null);

        const { error } = await supabase
            .from("enquiry")
            .update({ status: newStatus })
            .eq("id", id);

        if (error) {
            console.error("[EnquiryDetail] updateStatus error:", error);
            setUpdateError(`Gagal update status: ${error.message}`);
        } else {
            setEnquiry((prev) => prev ? { ...prev, status: newStatus } : prev);
            setSuccessMsg(`Status berhasil diubah ke "${newStatus}"`);
            setTimeout(() => setSuccessMsg(null), 3000);
            await logActivity({
                action: "status_changed",
                entity: "enquiry",
                entity_id: id,
                entity_title: enquiry.full_name,
                detail: newStatus,
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
                    <span className="text-sm">Loading enquiry...</span>
                </div>
            </div>
        );
    }

    if (!enquiry) {
        return (
            <div className="text-center text-slate-400 py-20">
                <p className="text-lg font-semibold text-slate-500">Enquiry tidak ditemukan.</p>
                <button
                    onClick={() => router.push("/lmpadmin/enquiry")}
                    className="mt-4 text-sm text-[#19172A] underline"
                >
                    ← Kembali ke Enquiries
                </button>
            </div>
        );
    }

    const status = normalizeStatus(enquiry.status);
    const badge = STATUS_CONFIG[status];

    return (
        <div className="space-y-5">
            {/* ── Page Header ── */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Enquiry Detail</h1>
                        <p className="text-sm text-slate-500 mt-0.5">From {enquiry.full_name}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
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

            {/* ── Feedback Messages ── */}
            {updateError && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 flex items-center gap-2">
                    <XCircle className="w-4 h-4 shrink-0" />
                    {updateError}
                    <span className="text-xs text-red-400 ml-1">(Cek apakah RLS Supabase mengizinkan UPDATE dari admin)</span>
                </div>
            )}
            {successMsg && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    {successMsg}
                </div>
            )}

            {/* ── Main Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Left Sidebar */}
                <div className="space-y-4">

                    {/* Sender Info */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Info Pengirim</p>
                        </div>
                        <div className="p-5 space-y-4">
                            {/* Avatar + name */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#19172A] flex items-center justify-center shrink-0 text-white text-sm font-bold">
                                    {enquiry.full_name[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-700">{enquiry.full_name}</p>
                                    <p className="text-xs text-slate-400">Pengirim</p>
                                </div>
                            </div>

                            <div className="space-y-3 pt-1 border-t border-slate-100">
                                {/* Email */}
                                <div className="flex items-start gap-2.5">
                                    <Mail className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-slate-400 mb-0.5">Email</p>
                                        <div className="flex items-center gap-1">
                                            <p className="text-sm text-slate-700 font-medium break-all">{enquiry.email_address}</p>
                                            <CopyButton text={enquiry.email_address} />
                                        </div>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-2.5">
                                    <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-400 mb-0.5">Telepon</p>
                                        <div className="flex items-center gap-1">
                                            <p className="text-sm text-slate-700 font-medium">{enquiry.phone_number || "—"}</p>
                                            {enquiry.phone_number && <CopyButton text={enquiry.phone_number} />}
                                        </div>
                                    </div>
                                </div>

                                {/* Project Type */}
                                <div className="flex items-start gap-2.5">
                                    <Tag className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-xs text-slate-400 mb-0.5">Project Type</p>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                                            {enquiry.project_type || "General"}
                                        </span>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="flex items-start gap-2.5">
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
                        </div>
                    </div>

                    {/* Update Status */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Update Status</p>
                        </div>
                        <div className="p-4 space-y-2.5">
                            <button
                                onClick={() => updateStatus("contacted")}
                                disabled={updating || status === "contacted"}
                                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm"
                            >
                                {updating && status !== "contacted" ? (
                                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <CheckCircle2 className="w-4 h-4" />
                                )}
                                {status === "contacted" ? "✓ Sudah Contacted" : "Tandai Contacted"}
                            </button>

                            <button
                                onClick={() => updateStatus("rejected")}
                                disabled={updating || status === "rejected"}
                                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm"
                            >
                                {updating && status !== "rejected" ? (
                                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <XCircle className="w-4 h-4" />
                                )}
                                {status === "rejected" ? "✓ Sudah Rejected" : "Tandai Rejected"}
                            </button>

                            {status !== "pending" && (
                                <button
                                    onClick={() => updateStatus("pending")}
                                    disabled={updating}
                                    className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 disabled:opacity-50 text-slate-600 py-2 rounded-xl text-sm font-medium transition-all"
                                >
                                    <Clock className="w-3.5 h-3.5" />
                                    Reset ke Pending
                                </button>
                            )}
                        </div>
                    </div>

                </div>

                {/* Right: Message + Quick Copy */}
                <div className="lg:col-span-2 space-y-4">

                    {/* Message */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-[#80FF00]" />
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Pesan dari {enquiry.full_name}
                            </p>
                        </div>
                        <div className="p-5 min-h-[200px]">
                            {enquiry.message ? (
                                <p className="text-slate-600 whitespace-pre-wrap text-sm leading-relaxed">
                                    {enquiry.message}
                                </p>
                            ) : (
                                <p className="text-slate-400 italic text-sm">Tidak ada pesan yang disertakan.</p>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Quick Actions</p>
                        </div>
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <a
                                href={`mailto:${enquiry.email_address}`}
                                className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors"
                            >
                                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-xs text-slate-400 mb-0.5">Email</p>
                                    <p className="font-mono text-slate-700 text-xs truncate">{enquiry.email_address}</p>
                                </div>
                                <CopyButton text={enquiry.email_address} />
                            </a>
                            {enquiry.phone_number && (
                                <a
                                    href={`https://api.whatsapp.com/send/?phone=${enquiry.phone_number.replace(/\D/g, "")}&text=Halo+${encodeURIComponent(enquiry.full_name)}%2C+kami+dari+Langit+Media+Pro.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-sm font-medium text-emerald-700 transition-colors"
                                >
                                    <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-xs text-emerald-500 mb-0.5">WhatsApp</p>
                                        <p className="font-mono text-emerald-700 text-xs truncate">{enquiry.phone_number}</p>
                                    </div>
                                </a>
                            )}
                            <div className="flex items-center gap-2.5 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3">
                                <Tag className="w-4 h-4 text-indigo-400 shrink-0" />
                                <div>
                                    <p className="text-xs text-indigo-400 mb-0.5">Project Type</p>
                                    <p className="text-xs font-semibold text-indigo-700">{enquiry.project_type}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
