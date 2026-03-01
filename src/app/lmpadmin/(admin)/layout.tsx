"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex bg-slate-50 h-screen overflow-hidden text-slate-800">
            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed lg:relative z-40 lg:z-auto h-full lg:h-auto
                    transition-transform duration-300 ease-in-out
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                <Sidebar
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    onClose={() => setMobileOpen(false)}
                />
            </div>

            <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
                <TopBar
                    collapsed={collapsed}
                    onToggleCollapse={() => setCollapsed(!collapsed)}
                    onMobileOpen={() => setMobileOpen(true)}
                />
                <main className="p-4 md:p-6 flex-grow overflow-y-auto overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
