
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// --- EMAL TEMPLATES (Combined for Dashboard Deployment) ---

interface AdminNotificationProps {
    full_name: string;
    email_address: string;
    phone_number?: string | null;
    project_type: string;
    message?: string | null;
    created_at?: string;
}

const adminTemplate = ({
    full_name,
    email_address,
    phone_number,
    project_type,
    message,
    created_at,
}: AdminNotificationProps): string => {
    const date = created_at
        ? new Date(created_at).toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Jakarta",
        })
        : new Date().toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Jakarta",
        });

    const adminUrl = "https://langitmediapro.com";

    return `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enquiry Baru — Langit Media Pro</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f0f5;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f5;padding:40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.12);">
                    <tr>
                        <td style="background:linear-gradient(135deg,#171720 0%,#2A1A3E 100%);padding:36px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <p style="margin:0;color:#E20EC2;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">LANGIT MEDIA PRO</p>
                                        <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:800;line-height:1.3;">🚀 Enquiry Baru Masuk!</h1>
                                        <p style="margin:6px 0 0;color:rgba(255,255,255,0.5);font-size:13px;">${date} WIB</p>
                                    </td>
                                    <td align="right">
                                        <div style="width:52px;height:52px;background:rgba(226,14,194,0.15);border:2px solid rgba(226,14,194,0.4);border-radius:14px;display:inline-flex;align-items:center;justify-content:center;">
                                            <span style="font-size:26px;line-height:52px;text-align:center;display:block;">📬</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="background:#E20EC2;padding:14px 40px;">
                            <p style="margin:0;color:#ffffff;font-size:14px;font-weight:600;text-align:center;">
                                Ada calon klien baru yang menghubungi via website. Segera follow up! ⚡
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:36px 40px;">
                            <p style="margin:0 0 20px;color:#333;font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #f0f0f0;padding-bottom:10px;">
                                Detail Enquiry
                            </p>
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                                <tr>
                                    <td width="140" style="vertical-align:top;padding:14px 16px;background:#f8f8ff;border-radius:10px 0 0 10px;border-left:4px solid #E20EC2;">
                                        <p style="margin:0;color:#E20EC2;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Nama</p>
                                    </td>
                                    <td style="vertical-align:top;padding:14px 16px;background:#fafafa;border-radius:0 10px 10px 0;">
                                        <p style="margin:0;color:#1a1a2e;font-size:15px;font-weight:600;">${full_name}</p>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                                <tr>
                                    <td width="140" style="vertical-align:top;padding:14px 16px;background:#f8f8ff;border-radius:10px 0 0 10px;border-left:4px solid #E20EC2;">
                                        <p style="margin:0;color:#E20EC2;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Email</p>
                                    </td>
                                    <td style="vertical-align:top;padding:14px 16px;background:#fafafa;border-radius:0 10px 10px 0;">
                                        <a href="mailto:${email_address}" style="color:#6366f1;font-size:15px;font-weight:600;text-decoration:none;">${email_address}</a>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                                <tr>
                                    <td width="140" style="vertical-align:top;padding:14px 16px;background:#f8f8ff;border-radius:10px 0 0 10px;border-left:4px solid #E20EC2;">
                                        <p style="margin:0;color:#E20EC2;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Telepon</p>
                                    </td>
                                    <td style="vertical-align:top;padding:14px 16px;background:#fafafa;border-radius:0 10px 10px 0;">
                                        <p style="margin:0;color:#1a1a2e;font-size:15px;font-weight:600;">${phone_number || "—"}</p>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                                <tr>
                                    <td width="140" style="vertical-align:top;padding:14px 16px;background:#f8f8ff;border-radius:10px 0 0 10px;border-left:4px solid #E20EC2;">
                                        <p style="margin:0;color:#E20EC2;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Tipe Proyek</p>
                                    </td>
                                    <td style="vertical-align:top;padding:14px 16px;background:#fafafa;border-radius:0 10px 10px 0;">
                                        <span style="display:inline-block;background:#E20EC2;color:#ffffff;font-size:12px;font-weight:700;padding:4px 14px;border-radius:20px;">${project_type}</span>
                                    </td>
                                </tr>
                            </table>
                            ${message ? `
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                                <tr>
                                    <td width="140" style="vertical-align:top;padding:14px 16px;background:#f8f8ff;border-radius:10px 0 0 10px;border-left:4px solid #E20EC2;">
                                        <p style="margin:0;color:#E20EC2;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Pesan</p>
                                    </td>
                                    <td style="vertical-align:top;padding:14px 16px;background:#fafafa;border-radius:0 10px 10px 0;">
                                        <p style="margin:0;color:#333;font-size:14px;line-height:1.7;">${message}</p>
                                    </td>
                                </tr>
                            </table>
                            ` : ""}
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                                <tr>
                                    <td align="center">
                                        <a href="${adminUrl}/lmpadmin/enquiry"
                                           style="display:inline-block;background:linear-gradient(135deg,#E20EC2 0%,#B80B9C 100%);color:#ffffff;font-size:15px;font-weight:700;padding:16px 40px;border-radius:50px;text-decoration:none;letter-spacing:0.5px;box-shadow:0 8px 24px rgba(226,14,194,0.4);">
                                            Buka Admin Panel →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="background:#f8f8ff;padding:24px 40px;border-top:2px solid #f0f0f0;">
                            <p style="margin:0;text-align:center;color:#999;font-size:12px;">
                                © 2025 <strong>Langit Media Pro</strong> — Email notifikasi otomatis. Jangan reply email ini.<br>
                                <a href="https://langitmediapro.com" style="color:#E20EC2;text-decoration:none;">www.langitmediapro.com</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};

const userTemplate = ({ full_name }: { full_name: string }): string => `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terima Kasih Telah Menghubungi Langit Media Pro</title>
</head>
<body style="margin:0;padding:0;background-color:#0D0B1A;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg,#0D0B1A 0%,#1A0D2E 100%);padding:40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#171720;border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(226,14,194,0.2);">
                    <tr>
                        <td style="background:linear-gradient(135deg,#171720 0%,#2A1A3E 60%,#171720 100%);padding:44px 40px 36px;text-align:center;">
                            <div style="margin:0 auto 20px;width:80px;height:80px;background:rgba(226,14,194,0.12);border:2px solid rgba(226,14,194,0.5);border-radius:20px;display:block;text-align:center;line-height:80px;font-size:40px;">✨</div>
                            <p style="margin:0 0 4px;color:#E20EC2;font-size:11px;font-weight:800;letter-spacing:4px;text-transform:uppercase;">LANGIT MEDIA PRO</p>
                            <h1 style="margin:10px 0 0;color:#ffffff;font-size:26px;font-weight:800;line-height:1.3;">
                                Hai, ${full_name}! 👋
                            </h1>
                            <p style="margin:10px 0 0;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.6;">
                                Terima kasih sudah menghubungi <strong style="color:#E20EC2;">Langit Media Pro</strong>!<br>
                                Kami sudah menerima pesan kamu dan sedang dalam antrian tim kami. 🚀
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:3px;background:linear-gradient(90deg,transparent,#E20EC2,transparent);"></td>
                    </tr>
                    <tr>
                        <td style="padding:36px 40px 20px;">
                            <p style="margin:0;color:rgba(255,255,255,0.85);font-size:15px;line-height:1.8;">
                                Biar kita bisa bantu lebih <strong style="color:#ffffff;">cepat dan maksimal</strong>, boleh isi info singkat ini dulu yaa — balas email ini atau hubungi kami langsung via WhatsApp 😊
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:0 40px 36px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04);border:1px solid rgba(226,14,194,0.25);border-radius:18px;overflow:hidden;">
                                <tr><td style="background:rgba(226,14,194,0.1);padding:16px 24px;border-bottom:1px solid rgba(226,14,194,0.2);"><p style="margin:0;color:#E20EC2;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:2px;">📋 Info Project Kamu</p></td></tr>
                                <tr><td style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.05);"><p style="margin:0 0 6px;color:#E20EC2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">1. Nama Lengkap Kamu</p></td></tr>
                                <tr><td style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.05);"><p style="margin:0 0 6px;color:#E20EC2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">2. Perusahaan / Instansi</p></td></tr>
                                <tr><td style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.05);"><p style="margin:0 0 6px;color:#E20EC2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">3. Project-nya tentang apa nih?</p></td></tr>
                                <tr><td style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.05);"><p style="margin:0 0 6px;color:#E20EC2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">4. Target Deadline / Tayang Kapan?</p></td></tr>
                                <tr><td style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.05);"><p style="margin:0 0 6px;color:#E20EC2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">5. Referensi Video yang Kamu Suka?</p></td></tr>
                                <tr><td style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.05);"><p style="margin:0 0 6px;color:#E20EC2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">6. Estimasi Durasi Video?</p></td></tr>
                                <tr><td style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.05);"><p style="margin:0 0 6px;color:#E20EC2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">7. Shooting-nya Mau di Mana?</p></td></tr>
                                <tr><td style="padding:18px 24px;"><p style="margin:0 0 6px;color:#E20EC2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">8. Sudah Ada Konsep?</p></td></tr>
                            </table>
                        </td>
                    </tr>
                    <tr><td style="padding:0 40px 36px;"><table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#E20EC2 0%,#9B0A86 100%);border-radius:18px;overflow:hidden;"><tr><td style="padding:28px 30px;text-align:center;"><p style="margin:0 0 8px;color:#ffffff;font-size:18px;font-weight:800;line-height:1.4;">🔥 Abis ini, tim kreatif kita bakal kirim<br>showreel + penawaran terbaik buat kamu!</p></td></tr></table></td></tr>
                    <tr><td style="padding:28px 40px;text-align:center;"><p style="margin:0 0 6px;color:rgba(255,255,255,0.7);font-size:14px;font-weight:700;">Langit Media Pro</p><p style="margin:10px 0 0;color:rgba(255,255,255,0.3);font-size:12px;">📞 +62 812-4366-4366</p></td></tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

// --- CORE LOGIC ---

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SENDER_EMAIL = Deno.env.get('SENDER_EMAIL') || 'onboarding@resend.dev'
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'admin@langitmediapro.com'

serve(async (req) => {
    try {
        const body = await req.json()
        console.log('Webhook received:', body)

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

        // Send emails via Resend API (Batch)
        const res = await fetch('https://api.resend.com/emails/batch', {
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

        if (!res.ok) {
            console.error('Resend API Error:', result)
            return new Response(
                JSON.stringify({ success: false, error: result }),
                { status: res.status, headers: { 'Content-Type': 'application/json' } }
            )
        }

        console.log('Resend Success:', result)

        return new Response(
            JSON.stringify({ success: true, data: result }),
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
