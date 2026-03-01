"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Pencil, ExternalLink, Calendar, User, Tag } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Portfolio {
    id: string;
    title: string;
    description: string;
    category: string;
    client: string;
    project_link: string;
    years: string;
    project_thumbnail: string;
    project_album: string[];
    created_at: string;
}

export default function ViewPortfolioPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const supabase = createClient();
    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const { data } = await supabase.from("portfolio").select("*").eq("id", id).single();
            if (data) setPortfolio(data);
            setLoading(false);
        };
        fetch();
    }, [id]);

    if (loading) return <div className="flex items-center justify-center h-64 text-slate-400">Loading...</div>;
    if (!portfolio) return <div className="text-center text-slate-400 py-20">Portfolio not found.</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button type="button" onClick={() => router.back()} className="text-slate-400 hover:text-slate-600">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">{portfolio.title}</h1>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 mt-1">
                            {portfolio.category || "Uncategorized"}
                        </span>
                    </div>
                </div>
                <Link href={`/lmpadmin/portfolio/${portfolio.id}/edit`}
                    className="flex items-center gap-2 bg-[#19172A] text-[#80FF00] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#2d2b3f] transition-colors">
                    <Pencil className="w-4 h-4" />Edit
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {portfolio.project_thumbnail && (
                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                            <Image src={portfolio.project_thumbnail} alt={portfolio.title} width={800} height={450} className="w-full h-72 object-cover" />
                        </div>
                    )}
                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                        <h2 className="text-base font-semibold text-slate-700 mb-3">Project Description</h2>
                        <div
                            className="prose prose-sm max-w-none text-slate-600"
                            dangerouslySetInnerHTML={{ __html: portfolio.description || "<p class='text-slate-400 italic'>No description provided.</p>" }}
                        />
                    </div>

                    {portfolio.project_album?.length > 0 && (
                        <div className="bg-white border border-slate-200 rounded-xl p-6">
                            <h2 className="text-base font-semibold text-slate-700 mb-4">Project Album</h2>
                            <div className="grid grid-cols-3 gap-3">
                                {portfolio.project_album.map((src, i) => (
                                    <Image key={i} src={src} alt={`Album ${i + 1}`} width={300} height={200} className="w-full h-32 object-cover rounded-lg" />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                        <h2 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-2">Project Details</h2>
                        {portfolio.client && (
                            <div className="flex items-start gap-3">
                                <User className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-slate-400">Client</p>
                                    <p className="text-sm text-slate-700 font-medium">{portfolio.client}</p>
                                </div>
                            </div>
                        )}
                        {portfolio.years && (
                            <div className="flex items-start gap-3">
                                <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-slate-400">Year</p>
                                    <p className="text-sm text-slate-700 font-medium">{portfolio.years}</p>
                                </div>
                            </div>
                        )}
                        {portfolio.category && (
                            <div className="flex items-start gap-3">
                                <Tag className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-slate-400">Category</p>
                                    <p className="text-sm text-slate-700 font-medium">{portfolio.category}</p>
                                </div>
                            </div>
                        )}
                        {portfolio.project_link && (
                            <div className="flex items-start gap-3">
                                <ExternalLink className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-slate-400">Project Link</p>
                                    <a href={portfolio.project_link} target="_blank" rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline break-all">{portfolio.project_link}</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
