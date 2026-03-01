"use client";

import { useEffect, useState } from "react";
import {
    Save, MapPin, Phone, Mail, Instagram, Youtube, Globe,
    Search, BarChart2, Link2, Facebook, Music2
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface WebSetting {
    id?: string;
    address: string;
    whatsapp: string;
    email: string;
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    google_analytics_id: string;
    google_search_console: string;
    bing_webmaster: string;
    og_image: string;
}

const EMPTY: WebSetting = {
    address: "",
    whatsapp: "",
    email: "",
    instagram: "",
    facebook: "",
    youtube: "",
    tiktok: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    google_analytics_id: "",
    google_search_console: "",
    bing_webmaster: "",
    og_image: "",
};

export default function WebSettingPage() {
    const supabase = createClient();
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<WebSetting>(EMPTY);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const { data: row } = await supabase.from("web_setting").select("*").maybeSingle();
            if (row) setData(row);
            setLoading(false);
        };
        fetch();
    }, []);

    const set = (key: keyof WebSetting) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const handleSave = async () => {
        setSaving(true);
        setSuccess(false);
        let error;
        if (data.id) {
            const { error: e } = await supabase.from("web_setting").update(data).eq("id", data.id);
            error = e;
        } else {
            const { data: inserted, error: e } = await supabase.from("web_setting").insert([data]).select().single();
            if (inserted) setData(inserted);
            error = e;
        }
        setSaving(false);
        if (!error) setSuccess(true);
        else alert("Error: " + error.message);
    };

    if (loading) return <div className="text-slate-400 p-6">Loading settings...</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Web Setting</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage contact info, social links, and SEO settings</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#19172A] text-[#80FF00] px-6 py-2.5 rounded-xl font-bold hover:bg-[#2d2b3f] transition-all disabled:opacity-50 shadow-md"
                >
                    <Save className="w-5 h-5" />
                    {saving ? "Saving..." : "Save Settings"}
                </button>
            </div>

            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">
                    ✓ Settings saved successfully!
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                    <SectionTitle icon={<MapPin className="w-4 h-4 text-[#80FF00]" />} title="Contact Information" />

                    <FormField label="Office Address" icon={<MapPin className="w-4 h-4 text-slate-400" />}>
                        <textarea
                            value={data.address}
                            onChange={set("address")}
                            rows={3}
                            placeholder="Jl. Contoh No. 1, Jakarta"
                            className={inputClass + " resize-none"}
                        />
                    </FormField>

                    <FormField label="WhatsApp Number" icon={<Phone className="w-4 h-4 text-slate-400" />}>
                        <input type="text" value={data.whatsapp} onChange={set("whatsapp")}
                            placeholder="+6281234567890" className={inputClass} />
                    </FormField>

                    <FormField label="Contact Email" icon={<Mail className="w-4 h-4 text-slate-400" />}>
                        <input type="email" value={data.email} onChange={set("email")}
                            placeholder="info@company.com" className={inputClass} />
                    </FormField>
                </div>

                {/* Social Media */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                    <SectionTitle icon={<Link2 className="w-4 h-4 text-[#80FF00]" />} title="Social Media Links" />

                    <FormField label="Instagram" icon={<Instagram className="w-4 h-4 text-pink-400" />}>
                        <input type="url" value={data.instagram} onChange={set("instagram")}
                            placeholder="https://instagram.com/yourpage" className={inputClass} />
                    </FormField>

                    <FormField label="Facebook" icon={<Facebook className="w-4 h-4 text-blue-500" />}>
                        <input type="url" value={data.facebook} onChange={set("facebook")}
                            placeholder="https://facebook.com/yourpage" className={inputClass} />
                    </FormField>

                    <FormField label="YouTube" icon={<Youtube className="w-4 h-4 text-red-500" />}>
                        <input type="url" value={data.youtube} onChange={set("youtube")}
                            placeholder="https://youtube.com/@yourchannel" className={inputClass} />
                    </FormField>

                    <FormField label="TikTok" icon={<Music2 className="w-4 h-4 text-slate-600" />}>
                        <input type="url" value={data.tiktok} onChange={set("tiktok")}
                            placeholder="https://tiktok.com/@yourpage" className={inputClass} />
                    </FormField>
                </div>

                {/* SEO Meta */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                    <SectionTitle icon={<Search className="w-4 h-4 text-[#80FF00]" />} title="SEO & Metadata" />

                    <FormField label="Meta Title" icon={<Globe className="w-4 h-4 text-slate-400" />}>
                        <input type="text" value={data.meta_title} onChange={set("meta_title")}
                            placeholder="Langit Media Pro – Trusted Production Partner"
                            className={inputClass} />
                    </FormField>

                    <FormField label="Meta Description" icon={<Globe className="w-4 h-4 text-slate-400" />}>
                        <textarea
                            value={data.meta_description}
                            onChange={set("meta_description")}
                            rows={3}
                            placeholder="Short description for Google & Bing search results (max 160 chars)"
                            maxLength={160}
                            className={inputClass + " resize-none"}
                        />
                        <p className="text-right text-xs text-slate-400">{data.meta_description?.length || 0}/160</p>
                    </FormField>

                    <FormField label="Meta Keywords" icon={<Search className="w-4 h-4 text-slate-400" />}>
                        <input type="text" value={data.meta_keywords} onChange={set("meta_keywords")}
                            placeholder="production house, video company, motion graphic, jakarta"
                            className={inputClass} />
                        <p className="text-xs text-slate-400 mt-1">Separate keywords with commas</p>
                    </FormField>

                    <FormField label="OG Image URL" icon={<Globe className="w-4 h-4 text-slate-400" />}>
                        <input type="url" value={data.og_image} onChange={set("og_image")}
                            placeholder="https://yourdomain.com/og-image.jpg"
                            className={inputClass} />
                        <p className="text-xs text-slate-400 mt-1">Image shown when shared on social media (1200×630px recommended)</p>
                    </FormField>
                </div>

                {/* Analytics & Webmaster */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                    <SectionTitle icon={<BarChart2 className="w-4 h-4 text-[#80FF00]" />} title="Analytics & Search Console" />

                    <FormField label="Google Analytics 4 (Measurement ID)" icon={<BarChart2 className="w-4 h-4 text-orange-400" />}>
                        <input type="text" value={data.google_analytics_id} onChange={set("google_analytics_id")}
                            placeholder="G-XXXXXXXXXX" className={inputClass} />
                        <p className="text-xs text-slate-400 mt-1">Enables automatic page-view tracking via Google</p>
                    </FormField>

                    <FormField label="Google Search Console Verification" icon={<Search className="w-4 h-4 text-blue-400" />}>
                        <input type="text" value={data.google_search_console} onChange={set("google_search_console")}
                            placeholder="Paste the content value from the meta tag"
                            className={inputClass} />
                        <p className="text-xs text-slate-400 mt-1">
                            From: <code className="bg-slate-100 px-1 rounded">{"<meta name=\"google-site-verification\" content=\"..."}</code>
                        </p>
                    </FormField>

                    <FormField label="Bing Webmaster Verification" icon={<Search className="w-4 h-4 text-slate-500" />}>
                        <input type="text" value={data.bing_webmaster} onChange={set("bing_webmaster")}
                            placeholder="Paste the content value from the Bing meta tag"
                            className={inputClass} />
                        <p className="text-xs text-slate-400 mt-1">
                            From: <code className="bg-slate-100 px-1 rounded">{"<meta name=\"msvalidate.01\" content=\"..."}</code>
                        </p>
                    </FormField>
                </div>
            </div>
        </div>
    );
}

const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#80FF00]/40 focus:border-[#80FF00] focus:bg-white transition-all";

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
    return (
        <h2 className="font-bold text-slate-700 flex items-center gap-2 pb-2 border-b border-slate-100">
            {icon}
            {title}
        </h2>
    );
}

function FormField({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5 uppercase tracking-wider">
                {icon}
                {label}
            </label>
            {children}
        </div>
    );
}
