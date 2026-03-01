"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), {
    ssr: false,
    loading: () => <div className="h-64 bg-slate-100 rounded-lg animate-pulse" />,
});

const CATEGORIES = ["Company Profile", "Animation Video", "Website Development"];

export default function EditPortfolioPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const supabase = createClient();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [client, setClient] = useState("");
    const [projectLink, setProjectLink] = useState("");
    const [years, setYears] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [albumFiles, setAlbumFiles] = useState<File[]>([]);
    const [albumPreviews, setAlbumPreviews] = useState<string[]>([]);
    const [existingAlbum, setExistingAlbum] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetch = async () => {
            const { data } = await supabase.from("portfolio").select("*").eq("id", id).single();
            if (data) {
                setTitle(data.title || "");
                setDescription(data.description || "");
                setCategory(data.category || "");
                setClient(data.client || "");
                setProjectLink(data.project_link || "");
                setYears(data.years || "");
                setThumbnailPreview(data.project_thumbnail || null);
                setExistingAlbum(data.project_album || []);
            }
            setFetching(false);
        };
        fetch();
    }, [id]);

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setThumbnailFile(file);
        setThumbnailPreview(URL.createObjectURL(file));
    };

    const handleAlbumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setAlbumFiles((prev) => [...prev, ...files]);
        setAlbumPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    };

    const uploadFile = async (file: File, folder: string): Promise<string | null> => {
        const ext = file.name.split(".").pop();
        const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from("portfolio").upload(path, file);
        if (error) return null;
        const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
        return data.publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!title.trim()) { setError("Title is required."); return; }
        setLoading(true);

        let thumbnailUrl = thumbnailPreview;
        if (thumbnailFile) {
            thumbnailUrl = await uploadFile(thumbnailFile, "thumbnails");
        }

        const newAlbumUrls: string[] = [];
        for (const img of albumFiles) {
            const url = await uploadFile(img, "album");
            if (url) newAlbumUrls.push(url);
        }

        const { error: updateError } = await supabase.from("portfolio").update({
            title, description, category, client,
            project_link: projectLink, years,
            project_thumbnail: thumbnailUrl,
            project_album: [...existingAlbum, ...newAlbumUrls],
        }).eq("id", id);

        if (updateError) { setError(updateError.message); setLoading(false); return; }
        router.push("/lmpadmin/portfolio");
    };

    if (fetching) return (
        <div className="flex items-center justify-center h-64 text-slate-400">Loading portfolio...</div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button type="button" onClick={() => router.back()} className="text-slate-400 hover:text-slate-600">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Edit Portfolio</h1>
                        <p className="text-sm text-slate-500">Update project information</p>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="bg-[#19172A] text-[#80FF00] px-5 py-2 rounded-lg font-semibold text-sm hover:bg-[#2d2b3f] transition-colors disabled:opacity-50">
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm">{error}</div>}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                        <label className="block text-sm font-semibold text-slate-700">Project Title *</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#80FF00]/50 focus:border-[#80FF00]" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                        <label className="block text-sm font-semibold text-slate-700">Project Description</label>
                        <RichTextEditor content={description} onChange={setDescription} />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                        <label className="block text-sm font-semibold text-slate-700">Project Thumbnail</label>
                        {thumbnailPreview ? (
                            <div className="relative">
                                <Image src={thumbnailPreview} alt="Thumbnail" width={800} height={450} className="w-full h-56 object-cover rounded-lg" />
                                <button type="button" onClick={() => { setThumbnailFile(null); setThumbnailPreview(null); }}
                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow text-red-500 hover:text-red-700">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-[#80FF00] hover:bg-slate-50 transition-all">
                                <Upload className="w-8 h-8 text-slate-300 mb-2" />
                                <span className="text-sm text-slate-400">Click to upload thumbnail</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleThumbnailChange} />
                            </label>
                        )}
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-semibold text-slate-700">Project Album</label>
                            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 cursor-pointer bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                                <Plus className="w-3.5 h-3.5" />Add Images
                                <input type="file" className="hidden" accept="image/*" multiple onChange={handleAlbumChange} />
                            </label>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {existingAlbum.map((src, i) => (
                                <div key={`ex-${i}`} className="relative group">
                                    <Image src={src} alt={`Album ${i}`} width={300} height={200} className="w-full h-28 object-cover rounded-lg" />
                                    <button type="button" onClick={() => setExistingAlbum(prev => prev.filter((_, j) => j !== i))}
                                        className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                            {albumPreviews.map((src, i) => (
                                <div key={`new-${i}`} className="relative group">
                                    <Image src={src} alt={`New ${i}`} width={300} height={200} className="w-full h-28 object-cover rounded-lg" />
                                    <button type="button" onClick={() => { setAlbumFiles(p => p.filter((_, j) => j !== i)); setAlbumPreviews(p => p.filter((_, j) => j !== i)); }}
                                        className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                            {existingAlbum.length === 0 && albumPreviews.length === 0 && (
                                <div className="col-span-3 h-20 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-sm text-slate-400">No album images yet</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                        <label className="block text-sm font-semibold text-slate-700">Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#80FF00]/50 bg-white">
                            <option value="">Select category...</option>
                            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                        <label className="block text-sm font-semibold text-slate-700">Client</label>
                        <input type="text" value={client} onChange={(e) => setClient(e.target.value)} placeholder="e.g. PT. Jacos Utama"
                            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#80FF00]/50" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                        <label className="block text-sm font-semibold text-slate-700">Year</label>
                        <input type="text" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g. 2024"
                            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#80FF00]/50" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                        <label className="block text-sm font-semibold text-slate-700">Project Link</label>
                        <input type="url" value={projectLink} onChange={(e) => setProjectLink(e.target.value)} placeholder="https://..."
                            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#80FF00]/50" />
                    </div>
                </div>
            </div>
        </form>
    );
}
