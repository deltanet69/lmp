"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, User as UserIcon, Shield, Mail, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function CreateUserPage() {
    const router = useRouter();
    const supabase = createClient();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        user_role: "admin",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { error: insertError } = await supabase.from("useradmin").insert([formData]);

        if (insertError) {
            setError(insertError.message);
            setLoading(false);
        } else {
            router.push("/lmpadmin/user-management");
        }
    };

    return (
        <div className="max-w-2xl space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Add New User</h1>
                        <p className="text-sm text-slate-500">Create a new admin account</p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm italic">
                    Error: {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
                    {/* Full Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-[#80FF00]" />
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            placeholder="e.g. John Doe"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#80FF00]/50 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#80FF00]" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#80FF00]/50 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Lock className="w-4 h-4 text-[#80FF00]" />
                            Temporary Password
                        </label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Min. 6 characters"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#80FF00]/50 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-[#80FF00]" />
                            Access Level (Role)
                        </label>
                        <select
                            value={formData.user_role}
                            onChange={(e) => setFormData({ ...formData, user_role: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#80FF00]/50 focus:bg-white transition-all appearance-none"
                        >
                            <option value="admin">Administrator (Standard)</option>
                            <option value="superadmin">Superadmin (Full Access)</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-grow flex items-center justify-center gap-2 bg-[#19172A] text-[#80FF00] py-4 rounded-xl font-bold hover:bg-[#2d2b3f] transition-all disabled:opacity-50 shadow-md"
                    >
                        <Save className="w-5 h-5" />
                        {loading ? "Creating User..." : "Create Account"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-8 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
