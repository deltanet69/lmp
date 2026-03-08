"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const supabase = createClient();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();

                if (error || !session) {
                    console.log("Not authenticated, redirecting to login...");
                    router.push("/lmpadmin/login");
                } else {
                    setAuthenticated(true);
                }
            } catch (err) {
                console.error("Auth check error:", err);
                router.push("/lmpadmin/login");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

        // Optional: Listen for auth state changes (e.g., logout from another tab)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_OUT") {
                setAuthenticated(false);
                router.push("/lmpadmin/login");
            } else if (event === "SIGNED_IN" && session) {
                setAuthenticated(true);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, supabase]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#19172A]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#80FF00]/20 border-t-[#80FF00] rounded-full animate-spin"></div>
                    <p className="text-white/60 text-sm font-medium animate-pulse tracking-widest">VERIFYING ACCESS...</p>
                </div>
            </div>
        );
    }

    if (!authenticated) {
        return null; // Will redirect via useEffect
    }

    return <>{children}</>;
}
