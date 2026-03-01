"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MailQuestion, Users, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface StatCard {
    label: string;
    key: string;
    count: number;
    icon: React.ElementType;
    href: string;
    color: string;
    bg: string;
}

function CountUp({ to }: { to: number }) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        let start = 0;
        const step = Math.ceil(to / 30);
        const timer = setInterval(() => {
            start += step;
            if (start >= to) { setValue(to); clearInterval(timer); }
            else setValue(start);
        }, 30);
        return () => clearInterval(timer);
    }, [to]);
    return <span>{value}</span>;
}

export default function DashboardPage() {
    const supabase = createClient();
    const [stats, setStats] = useState({ portfolio: 0, enquiry: 0, team: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const [portfolioRes, enquiryRes, teamRes] = await Promise.all([
                supabase.from("portfolio").select("id", { count: "exact", head: true }),
                supabase.from("enquiry").select("id", { count: "exact", head: true }),
                supabase.from("team_lmp").select("id", { count: "exact", head: true }),
            ]);
            setStats({
                portfolio: portfolioRes.count ?? 0,
                enquiry: enquiryRes.count ?? 0,
                team: teamRes.count ?? 0,
            });
            setLoading(false);
        };
        fetchStats();
    }, []);

    const cards: StatCard[] = [
        {
            label: "Total Projects",
            key: "portfolio",
            count: stats.portfolio,
            icon: Briefcase,
            href: "/lmpadmin/portfolio",
            color: "text-violet-600",
            bg: "bg-violet-50 border-violet-100",
        },
        {
            label: "New Enquiries",
            key: "enquiry",
            count: stats.enquiry,
            icon: MailQuestion,
            href: "/lmpadmin/enquiry",
            color: "text-sky-600",
            bg: "bg-sky-50 border-sky-100",
        },
        {
            label: "Team Members",
            key: "team",
            count: stats.team,
            icon: Users,
            href: "/lmpadmin/team-support",
            color: "text-emerald-600",
            bg: "bg-emerald-50 border-emerald-100",
        },
        {
            label: "Overall Progress",
            key: "progress",
            count: 100,
            icon: TrendingUp,
            href: "#",
            color: "text-[#5fc000]",
            bg: "bg-[#80FF00]/5 border-[#80FF00]/20",
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80 } },
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-sm text-slate-500 mt-1">
                    Welcome back! Here's what's happening on your site.
                </p>
            </motion.div>

            {/* Stat Cards */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6"
            >
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <motion.div
                            key={card.key}
                            variants={item}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        >
                            <Link
                                href={card.href}
                                className={`block bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${card.bg}`}>
                                        <Icon className={`w-5 h-5 ${card.color}`} strokeWidth={2} />
                                    </div>
                                    <ArrowRight
                                        className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all"
                                    />
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{card.label}</p>
                                    <p className={`text-4xl font-black mt-1 ${card.color}`}>
                                        {loading ? (
                                            <span className="text-slate-200 animate-pulse">—</span>
                                        ) : (
                                            <CountUp to={card.count} />
                                        )}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="font-bold text-slate-800">Recent Enquiries</h2>
                    <Link href="/lmpadmin/enquiry" className="text-xs font-semibold text-slate-400 hover:text-[#5fc000] transition-colors flex items-center gap-1">
                        View All <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
                <RecentEnquiries />
            </motion.div>
        </div>
    );
}

function RecentEnquiries() {
    const supabase = createClient();
    const [data, setData] = useState<{ id: string; full_name: string; project_type: string; created_at: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase
            .from("enquiry")
            .select("id, full_name, project_type, created_at")
            .order("created_at", { ascending: false })
            .limit(5)
            .then(({ data }) => { setData(data ?? []); setLoading(false); });
    }, []);

    if (loading) return <div className="p-6 text-center text-slate-400 text-sm animate-pulse">Loading...</div>;

    if (!data.length) return (
        <div className="p-12 flex flex-col items-center justify-center text-slate-300 gap-2">
            <MailQuestion className="w-10 h-10" strokeWidth={1} />
            <p className="text-sm">No enquiries yet.</p>
        </div>
    );

    return (
        <div className="divide-y divide-slate-50">
            {data.map((e, i) => (
                <motion.div
                    key={e.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 font-bold text-xs flex-shrink-0">
                            {e.full_name[0]?.toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-700">{e.full_name}</p>
                            <p className="text-xs text-slate-400">{e.project_type || "General Inquiry"}</p>
                        </div>
                    </div>
                    <span className="text-xs text-slate-400">
                        {new Date(e.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}
