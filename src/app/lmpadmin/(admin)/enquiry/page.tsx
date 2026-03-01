"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Trash2, Mail, Phone, MessageSquare } from "lucide-react";
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

export default function EnquiryPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);
    const supabase = createClient();

    const fetchEnquiries = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("enquiry")
            .select("*")
            .order("created_at", { ascending: false });
        if (!error && data) setEnquiries(data);
        setLoading(false);
    };

    useEffect(() => { fetchEnquiries(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this enquiry?")) return;
        setDeleting(id);
        await supabase.from("enquiry").delete().eq("id", id);
        await fetchEnquiries();
        setDeleting(null);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Enquiries</h1>
                <p className="text-sm text-slate-500 mt-1">Manage project enquiries from your website</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-8">#</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project Type</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center text-slate-400">Loading enquiries...</td>
                                </tr>
                            ) : enquiries.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center text-slate-400">No enquiries received yet.</td>
                                </tr>
                            ) : (
                                enquiries.map((e, i) => (
                                    <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-5 py-3.5 text-slate-400 font-mono text-xs">{i + 1}</td>
                                        <td className="px-5 py-3.5 font-semibold text-slate-700">{e.full_name}</td>
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
                                        <td className="px-5 py-3.5 text-slate-500 text-xs text-nowrap">
                                            {new Date(e.created_at).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    href={`/lmpadmin/enquiry/${e.id}`}
                                                    className="p-1.5 rounded-md text-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(e.id)}
                                                    disabled={deleting === e.id}
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
