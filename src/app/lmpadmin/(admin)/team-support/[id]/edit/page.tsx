"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Upload, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function EditTeamMemberPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const supabase = createClient();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [fullName, setFullName] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetch = async () => {
            const { data } = await supabase.from("team_lmp").select("*").eq("id", id).single();
            if (data) {
                setFullName(data.full_name || "");
                setJabatan(data.jabatan || "");
                setImagePreview(data.image || null);
            }
            setFetching(false);
        };
        fetch();
    }, [id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const uploadFile = async (file: File): Promise<string | null> => {
        const ext = file.name.split(".").pop();
        const path = `team/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from("portfolio").upload(path, file);
        if (error) return null;
        const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
        return data.publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!fullName.trim()) { setError("Full name is required."); return; }
        setLoading(true);

        let imageUrl = imagePreview;
        if (imageFile) imageUrl = await uploadFile(imageFile);

        const { error: updateError } = await supabase.from("team_lmp").update({
            full_name: fullName,
            jabatan,
            image: imageUrl,
        }).eq("id", id);

        if (updateError) { setError(updateError.message); setLoading(false); return; }
        router.push("/lmpadmin/team-support");
    };

    if (fetching) return <div className="flex items-center justify-center h-64 text-slate-400">Loading member data...</div>;

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button type="button" onClick={() => router.back()} className="text-slate-400 hover:text-slate-600">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Edit Team Member</h1>
                        <p className="text-sm text-slate-500">Update member information</p>
                    </div>
                </div>
                <button type="submit" disabled={loading}
                    className="bg-[#19172A] text-[#80FF00] px-5 py-2 rounded-lg font-semibold text-sm hover:bg-[#2d2b3f] transition-colors disabled:opacity-50">
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm">{error}</div>}

            {/* Profile Photo */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col items-center gap-4">
                <p className="text-sm font-semibold text-slate-700 self-start">Profile Photo</p>
                <div className="relative">
                    {imagePreview ? (
                        <div className="relative">
                            <Image src={imagePreview} alt="Preview" width={120} height={120}
                                className="w-28 h-28 rounded-full object-cover border-4 border-slate-100 shadow" />
                            <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); }}
                                className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow text-red-500 hover:text-red-700 border border-slate-200">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 border-dashed border-slate-200 cursor-pointer hover:border-[#80FF00] hover:bg-slate-50 transition-all">
                            <Upload className="w-6 h-6 text-slate-300 mb-1" />
                            <span className="text-xs text-slate-400 text-center">Upload Photo</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    )}
                </div>
                {!imagePreview && (
                    <label className="text-xs text-slate-500 cursor-pointer hover:text-slate-700 underline underline-offset-2">
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />Browse file
                    </label>
                )}
            </div>

            {/* Full Name */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                <label className="block text-sm font-semibold text-slate-700">Full Name *</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required
                    placeholder="e.g. Budi Santoso"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#80FF00]/50 focus:border-[#80FF00] transition-all" />
            </div>

            {/* Jabatan */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                <label className="block text-sm font-semibold text-slate-700">Jabatan / Position</label>
                <input type="text" value={jabatan} onChange={(e) => setJabatan(e.target.value)}
                    placeholder="e.g. Creative Director"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#80FF00]/50 focus:border-[#80FF00] transition-all" />
            </div>
        </form>
    );
}
