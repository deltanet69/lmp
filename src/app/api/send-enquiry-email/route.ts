import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { adminTemplate } from "@/lib/supabase/functions/send-enquiry-notification/templates/admin-notification";
import { userTemplate } from "@/lib/supabase/functions/send-enquiry-notification/templates/user-autoresponse";

const resend = new Resend(process.env.RESEND_API_KEY);

// SENDER: Must match a verified domain in your Resend dashboard.
// If langitmediapro.com is verified → use it directly.
// If using Resend free tier without domain verification → use: onboarding@resend.dev
const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";
const SENDER_NAME = "Langit Media Pro";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@langitmediapro.com";

export async function POST(req: NextRequest) {
    try {
        // Validate API key
        if (!process.env.RESEND_API_KEY) {
            console.error("[send-enquiry-email] RESEND_API_KEY is not set!");
            return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
        }

        const body = await req.json();
        const { full_name, email_address, phone_number, project_type, message } = body;

        // Basic validation
        if (!full_name || !email_address || !project_type) {
            return NextResponse.json(
                { error: "Missing required fields: full_name, email_address, project_type" },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email_address)) {
            return NextResponse.json(
                { error: "Invalid email address format" },
                { status: 400 }
            );
        }

        const now = new Date().toISOString();
        const from = `${SENDER_NAME} <${SENDER_EMAIL}>`;

        console.log(`[send-enquiry-email] Sending emails — from: ${from}, to user: ${email_address}, to admin: ${ADMIN_EMAIL}`);

        // Send both emails in parallel
        const [adminResult, userResult] = await Promise.allSettled([
            // 1. Admin notification
            resend.emails.send({
                from,
                to: [ADMIN_EMAIL],
                subject: `🚀 Enquiry Baru dari ${full_name} — ${project_type}`,
                html: adminTemplate({
                    full_name,
                    email_address,
                    phone_number: phone_number || null,
                    project_type,
                    message: message || null,
                    created_at: now,
                }),
            }),

            // 2. Auto-response to user
            resend.emails.send({
                from,
                to: [email_address],
                replyTo: ADMIN_EMAIL,
                subject: `✨ Terima kasih sudah menghubungi Langit Media Pro, ${full_name}!`,
                html: userTemplate({ full_name }),
            }),
        ]);

        // Detailed result logging
        const adminOk = adminResult.status === "fulfilled" && !adminResult.value.error;
        const userOk = userResult.status === "fulfilled" && !userResult.value.error;

        const adminError = adminResult.status === "rejected"
            ? adminResult.reason
            : adminResult.value?.error;
        const userError = userResult.status === "rejected"
            ? userResult.reason
            : userResult.value?.error;

        if (!adminOk) {
            console.error("[send-enquiry-email] ❌ Admin email FAILED:", JSON.stringify(adminError));
        } else {
            console.log("[send-enquiry-email] ✅ Admin email sent, ID:", (adminResult as PromiseFulfilledResult<{ data: { id: string } | null; error: unknown }>).value?.data?.id);
        }

        if (!userOk) {
            console.error("[send-enquiry-email] ❌ User email FAILED:", JSON.stringify(userError));
        } else {
            console.log("[send-enquiry-email] ✅ User email sent, ID:", (userResult as PromiseFulfilledResult<{ data: { id: string } | null; error: unknown }>).value?.data?.id);
        }

        return NextResponse.json({
            success: true,
            adminEmailSent: adminOk,
            userEmailSent: userOk,
            // Include error details in response for easier debugging
            ...((!adminOk || !userOk) && {
                errors: {
                    ...((!adminOk) && { admin: JSON.stringify(adminError) }),
                    ...((!userOk) && { user: JSON.stringify(userError) }),
                }
            }),
        });

    } catch (error) {
        console.error("[send-enquiry-email] ❌ Unexpected error:", error);
        return NextResponse.json(
            { error: "Internal server error", detail: String(error) },
            { status: 500 }
        );
    }
}
