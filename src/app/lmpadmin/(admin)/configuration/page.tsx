"use client";

import { useEffect, useState } from "react";
import { Save, Upload, X, FileVideo, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

interface ConfigData {
    id?: string;
    logo: string | null;
    hero_image: string | null;
    about_image: string | null;
    page_header: string | null;
}

export default function ConfigurationPage() {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState<ConfigData>({
        logo: null,
        hero_image: null,
        about_image: null,
        page_header: null,
    });

    const [previews, setPreviews] = useState<{ [key: string]: string | null }>({});
    const [files, setFiles] = useState<{ [key: string]: File | null }>({});

    useEffect(() => {
        const fetchConfig = async () => {
            const { data: config, error } = await supabase.from("configuration").select("*").maybeSingle();
            if (config) {
                setData(config);
                setPreviews({
                    logo: config.logo,
                    hero_image: config.hero_image,
                    about_image: config.about_image,
                    page_header: config.page_header,
                });
            }
            setLoading(false);
        };
        fetchConfig();
    }, []);

    const handleFileChange = (key: keyof ConfigData, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFiles((prev) => ({ ...prev, [key]: file }));
        setPreviews((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
    };

    const uploadFile = async (file: File, folder: string): Promise<string | null> => {
        const ext = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const path = `config/${folder}/${fileName}`;

        const { error: uploadError } = await supabase.storage.from("portfolio").upload(path, file);
        if (uploadError) {
            console.error("Upload error:", uploadError);
            return null;
        }

        const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
        return data.publicUrl;
    };

    const handleSave = async () => {
        setSaving(true);
        const updatedData: Partial<ConfigData> = { ...data };

        // Upload new files if any
        for (const key of Object.keys(files)) {
            const file = files[key];
            if (file) {
                const url = await uploadFile(file, key);
                if (url) updatedData[key as keyof ConfigData] = url;
            }
        }

        let error;
        if (data.id) {
            const { error: updateError } = await supabase
                .from("configuration")
                .update(updatedData)
                .eq("id", data.id);
            error = updateError;
        } else {
            const { data: inserted, error: insertError } = await supabase
                .from("configuration")
                .insert([updatedData])
                .select()
                .single();
            if (inserted) setData(inserted);
            error = insertError;
        }

        if (!error) {
            alert("Configuration saved successfully!");
            setFiles({});
        } else {
            alert("Error saving configuration: " + error.message);
        }
        setSaving(false);
    };

    if (loading) return <div className="p-8 text-slate-400">Loading configurations...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Configuration</h1>
                    <p className="text-sm text-slate-500 mt-1">Update website assets and main content</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#19172A] text-[#80FF00] px-6 py-2.5 rounded-xl font-bold hover:bg-[#2d2b3f] transition-all disabled:opacity-50 shadow-md"
                >
                    <Save className="w-5 h-5" />
                    {saving ? "Saving Changes..." : "Save Configuration"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Website Logo */}
                <ConfigItem
                    label="Website Logo"
                    description="Used in Navbar and Footer. Recommended: PNG with transparency."
                    preview={previews.logo}
                    onFileChange={(e) => handleFileChange("logo", e)}
                    type="image"
                    accept=".png"
                />

                {/* Hero Image / Video */}
                <ConfigItem
                    label="Hero Banner"
                    description="Main background for the homepage. Supports Images and Videos."
                    preview={previews.hero_image}
                    onFileChange={(e) => handleFileChange("hero_image", e)}
                    type="media"
                    accept=".png,.jpg,.jpeg,.mp4"
                />

                {/* Page Header */}
                <ConfigItem
                    label="Page Header Background"
                    description="Default background for sub-page headers."
                    preview={previews.page_header}
                    onFileChange={(e) => handleFileChange("page_header", e)}
                    type="image"
                    accept=".png,.jpg,.jpeg"
                />

                {/* About Image */}
                <ConfigItem
                    label="About Us Image"
                    description="Featured image in the About section."
                    preview={previews.about_image}
                    onFileChange={(e) => handleFileChange("about_image", e)}
                    type="image"
                    accept=".png,.jpg,.jpeg"
                />
            </div>
        </div>
    );
}

interface ConfigItemProps {
    label: string;
    description: string;
    preview: string | null;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: "image" | "media";
    accept: string;
}

function ConfigItem({ label, description, preview, onFileChange, type, accept }: ConfigItemProps) {
    const isVideo = preview?.toLowerCase().endsWith(".mp4") || preview?.includes("video");

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow group">
            <div>
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    {type === "image" ? <ImageIcon className="w-4 h-4 text-[#80FF00]" /> : <FileVideo className="w-4 h-4 text-[#80FF00]" />}
                    {label}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{description}</p>
            </div>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 group-hover:border-[#80FF00]/50 transition-colors">
                {preview ? (
                    <>
                        {isVideo ? (
                            <video src={preview} className="w-full h-full object-cover" controls={false} muted loop autoPlay />
                        ) : (
                            <Image src={preview} alt={label} fill className="object-cover" />
                        )}
                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/30 text-white text-sm font-semibold flex items-center gap-2">
                                <Upload className="w-4 h-4" />
                                Change File
                            </div>
                            <input type="file" className="hidden" accept={accept} onChange={onFileChange} />
                        </label>
                    </>
                ) : (
                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors">
                        <Upload className="w-8 h-8 text-slate-300 mb-2" />
                        <span className="text-sm font-medium text-slate-400">Upload {label}</span>
                        <input type="file" className="hidden" accept={accept} onChange={onFileChange} />
                    </label>
                )}
            </div>
        </div>
    );
}
