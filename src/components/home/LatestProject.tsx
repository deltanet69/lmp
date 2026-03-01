"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Project {
    id: string;
    title: string;
    category: string;
    client: string | null;
    years: string | null;
    project_link: string | null;
    description: string | null;
    project_thumbnail: string | null;
    is_featured: boolean | null;
}

const CATEGORIES = ["All Projects", "Company Profile", "Animation Video", "Website Development"];

export default function LatestProject() {
    const supabase = createClient();
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeTab, setActiveTab] = useState("All Projects");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Show only featured projects on homepage
        supabase
            .from("portfolio")
            .select("*")
            .eq("is_featured", true)
            .order("created_at", { ascending: false })
            .then(({ data }) => { if (data) setProjects(data); setLoading(false); });
    }, []);

    const filtered = activeTab === "All Projects"
        ? projects
        : projects.filter((p) => p.category === activeTab);

    return (
        <section className="py-24 max-w-[1440px] mx-auto px-4 md:px-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h2
                    className="text-7xl md:text-8xl font-black mb-4 uppercase tracking-tight text-transparent bg-clip-text drop-shadow-2xl"
                    style={{ backgroundImage: "linear-gradient(to top, #1B1830, #302C50, #726D96, #FFFFFF)" }}
                >
                    Latest Projects
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto text-lg mb-12 font-medium">
                    Kami menyediakan solusi komunikasi visual dan digital yang dirancang khusus untuk kebutuhan korporasi anda.
                </p>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-7 py-2.5 rounded-full text-sm md:text-base transition-all duration-300 cursor-pointer border ${activeTab === cat
                                ? "bg-primary text-white font-bold border-primary shadow-[0_0_25px_rgba(226,14,194,0.5)]"
                                : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border-white/10"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </motion.div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-[2rem] bg-white/5 animate-pulse border border-white/5 h-[380px]" />
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-16 text-white/40 text-lg">
                    {projects.length === 0
                        ? "Belum ada featured projects. Tandai beberapa project sebagai Featured di admin."
                        : "Tidak ada featured project di kategori ini."}
                </div>
            ) : (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: idx * 0.07 }}
                                whileHover={{ y: -6 }}
                            >
                                <Link
                                    href={`/portfolio/${project.id}`}
                                    className="group flex flex-col h-[380px] rounded-[2rem] overflow-hidden bg-[#1D1B2E] border border-white/5 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(226,14,194,0.15)] transition-all duration-500"
                                >
                                    <div className="relative w-full h-56 flex-shrink-0 overflow-hidden bg-white/5">
                                        {project.project_thumbnail ? (
                                            <img
                                                src={project.project_thumbnail}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-6xl font-black text-white/10">
                                                {project.title[0]}
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 right-4 flex justify-between">
                                            <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                                                {project.category}
                                            </span>
                                            {project.years && (
                                                <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                                                    {project.years}
                                                </span>
                                            )}
                                        </div>
                                        {/* Featured Badge */}
                                        <div className="absolute bottom-3 left-4">
                                            <span className="px-3 py-1 bg-yellow-400/20 backdrop-blur-md border border-yellow-400/40 text-yellow-300 text-[9px] font-bold rounded-full uppercase tracking-widest">
                                                ⭐ Featured
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col gap-2 flex-1 min-h-0">
                                        <h3 className="text-white font-bold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                            {project.title}
                                        </h3>
                                        {project.client && (
                                            <p className="text-white/40 text-sm line-clamp-1">{project.client}</p>
                                        )}
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            <div className="text-center mt-16">
                <Link
                    href="/portfolio"
                    className="inline-block bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full font-semibold transition-all tracking-wider text-lg shadow-[0_0_25px_rgba(226,14,194,0.3)] hover:shadow-[0_0_35px_rgba(226,14,194,0.5)]"
                >
                    View All Projects
                </Link>
            </div>
        </section>
    );
}
