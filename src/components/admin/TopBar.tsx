"use client";

import {
    Bell, Search, PanelLeft, Menu, Clock,
    Plus, Pencil, Trash2, RefreshCcw, FileText
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ActivityLog, activityLabel, ACTION_ICON } from "@/lib/activityLog";
import Link from "next/link";

interface TopBarProps {
    collapsed: boolean;
    onToggleCollapse: () => void;
    onMobileOpen: () => void;
}

const timeAgo = (iso: string) => {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 60) return "baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} mnt lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    return `${Math.floor(diff / 86400)} hari lalu`;
};

const ACTION_ICON_MAP: Record<string, React.ReactNode> = {
    created: <Plus className="w-3.5 h-3.5" />,
    updated: <Pencil className="w-3.5 h-3.5" />,
    deleted: <Trash2 className="w-3.5 h-3.5" />,
    status_changed: <RefreshCcw className="w-3.5 h-3.5" />,
};

export default function TopBar({ collapsed, onToggleCollapse, onMobileOpen }: TopBarProps) {
    const supabase = createClient();
    const [userName, setUserName] = useState("Admin User");
    const [userRole, setUserRole] = useState("Administrator");
    const [userInitial, setUserInitial] = useState("A");

    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [unread, setUnread] = useState(0);
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const lastOpenedRef = useRef<number>(Date.now());

    const fetchLogs = async () => {
        const { data } = await supabase
            .from("activity_log")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(20);
        if (data) {
            setLogs(data as ActivityLog[]);
            // Count items newer than last-opened time
            const newCount = (data as ActivityLog[]).filter(
                (l) => new Date(l.created_at).getTime() > lastOpenedRef.current
            ).length;
            setUnread((prev) => prev + newCount);
        }
    };

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "Admin";
                const role = user.user_metadata?.user_role || "Administrator";
                setUserName(name);
                setUserRole(role);
                setUserInitial(name[0]?.toUpperCase() || "A");
            }
        });
        fetchLogs();
    }, []);

    // Real-time: subscribe to activity_log INSERT events
    useEffect(() => {
        const channel = supabase
            .channel("activity-log-rt")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "activity_log" },
                (payload) => {
                    const newLog = payload.new as ActivityLog;
                    setLogs((prev) => [newLog, ...prev].slice(0, 20));
                    setUnread((prev) => prev + 1);
                }
            )
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleOpen = () => {
        setOpen((v) => !v);
        if (!open) {
            // Mark all as read when opening
            lastOpenedRef.current = Date.now();
            setUnread(0);
        }
    };

    const entityHref = (log: ActivityLog) =>
        log.entity === "portfolio"
            ? `/lmpadmin/portfolio/${log.entity_id}/edit`
            : `/lmpadmin/enquiry/${log.entity_id}`;

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20 gap-3">
            {/* Left */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                    onClick={onToggleCollapse}
                    className="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all"
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    <PanelLeft className={`w-5 h-5 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`} />
                </button>

                <button
                    onClick={onMobileOpen}
                    className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:bg-slate-100 transition-all"
                >
                    <Menu className="w-5 h-5" />
                </button>

                <div className="relative flex-1 max-w-xs">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#80FF00]/50 focus:border-[#80FF00] transition-all"
                    />
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
                {/* Notification Bell */}
                <div className="relative" ref={ref}>
                    <button
                        onClick={handleOpen}
                        className="relative text-slate-400 hover:text-slate-600 transition-colors"
                        title="Notifikasi"
                    >
                        <Bell className="w-5 h-5" />
                        {unread > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                                {unread > 9 ? "9+" : unread}
                            </span>
                        )}
                    </button>

                    {open && (
                        <div className="absolute right-0 top-full mt-2 w-[340px] bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                                <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Bell className="w-4 h-4 text-[#19172A]" />
                                    Aktivitas Terbaru
                                </h3>
                                <span className="text-xs text-slate-400">
                                    {logs.length > 0 ? `${logs.length} aktivitas` : "Kosong"}
                                </span>
                            </div>

                            {/* List */}
                            <div className="max-h-[400px] overflow-y-auto divide-y divide-slate-50">
                                {logs.length === 0 ? (
                                    <div className="py-12 text-center">
                                        <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                                        <p className="text-slate-400 text-sm">Belum ada aktivitas.</p>
                                    </div>
                                ) : (
                                    logs.map((log) => {
                                        const iconCfg = ACTION_ICON[log.action as keyof typeof ACTION_ICON] ?? ACTION_ICON.created;
                                        return (
                                            <Link
                                                key={log.id}
                                                href={entityHref(log)}
                                                onClick={() => setOpen(false)}
                                                className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group"
                                            >
                                                {/* Circle icon */}
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${iconCfg.bg} ${iconCfg.color}`}>
                                                    {ACTION_ICON_MAP[log.action] ?? <FileText className="w-3.5 h-3.5" />}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    {/* Action label */}
                                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                                        {activityLabel(log)}
                                                    </p>
                                                    {/* Entity title */}
                                                    <p className="text-sm font-medium text-slate-700 truncate group-hover:text-[#19172A] mt-0.5">
                                                        {log.entity_title}
                                                    </p>
                                                    {/* Time */}
                                                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                                        <Clock className="w-3 h-3" />
                                                        {timeAgo(log.created_at)}
                                                    </p>
                                                </div>
                                            </Link>
                                        );
                                    })
                                )}
                            </div>

                            {/* Footer */}
                            <div className="border-t border-slate-100 px-4 py-2.5 bg-slate-50 flex justify-between items-center">
                                <Link
                                    href="/lmpadmin/enquiry"
                                    onClick={() => setOpen(false)}
                                    className="text-xs text-[#19172A] font-semibold hover:text-[#80FF00] transition-colors"
                                >
                                    Enquiries →
                                </Link>
                                <Link
                                    href="/lmpadmin/portfolio"
                                    onClick={() => setOpen(false)}
                                    className="text-xs text-[#19172A] font-semibold hover:text-[#80FF00] transition-colors"
                                >
                                    Portfolio →
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile */}
                <div className="flex items-center gap-2 md:gap-3 border-l border-slate-200 pl-3 md:pl-5">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-700 leading-tight truncate max-w-[120px]">{userName}</p>
                        <p className="text-xs text-slate-400 capitalize">{userRole}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#19172A] border-2 border-[#80FF00] flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-[#80FF00]">{userInitial}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
