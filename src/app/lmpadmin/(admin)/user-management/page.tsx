"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserPlus, Pencil, Trash2, Mail, Shield, Calendar, User as UserIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface UserAdmin {
    id: string;
    full_name: string;
    email: string;
    user_role: string;
    created_at: string;
    profile_image: string | null;
}

export default function UserManagementPage() {
    const [users, setUsers] = useState<UserAdmin[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);
    const supabase = createClient();

    const fetchUsers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("useradmin")
            .select("*")
            .order("created_at", { ascending: false });
        if (!error && data) setUsers(data);
        setLoading(false);
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleDelete = async (id: string, email: string) => {
        if (confirm(`Are you sure you want to delete user ${email}?`)) {
            setDeleting(id);
            const { error } = await supabase.from("useradmin").delete().eq("id", id);
            if (error) alert(error.message);
            else await fetchUsers();
            setDeleting(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage admin accounts and permissions</p>
                </div>
                <Link
                    href="/lmpadmin/user-management/create"
                    className="flex items-center gap-2 bg-[#19172A] text-[#80FF00] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#2d2b3f] transition-colors"
                >
                    <UserPlus className="w-4 h-4" />
                    Add User
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-12">#</th>
                                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">User Details</th>
                                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Role</th>
                                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Joined Date</th>
                                <th className="text-center px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-slate-400">Loading users...</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-slate-400">No admin users found.</td>
                                </tr>
                            ) : (
                                users.map((u, i) => (
                                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-5 py-4 text-slate-400 font-mono text-xs">{i + 1}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden ring-2 ring-transparent group-hover:ring-[#80FF00]/30 transition-all">
                                                    {u.profile_image ? (
                                                        <img src={u.profile_image} alt={u.full_name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <UserIcon className="w-5 h-5 text-slate-400" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-700 leading-tight">{u.full_name}</span>
                                                    <span className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        {u.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${u.user_role === 'superadmin'
                                                    ? 'bg-red-50 text-red-600 border border-red-100'
                                                    : 'bg-[#80FF00]/10 text-[#5fc000] border border-[#80FF00]/20'
                                                }`}>
                                                <Shield className="w-3 h-3" />
                                                {u.user_role}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-slate-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5 text-slate-300" />
                                                {new Date(u.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    href={`/lmpadmin/user-management/${u.id}/edit`}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(u.id, u.email)}
                                                    disabled={deleting === u.id}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
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
