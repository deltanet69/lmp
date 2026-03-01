"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
    Trash2, Mail, Phone, Clock, CheckCircle2, XCircle,
    Search, Filter, ChevronDown, X
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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

const STATUS_BADGE: Record<Status, { label: string; className: string; icon: React.ReactNode }> = {
    pending: {
        label: "Pending",
        className: "bg-amber-100 text-amber-700 border border-amber-200",
        icon: <Clock className="w-3 h-3" />,
    },
    contacted: {
        label: "Contacted",
        className: "bg-emerald-100 text-emerald-700 border border-emerald-200",
        icon: <CheckCircle2 className="w-3 h-3" />,
    },
    rejected: {
        label: "Rejected",
        className: "bg-red-100 text-red-600 border border-red-200",
        icon: <XCircle className="w-3 h-3" />,
    },
};

const PROJECT_TYPES = ["Company Profile", "Animation Video", "Website Development"];

const PERIODS = [
    { label: "Semua Waktu", value: "" },
    { label: "Hari ini", value: "today" },
    { label: "7 Hari Terakhir", value: "7d" },
    { label: "30 Hari Terakhir", value: "30d" },
    { label: "Bulan ini", value: "month" },
];

function isInPeriod(dateStr: string, period: string): boolean {
    if (!period) return true;
    const date = new Date(dateStr);
    const now = new Date();
    if (period === "today") {
        return date.toDateString() === now.toDateString();
    }
    if (period === "7d") {
        return Date.now() - date.getTime() <= 7 * 86400000;
    }
    if (period === "30d") {
        return Date.now() - date.getTime() <= 30 * 86400000;
    }
    if (period === "month") {
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }
    return true;
}

export default function EnquiryPage() {
    const supabase = createClient();
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);

    // Filters
    const [search, setSearch] = useState("");
    const [filterProject, setFilterProject] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterPeriod, setFilterPeriod] = useState("");
    const [filtersOpen, setFiltersOpen] = useState(false);

    const fetchEnquiries = async () => {
        setLoading(true);
        const { data } = await supabase
            .from("enquiry")
            .select("*")
            .order("created_at", { ascending: false });
        if (data) setEnquiries(data as Enquiry[]);
        setLoading(false);
    };

    useEffect(() => { fetchEnquiries(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus enquiry ini?")) return;
        setDeleting(id);
        await supabase.from("enquiry").delete().eq("id", id);
        await fetchEnquiries();
        setDeleting(null);
    };

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return enquiries.filter((e) => {
            const matchSearch = !q || e.full_name.toLowerCase().includes(q)
                || e.email_address.toLowerCase().includes(q)
                || (e.phone_number || "").includes(q)
                || e.project_type.toLowerCase().includes(q);
            const matchProject = !filterProject || e.project_type === filterProject;
            const matchStatus = !filterStatus || (e.status || "pending") === filterStatus;
            const matchPeriod = isInPeriod(e.created_at, filterPeriod);
            return matchSearch && matchProject && matchStatus && matchPeriod;
        });
    }, [enquiries, search, filterProject, filterStatus, filterPeriod]);

    const activeFilterCount = [filterProject, filterStatus, filterPeriod].filter(Boolean).length;

    const clearFilters = () => {
        setFilterProject("");
        setFilterStatus("");
        setFilterPeriod("");
        setSearch("");
    };

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Enquiries</h1>
                <p className="text-sm text-slate-500 mt-1">Manage project enquiries from your website</p>
            </div>

            {/* Search + Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari nama, email, atau project..."
                        className="w-full pl-9 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#80FF00]/40 focus:border-[#80FF00] transition-all shadow-sm"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>

                {/* Filter Toggle */}
                <button
                    onClick={() => setFiltersOpen((v) => !v)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all shadow-sm ${filtersOpen || activeFilterCount > 0
                        ? "bg-[#19172A] text-white border-[#19172A]"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                        }`}
                >
                    <Filter className="w-4 h-4" />
                    Filter
                    {activeFilterCount > 0 && (
                        <span className="bg-[#80FF00] text-[#19172A] text-xs font-bold px-1.5 py-0.5 rounded-full">
                            {activeFilterCount}
                        </span>
                    )}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
                </button>

                {activeFilterCount > 0 && (
                    <button onClick={clearFilters} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-all shadow-sm">
                        <X className="w-3.5 h-3.5" />
                        Reset
                    </button>
                )}
            </div>

            {/* Filter Panel */}
            {filtersOpen && (
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Project Type */}
                    <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                            Project Type
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {PROJECT_TYPES.map((pt) => (
                                <button
                                    key={pt}
                                    onClick={() => setFilterProject(filterProject === pt ? "" : pt)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterProject === pt
                                        ? "bg-indigo-500 text-white"
                                        : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                                        }`}
                                >
                                    {pt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                            Status
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {(["pending", "contacted", "rejected"] as Status[]).map((s) => {
                                const b = STATUS_BADGE[s];
                                return (
                                    <button
                                        key={s}
                                        onClick={() => setFilterStatus(filterStatus === s ? "" : s)}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${filterStatus === s ? b.className + " opacity-100" : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"}`}
                                    >
                                        {b.icon}{b.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Period */}
                    <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                            Periode
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {PERIODS.filter((p) => p.value).map((p) => (
                                <button
                                    key={p.value}
                                    onClick={() => setFilterPeriod(filterPeriod === p.value ? "" : p.value)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterPeriod === p.value
                                        ? "bg-[#19172A] text-white"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                        }`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Result Count */}
            {!loading && (
                <p className="text-sm text-slate-400">
                    Menampilkan <span className="font-semibold text-slate-600">{filtered.length}</span> dari {enquiries.length} enquiry
                </p>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-8">#</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project Type</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan={7} className="py-16 text-center text-slate-400">Loading enquiries...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-16 text-center">
                                        <p className="text-slate-400 text-base">Tidak ada hasil ditemukan.</p>
                                        {(search || activeFilterCount > 0) && (
                                            <button onClick={clearFilters} className="mt-2 text-sm text-indigo-500 hover:underline">
                                                Reset filter
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((e, i) => {
                                    const status = (e.status || "pending") as Status;
                                    const badge = STATUS_BADGE[status];
                                    return (
                                        <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-5 py-3.5 text-slate-400 font-mono text-xs">{i + 1}</td>
                                            <td className="px-5 py-3.5">
                                                <Link
                                                    href={`/lmpadmin/enquiry/${e.id}`}
                                                    className="font-semibold text-slate-700 hover:text-[#19172A] hover:underline decoration-[#80FF00] underline-offset-2 transition-colors"
                                                >
                                                    {e.full_name}
                                                </Link>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1.5 text-slate-600">
                                                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                                                        <span className="text-xs">{e.email_address}</span>
                                                    </div>
                                                    {e.phone_number && (
                                                        <div className="flex items-center gap-1.5 text-slate-600">
                                                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                                                            <span className="text-xs">{e.phone_number}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                                                    {e.project_type || "General"}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge.className}`}>
                                                    {badge.icon}{badge.label}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 text-slate-500 text-xs text-nowrap">
                                                {new Date(e.created_at).toLocaleDateString("id-ID", {
                                                    day: "2-digit", month: "short", year: "numeric",
                                                    hour: "2-digit", minute: "2-digit"
                                                })}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleDelete(e.id)}
                                                        disabled={deleting === e.id}
                                                        className="p-1.5 rounded-md text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
