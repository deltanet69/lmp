"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

interface TeamMember {
    id: string;
    full_name: string;
    jabatan: string;
    image: string | null;
}

const INITIAL_SHOW = 8;

export default function OurTeam() {
    const supabase = createClient();
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase
            .from("team_lmp")
            .select("id, full_name, jabatan, image")
            .order("created_at", { ascending: true })
            .then(({ data }) => {
                if (data) setTeam(data);
                setLoading(false);
            });
    }, []);

    const displayed = showAll ? team : team.slice(0, INITIAL_SHOW);
    const hasMore = team.length > INITIAL_SHOW;

    return (
        <section className="relative w-full py-24 overflow-hidden bg-[#19172A]">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12">

                {/* Header — single lightweight animation */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 space-y-3"
                >
                    <p className="text-secondary font-bold tracking-widest text-sm uppercase">
                        We support creative people
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight capitalize mt-2">
                        <span className="text-primary">Tim Kreatif</span> Langit Media Pro
                    </h2>
                </motion.div>

                {/* Skeleton while loading */}
                {loading && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="rounded-[2rem] bg-white/5 animate-pulse"
                                style={{ aspectRatio: "4/5" }}
                            />
                        ))}
                    </div>
                )}

                {/* Grid — CSS-driven fade in, not per-card JS animation */}
                {!loading && (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                            {displayed.map((member, index) => (
                                <div
                                    key={member.id}
                                    className="team-card relative bg-white/5 border border-white/10 p-2 rounded-[2rem] overflow-hidden group
                                               transition-all duration-300 hover:bg-white/10 hover:border-white/20
                                               hover:shadow-[0_0_30px_rgba(226,14,194,0.15)] hover:-translate-y-2"
                                    style={{
                                        animation: `fadeInUp 0.4s ease both`,
                                        animationDelay: `${Math.min(index, 3) * 0.07}s`,
                                    }}
                                >
                                    {/* Photo */}
                                    <div className="w-full bg-black/20 rounded-[1.5rem] mb-4 overflow-hidden relative border-2 border-transparent group-hover:border-primary/50 transition-colors duration-300"
                                        style={{ aspectRatio: "4/5" }}
                                    >
                                        {member.image ? (
                                            <img
                                                src={member.image}
                                                alt={member.full_name}
                                                loading={index < 4 ? "eager" : "lazy"}
                                                decoding="async"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-4xl font-black text-white/20">
                                                {member.full_name[0]}
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    <div className="text-center pb-2">
                                        <h3 className="text-sm md:text-base font-bold text-white leading-tight">{member.full_name}</h3>
                                        <p className="text-primary font-bold text-[10px] md:text-xs tracking-wider uppercase mt-1">
                                            {member.jabatan}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Show More Button */}
                        {hasMore && (
                            <div className="text-center mt-12">
                                <button
                                    onClick={() => setShowAll((v) => !v)}
                                    className="inline-block bg-white/5 hover:bg-primary border border-white/20 hover:border-primary text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 tracking-wider text-base hover:shadow-[0_0_25px_rgba(226,14,194,0.4)]"
                                >
                                    {showAll ? "Tampilkan Lebih Sedikit" : "Lebih banyak..."}
                                </button>
                            </div>
                        )}

                        {team.length === 0 && (
                            <p className="text-center text-white/40 py-12">Belum ada data tim.</p>
                        )}
                    </>
                )}
            </div>

            {/* Keyframe defined inline via style tag */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
