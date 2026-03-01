"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    LayoutDashboard, Briefcase, MailQuestion, Users,
    Settings, UserCog, Globe, LogOut, X
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (v: boolean) => void;
    onClose: () => void;
}

export default function Sidebar({ collapsed, onClose }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/lmpadmin/login");
        router.refresh();
    };

    const mainMenus = [
        { name: "Dashboard", href: "/lmpadmin/dashboard", icon: LayoutDashboard },
        { name: "Portfolio", href: "/lmpadmin/portfolio", icon: Briefcase },
        { name: "Enquiry", href: "/lmpadmin/enquiry", icon: MailQuestion },
        { name: "Team Support", href: "/lmpadmin/team-support", icon: Users },
    ];

    const configMenus = [
        { name: "Configuration", href: "/lmpadmin/configuration", icon: Settings },
        { name: "User Management", href: "/lmpadmin/user-management", icon: UserCog },
        { name: "Web Setting", href: "/lmpadmin/web-setting", icon: Globe },
    ];

    return (
        <div
            className={`bg-[#19172A] text-white flex flex-col h-screen flex-shrink-0 transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}
        >
            {/* Logo + mobile close */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700/50">
                {!collapsed ? (
                    <div className="flex items-center justify-between w-full">
                        <Image src="/lmp.png" alt="LMP Logo" width={130} height={40} className="object-contain" />
                        <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <div className="w-full flex justify-center">
                        <Image src="/lmp.png" alt="LMP Logo" width={32} height={32} className="object-contain" />
                    </div>
                )}
            </div>

            {/* Menu */}
            <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-8 custom-scrollbar mt-2">
                {/* Main Menu */}
                <nav className="px-3">
                    {!collapsed && (
                        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                            Main Menu
                        </p>
                    )}
                    <ul className="space-y-1">
                        {mainMenus.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        onClick={onClose}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${isActive
                                                ? "bg-[#80FF00]/10 text-[#80FF00] font-semibold"
                                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                            } ${collapsed ? "justify-center" : ""}`}
                                        title={collapsed ? item.name : undefined}
                                    >
                                        <item.icon strokeWidth={isActive ? 2 : 1.5} className="w-5 h-5 shrink-0" />
                                        {!collapsed && <span className="whitespace-nowrap text-sm">{item.name}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Config Menu */}
                <nav className="px-3">
                    {!collapsed && (
                        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                            Config Menu
                        </p>
                    )}
                    <ul className="space-y-1">
                        {configMenus.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        onClick={onClose}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${isActive
                                                ? "bg-[#80FF00]/10 text-[#80FF00] font-semibold"
                                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                            } ${collapsed ? "justify-center" : ""}`}
                                        title={collapsed ? item.name : undefined}
                                    >
                                        <item.icon strokeWidth={isActive ? 2 : 1.5} className="w-5 h-5 shrink-0" />
                                        {!collapsed && <span className="whitespace-nowrap text-sm">{item.name}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            {/* Logout */}
            <div className="border-t border-slate-700/50 p-3">
                <button
                    onClick={handleLogout}
                    className={`flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-red-400 hover:bg-red-400/10 transition-all ${collapsed ? "justify-center" : ""
                        }`}
                    title={collapsed ? "Logout" : undefined}
                >
                    <LogOut strokeWidth={1.5} className="w-5 h-5 shrink-0" />
                    {!collapsed && <span className="text-sm font-medium">Logout</span>}
                </button>
            </div>
        </div>
    );
}
