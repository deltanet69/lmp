"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Eye, Pencil, Trash2, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { logActivity } from "@/lib/activityLog";

interface Portfolio {
    id: string;
    title: string;
    category: string;
    client: string;
    project_link: string;
    created_at: string;
}

export default function PortfolioPage() {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);
    const supabase = createClient();

    const fetchPortfolios = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("portfolio")
            .select("id, title, category, client, project_link, created_at")
            .order("created_at", { ascending: false });
        if (!error && data) setPortfolios(data);
        setLoading(false);
    };

    useEffect(() => { fetchPortfolios(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus portfolio ini?")) return;
        setDeleting(id);
        // Get title before deleting
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

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-8">#</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project Name</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project Link</th>
                                <th className="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center text-slate-400">Loading portfolios...</td>
                                </tr>
                            ) : portfolios.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center text-slate-400">No portfolios yet. Click "Add Portfolio" to create one.</td>
                                </tr>
                            ) : (
                                portfolios.map((p, i) => (
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
