interface AdminNotificationProps {
    full_name: string;
    email_address: string;
    phone_number?: string | null;
    project_type: string;
    message?: string | null;
    created_at?: string;
}

export const adminTemplate = ({
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

    const adminUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://langitmediapro.com";

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

                    <!-- Header -->
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

                    <!-- Alert Banner -->
                    <tr>
                        <td style="background:#E20EC2;padding:14px 40px;">
                            <p style="margin:0;color:#ffffff;font-size:14px;font-weight:600;text-align:center;">
                                Ada calon klien baru yang menghubungi via website. Segera follow up! ⚡
                            </p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:36px 40px;">

                            <!-- Detail Section -->
                            <p style="margin:0 0 20px;color:#333;font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #f0f0f0;padding-bottom:10px;">
                                Detail Enquiry
                            </p>

                            <!-- Name -->
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

                            <!-- Email -->
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

                            <!-- Phone -->
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

                            <!-- Project Type -->
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

                            <!-- Message -->
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

                            <!-- CTA Button -->
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

                    <!-- Footer -->
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