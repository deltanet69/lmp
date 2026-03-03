"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Eye, Pencil, Trash2, ExternalLink, Search, X, SlidersHorizontal } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { logActivity } from "@/lib/activityLog";

interface Portfolio {
    id: string;
    title: string;
    category: string;
    client: string;
    project_link: string;
    project_quality: string | null;
    created_at: string;
}

const QUALITY_BADGE: Record<string, { label: string; className: string }> = {
    standard: { label: "Standard", className: "bg-slate-100 text-slate-600 border border-slate-300" },
    medium: { label: "Medium", className: "bg-blue-50 text-blue-700 border border-blue-300" },
    high: { label: "High", className: "bg-amber-50 text-amber-700 border border-amber-300" },
};

const CATEGORIES = ["Company Profile", "Animation Video", "Website Development"];
const QUALITIES = ["standard", "medium", "high"];

export default function PortfolioPage() {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);

    // ── Filter state ──────────────────────────────────────────────────────────
    const [search, setSearch] = useState("");
    const [catFilter, setCatFilter] = useState("all");
    const [qualFilter, setQualFilter] = useState("all");

    const supabase = createClient();

    const fetchPortfolios = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("portfolio")
            .select("id, title, category, client, project_link, project_quality, created_at")
            .order("created_at", { ascending: false });
        if (!error && data) setPortfolios(data);
        setLoading(false);
    };

    useEffect(() => { fetchPortfolios(); }, []);

    // ── Filtered list ─────────────────────────────────────────────────────────
    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        return portfolios.filter((p) => {
            const matchSearch = !q || p.title.toLowerCase().includes(q) || (p.client || "").toLowerCase().includes(q);
            const matchCat = catFilter === "all" || p.category === catFilter;
            const matchQual = qualFilter === "all" || p.project_quality === qualFilter;
            return matchSearch && matchCat && matchQual;
        });
    }, [portfolios, search, catFilter, qualFilter]);

    const hasActiveFilter = search || catFilter !== "all" || qualFilter !== "all";

    const clearFilters = () => {
        setSearch("");
        setCatFilter("all");
        setQualFilter("all");
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus portfolio ini?")) return;
        setDeleting(id);
        const { data: row } = await supabase.from("portfolio").select("title").eq("id", id).single();
        await supabase.from("portfolio").delete().eq("id", id);
        await logActivity({
            action: "deleted",
            entity: "portfolio",
            entity_id: id,
            entity_title: row?.title || "Unknown",
        });
        await fetchPortfolios();
        setDeleting(null);
    };

    return (
        <div className="space-y-6">
            {/* ── Header ── */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Portfolio</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your project portfolio</p>
                </div>
                <Link
                    href="/lmpadmin/portfolio/create"
                    className="flex items-center gap-2 bg-[#19172A] text-[#80FF00] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#2d2b3f] transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Portfolio
                </Link>
            </div>

            {/* ── Filter Bar ── */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari project atau client..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#80FF00]/50 focus:border-[#19172A]/30 transition-all"
                        />
                    </div>

                    {/* Category filter */}
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
                        <select
                            value={catFilter}
                            onChange={(e) => setCatFilter(e.target.value)}
                            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#80FF00]/50 bg-white min-w-[160px]"
                        >
                            <option value="all">Semua Category</option>
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* Quality filter */}
                    <div>
                        <select
                            value={qualFilter}
                            onChange={(e) => setQualFilter(e.target.value)}
                            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#80FF00]/50 bg-white min-w-[150px]"
                        >
                            <option value="all">Semua Quality</option>
                            {QUALITIES.map((q) => (
                                <option key={q} value={q}>{QUALITY_BADGE[q]?.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Clear button */}
                    {hasActiveFilter && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 text-sm font-medium transition-colors shrink-0"
                        >
                            <X className="w-3.5 h-3.5" />
                            Reset
                        </button>
                    )}
                </div>

                {/* Result count */}
                <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                        Menampilkan <span className="font-semibold text-slate-700">{filtered.length}</span> dari <span className="font-semibold text-slate-700">{portfolios.length}</span> project
                    </span>
                    {hasActiveFilter && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#19172A] text-[#80FF00]">
                            FILTER AKTIF
                        </span>
                    )}
                </div>
            </div>

            {/* ── Table ── */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-8">#</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project Name</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Quality</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project Link</th>
                                <th className="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="py-16 text-center text-slate-400">Loading portfolios...</td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-16 text-center">
                                        <div className="flex flex-col items-center gap-2 text-slate-400">
                                            <Search className="w-8 h-8 opacity-30" />
                                            <p className="text-sm">
                                                {portfolios.length === 0
                                                    ? "Belum ada portfolio. Klik \"Add Portfolio\" untuk menambahkan."
                                                    : "Tidak ada project yang cocok dengan filter ini."}
                                            </p>
                                            {hasActiveFilter && (
                                                <button onClick={clearFilters} className="text-xs text-blue-500 hover:underline">
                                                    Hapus semua filter
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((p, i) => (
                                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-5 py-3.5 text-slate-400 font-mono text-xs">{i + 1}</td>
                                        <td className="px-5 py-3.5 font-semibold text-slate-700">
                                            <Link
                                                href={`/lmpadmin/portfolio/${p.id}/edit`}
                                                className="hover:text-[#19172A] hover:underline decoration-[#80FF00] underline-offset-2 transition-colors"
                                            >
                                                {p.title}
                                            </Link>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                {p.category || "—"}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            {p.project_quality && QUALITY_BADGE[p.project_quality] ? (
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${QUALITY_BADGE[p.project_quality].className}`}>
                                                    {QUALITY_BADGE[p.project_quality].label}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 text-xs">—</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5 text-slate-600">{p.client || "—"}</td>
                                        <td className="px-5 py-3.5">
                                            {p.project_link ? (
                                                <a
                                                    href={p.project_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-blue-600 hover:underline max-w-[180px] truncate"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                                    {p.project_link.replace(/^https?:\/\//, "")}
                                                </a>
                                            ) : (
                                                <span className="text-slate-400">—</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    href={`/lmpadmin/portfolio/${p.id}`}
                                                    className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/lmpadmin/portfolio/${p.id}/edit`}
                                                    className="p-1.5 rounded-md text-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(p.id)}
                                                    disabled={deleting === p.id}
                                                    className="p-1.5 rounded-md text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
