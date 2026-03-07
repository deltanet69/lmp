"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, UserCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface TeamMember {
    id: string;
    full_name: string;
    jabatan: string;
    image: string | null;
    created_at: string;
}

export default function TeamSupportPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);
    const supabase = createClient();

    const fetchMembers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("team_lmp")
            .select("id, full_name, jabatan, image, created_at")
            .order("created_at", { ascending: false });
        if (!error && data) setMembers(data);
        setLoading(false);
    };

    useEffect(() => { fetchMembers(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus anggota tim ini?")) return;
        setDeleting(id);
        await supabase.from("team_lmp").delete().eq("id", id);
        await fetchMembers();
        setDeleting(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Team Support</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your team members</p>
                </div>
                <Link
                    href="/lmpadmin/team-support/create"
                    className="flex items-center gap-2 bg-[#19172A] text-[#80FF00] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#2d2b3f] transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Member
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-8">#</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Photo</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Position (Jabatan)</th>
                                <th className="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center text-slate-400">Loading team members...</td>
                                </tr>
                            ) : members.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center text-slate-400">No team members yet. Click "Add Member" to create one.</td>
                                </tr>
                            ) : (
                                members.map((m: TeamMember, i: number) => {
                                    // Optimization: Manual image resizing for Supabase to reduce payload since Next.js optimization is disabled
                                    const imageUrl = m.image?.includes('supabase.co')
                                        ? `${m.image}?width=80&height=80&resize=cover`
                                        : m.image;

                                    return (
                                        <tr key={m.id} className="hover:bg-slate-50/80 group">
                                            <td className="px-5 py-3 text-slate-400 font-mono text-xs">{i + 1}</td>
                                            <td className="px-5 py-3">
                                                {imageUrl ? (
                                                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100">
                                                        <img
                                                            src={imageUrl}
                                                            alt={m.full_name}
                                                            className="w-full h-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                                                        <UserCircle className="w-6 h-6 text-slate-300" />
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-5 py-3 font-semibold text-slate-700">
                                                <Link
                                                    href={`/lmpadmin/team-support/${m.id}/edit`}
                                                    className="hover:text-[#19172A]"
                                                >
                                                    {m.full_name}
                                                </Link>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-600 border border-purple-100/50">
                                                    {m.jabatan || "—"}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3">
                                                <div className="flex items-center justify-center gap-1.5 opacity-60 group-hover:opacity-100">
                                                    <Link
                                                        href={`/lmpadmin/team-support/${m.id}/edit`}
                                                        className="p-1.5 rounded-md text-slate-400 hover:bg-white hover:text-blue-500 hover:shadow-sm border border-transparent hover:border-slate-100"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(m.id)}
                                                        disabled={deleting === m.id}
                                                        className="p-1.5 rounded-md text-slate-400 hover:bg-white hover:text-red-500 hover:shadow-sm border border-transparent hover:border-slate-100 disabled:opacity-30"
                                                        title="Delete"
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
