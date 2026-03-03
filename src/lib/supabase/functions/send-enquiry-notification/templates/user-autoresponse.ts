interface UserAutoResponseProps {
    full_name: string;
}

export const userTemplate = ({ full_name }: UserAutoResponseProps): string => `
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

                    <!-- Header -->
                    <tr>
                        <td style="background:linear-gradient(135deg,#171720 0%,#2A1A3E 60%,#171720 100%);padding:44px 40px 36px;text-align:center;position:relative;">
                            <!-- Glow effect simulation via border -->
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

                    <!-- Pink Divider -->
                    <tr>
                        <td style="height:3px;background:linear-gradient(90deg,transparent,#E20EC2,transparent);"></td>
                    </tr>

                    <!-- Intro Text -->
                    <tr>
                        <td style="padding:36px 40px 20px;">
                            <p style="margin:0;color:rgba(255,255,255,0.85);font-size:15px;line-height:1.8;">
                                Biar kita bisa bantu lebih <strong style="color:#ffffff;">cepat dan maksimal</strong>, boleh isi info singkat ini dulu yaa — balas email ini atau hubungi kami langsung via WhatsApp 😊
                            </p>
                        </td>
                    </tr>

                    <!-- Form Questions Card -->
                    <tr>
                        <td style="padding:0 40px 36px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04);border:1px solid rgba(226,14,194,0.25);border-radius:18px;overflow:hidden;">

                                <!-- Card Header -->
                                <tr>
                                    <td style="background:rgba(226,14,194,0.1);padding:16px 24px;border-bottom:1px solid rgba(226,14,194,0.2);">
                                        <p style="margin:0;color:#E20EC2;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:2px;">📋 Info Project Kamu</p>
                                    </td>
                                </tr>

                                <!-- Question 1 -->
                                <tr>
                                    <td style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.05);">
                                        <p style="margin:0 0 6px;color:#E20EC2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">1. Nama Lengkap Kamu</p>
                                        <p style="margin:0;color:rgba(255,255,255,0.35);font-size:14px;font-style:italic;">Nama lengkap / nama panggilan</p>
                                    </td>
                                </tr>

                                <!-- Question 2 -->
                                <tr>
                                    <td style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.05);">
                                        <p style="margin:0 0 6px;color:#E20EC2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">2. Perusahaan / Instansi</p>
                                        <p style="margin:0;color:rgba(255,255,255,0.35);font-size:14px;font-style:italic;">Nama perusahaan atau brand kamu</p>
                                    </td>
                                </tr>

                                <!-- Question 3 -->
                                <tr>
                                    <td style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.05);">
                                        <p style="margin:0 0 6px;color:#E20EC2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">3. Project-nya tentang apa nih?</p>
                                        <p style="margin:0;color:rgba(255,255,255,0.35);font-size:14px;font-style:italic;">Company profile, iklan, event, dll</p>
                                    </td>
                                </tr>

                                <!-- Question 4 -->
                                <tr>
                                    <td style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.05);">
                                        <p style="margin:0 0 6px;color:#E20EC2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">4. Target Deadline / Tayang Kapan?</p>
                                        <p style="margin:0;color:rgba(255,255,255,0.35);font-size:14px;font-style:italic;">Tanggal atau estimasi bulan tayang</p>
                                    </td>
                                </tr>

                                <!-- Question 5 -->
                                <tr>
                                    <td style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.05);">
                                        <p style="margin:0 0 6px;color:#E20EC2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">5. Referensi Video yang Kamu Suka?</p>
                                        <p style="margin:0;color:rgba(255,255,255,0.35);font-size:14px;font-style:italic;">Boleh link YouTube, TikTok, IG Reels, atau brief singkat</p>
                                    </td>
                                </tr>

                                <!-- Question 6 -->
                                <tr>
                                    <td style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.05);">
                                        <p style="margin:0 0 6px;color:#E20EC2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">6. Estimasi Durasi Video?</p>
                                        <p style="margin:0;color:rgba(255,255,255,0.35);font-size:14px;font-style:italic;">30 detik, 1 menit, 2-3 menit, dll</p>
                                    </td>
                                </tr>

                                <!-- Question 7 -->
                                <tr>
                                    <td style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.05);">
                                        <p style="margin:0 0 6px;color:#E20EC2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">7. Shooting-nya Mau di Mana?</p>
                                        <p style="margin:0;color:rgba(255,255,255,0.35);font-size:14px;font-style:italic;">Lokasi shooting atau online / remote</p>
                                    </td>
                                </tr>

                                <!-- Question 8 -->
                                <tr>
                                    <td style="padding:18px 24px;">
                                        <p style="margin:0 0 6px;color:#E20EC2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">8. Sudah Ada Konsep?</p>
                                        <p style="margin:0;color:rgba(255,255,255,0.5);font-size:14px;font-style:italic;">💡 Kalau belum, tim LMP siap <strong style="color:#E20EC2;">All-in</strong> bantu support ya!</p>
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>

                    <!-- CTA Banner -->
                    <tr>
                        <td style="padding:0 40px 36px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#E20EC2 0%,#9B0A86 100%);border-radius:18px;overflow:hidden;">
                                <tr>
                                    <td style="padding:28px 30px;text-align:center;">
                                        <p style="margin:0 0 8px;color:#ffffff;font-size:18px;font-weight:800;line-height:1.4;">
                                            🔥 Abis ini, tim kreatif kita bakal kirim<br>showreel + penawaran terbaik buat kamu!
                                        </p>
                                        <p style="margin:12px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">
                                            ✨ We support creative people!
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Contact Info -->
                    <tr>
                        <td style="padding:0 40px 36px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding:0 12px;text-align:center;">
                                                    <a href="https://api.whatsapp.com/send/?phone=%2B6281243664366&text=Halo+Langit+Media+Pro" style="display:inline-block;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#ffffff;font-size:13px;font-weight:600;padding:12px 24px;border-radius:50px;text-decoration:none;">
                                                        💬 WhatsApp
                                                    </a>
                                                </td>
                                                <td style="padding:0 12px;text-align:center;">
                                                    <a href="mailto:contact@langitmediapro.com" style="display:inline-block;background:rgba(226,14,194,0.15);border:1px solid rgba(226,14,194,0.4);color:#E20EC2;font-size:13px;font-weight:600;padding:12px 24px;border-radius:50px;text-decoration:none;">
                                                        📧 Email Kami
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Divider line -->
                    <tr>
                        <td style="height:1px;background:rgba(255,255,255,0.06);margin:0 40px;"></td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:28px 40px;text-align:center;">
                            <p style="margin:0 0 6px;color:rgba(255,255,255,0.7);font-size:14px;font-weight:700;">Langit Media Pro</p>
                            <p style="margin:0 0 6px;color:rgba(255,255,255,0.35);font-size:12px;font-style:italic;">Menjangkau Langit, Menginspirasi Bumi</p>
                            <p style="margin:10px 0 0;color:rgba(255,255,255,0.3);font-size:12px;">
                                📞 +62 812-4366-4366 &nbsp;•&nbsp;
                                <a href="https://langitmediapro.com" style="color:#E20EC2;text-decoration:none;">www.langitmediapro.com</a>
                            </p>
                            <p style="margin:12px 0 0;color:rgba(255,255,255,0.2);font-size:11px;">© 2025 Langit Media Pro. All rights reserved.</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>
`;