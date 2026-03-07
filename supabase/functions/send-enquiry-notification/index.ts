
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { adminTemplate, userTemplate } from "./templates.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SENDER_EMAIL = Deno.env.get('SENDER_EMAIL') || 'onboarding@resend.dev'
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'admin@langitmediapro.com'

serve(async (req) => {
    try {
        const body = await req.json()
        console.log('Webhook received:', body)

        // Supabase Webhook payload structure
        // We expect the payload from the 'enquiry' table
        const record = body.record || body

        const { full_name, email_address, phone_number, project_type, message, created_at } = record

        if (!full_name || !email_address || !project_type) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            )
        }

        if (!RESEND_API_KEY) {
            return new Response(
                JSON.stringify({ error: 'RESEND_API_KEY not configured' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            )
        }

        // Send emails via Resend API
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify([
                {
                    from: `Langit Media Pro <${SENDER_EMAIL}>`,
                    to: [ADMIN_EMAIL],
                    subject: `🚀 Enquiry Baru dari ${full_name} — ${project_type}`,
                    html: adminTemplate({
                        full_name,
                        email_address,
                        phone_number: phone_number || null,
                        project_type,
                        message: message || null,
                        created_at: created_at || new Date().toISOString(),
                    }),
                },
                {
                    from: `Langit Media Pro <${SENDER_EMAIL}>`,
                    to: [email_address],
                    replyTo: ADMIN_EMAIL,
                    subject: `✨ Terima kasih sudah menghubungi Langit Media Pro, ${full_name}!`,
                    html: userTemplate({ full_name }),
                }
            ]),
        })

        const result = await res.json()
        console.log('Resend Response:', result)

        return new Response(
            JSON.stringify({ success: true, result }),
            { headers: { 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        console.error('Error:', error.message)
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
    }
})
