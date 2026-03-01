"use client";

import { Bell, Search, PanelLeft, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface TopBarProps {
    collapsed: boolean;
    onToggleCollapse: () => void;
    onMobileOpen: () => void;
}

export default function TopBar({ collapsed, onToggleCollapse, onMobileOpen }: TopBarProps) {
    const supabase = createClient();
    const [userName, setUserName] = useState("Admin User");
    const [userRole, setUserRole] = useState("Administrator");
    const [userInitial, setUserInitial] = useState("A");

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "Admin";
                const role = user.user_metadata?.user_role || "Administrator";
                setUserName(name);
                setUserRole(role);
                setUserInitial(name[0]?.toUpperCase() || "A");
            }
        };
        fetchUser();
    }, []);

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20 gap-3">
            {/* Left: collapse toggle (desktop) + hamburger (mobile) + search */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Desktop collapse toggle */}
                <button
                    onClick={onToggleCollapse}
                    className="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all"
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    <PanelLeft className={`w-5 h-5 transition-transform duration-200 ${collapsed ? "rotate-180" : "rotate-0"}`} />
                </button>

                {/* Mobile hamburger */}
                <button
                    onClick={onMobileOpen}
                    className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:bg-slate-100 transition-all"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Search */}
                <div className="relative flex-1 max-w-xs">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#80FF00]/50 focus:border-[#80FF00] transition-all"
                    />
                </div>
            </div>

            {/* Right: notification + profile */}
            <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
                <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                </button>

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
