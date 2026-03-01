import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const isLmpAdminRoute = request.nextUrl.pathname.startsWith("/lmpadmin");
    const isLoginPage = request.nextUrl.pathname === "/lmpadmin/login";

    if (isLmpAdminRoute) {
        if (!user && !isLoginPage) {
            // User is not logged in, trying to access protected route -> redirect to login
            const url = request.nextUrl.clone();
            url.pathname = "/lmpadmin/login";
            return NextResponse.redirect(url);
        }

        if (user && isLoginPage) {
            // User is logged in, trying to access login page -> redirect to dashboard
            const url = request.nextUrl.clone();
            url.pathname = "/lmpadmin/dashboard";
            return NextResponse.redirect(url);
        }

        if (user && request.nextUrl.pathname === "/lmpadmin") {
            // User is logged in, trying to access /lmpadmin -> redirect to dashboard
            const url = request.nextUrl.clone();
            url.pathname = "/lmpadmin/dashboard";
            return NextResponse.redirect(url);
        }
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
