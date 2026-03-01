"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { logActivity } from '@/lib/activityLog';

const PROJECT_TYPES = [
    "Company Profile",
    "Animation Video",
    "Website Development",
];

interface FormData {
    full_name: string;
    email_address: string;
    phone_number: string;
    project_type: string;
    message: string;
}

const EMPTY_FORM: FormData = {
    full_name: "",
    email_address: "",
    phone_number: "",
    project_type: "",
    message: "",
};

// ─────────────────────── Success / Error Modal ────────────────────────────
function ResultModal({
    type,
    onClose,
}: {
    type: "success" | "error";
    onClose: () => void;
}) {
    const isSuccess = type === "success";

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.85, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.85, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative bg-[#1B1830] border border-white/10 rounded-3xl p-10 max-w-md w-full text-center shadow-[0_0_80px_rgba(226,14,194,0.2)] overflow-hidden"
                >
                    {/* Background glow */}
                    <div
                        className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-40 blur-[80px] pointer-events-none rounded-full ${isSuccess ? "bg-[#E20EC2]/20" : "bg-red-500/20"}`}
                    />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 20 }}
                        className="relative z-10 mb-6 flex justify-center"
                    >
                        {isSuccess ? (
                            <div className="w-20 h-20 rounded-full bg-[#E20EC2]/10 border border-[#E20EC2]/40 flex items-center justify-center">
                                <CheckCircle className="w-10 h-10 text-[#E20EC2]" />
                            </div>
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/40 flex items-center justify-center">
                                <XCircle className="w-10 h-10 text-red-400" />
                            </div>
                        )}
                    </motion.div>

                    <div className="relative z-10 space-y-3">
                        <h3 className="text-2xl font-black text-white">
                            {isSuccess ? "Data berhasil terkirim!" : "Gagal mengirim"}
                        </h3>

                        {isSuccess && (
                            <p className="text-white/60 text-base leading-relaxed">
                                Data anda sudah kami terima, silahkan cek email untuk proses
                                selanjutnya. Atau tim Langit Media Pro akan menghubungi dalam
                                1×24 jam.
                            </p>
                        )}
                        {!isSuccess && (
                            <p className="text-white/60 text-base">
                                Terjadi kesalahan saat mengirim data. Silahkan coba lagi atau
                                hubungi kami langsung melalui WhatsApp.
                            </p>
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onClose}
                        className={`relative z-10 mt-8 w-full py-3.5 rounded-full font-bold text-white transition-all ${isSuccess
                            ? "bg-[#E20EC2] hover:shadow-[0_0_25px_rgba(226,14,194,0.5)]"
                            : "bg-red-500/80 hover:bg-red-500"
                            }`}
                    >
                        Tutup
                    </motion.button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// ──────────────────────────── Main Component ──────────────────────────────
export default function ContactSection() {
    const supabase = createClient();
    const [form, setForm] = useState<FormData>(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [modal, setModal] = useState<"success" | "error" | null>(null);
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const validate = (): boolean => {
        const e: Partial<FormData> = {};
        if (!form.full_name.trim()) e.full_name = "Nama wajib diisi";
        if (!form.email_address.trim()) e.email_address = "Email wajib diisi";
        if (!form.project_type) e.project_type = "Pilih tipe proyek";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Clear individual error
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);
        try {
            const { data: inserted, error } = await supabase.from("enquiry").insert({
                full_name: form.full_name.trim(),
                email_address: form.email_address.trim(),
                phone_number: form.phone_number.trim() || null,
                project_type: form.project_type,
                message: form.message.trim() || null,
            }).select("id").single();

            if (error) throw error;

            // Log activity so admin gets notified in real-time
            await logActivity({
                action: "created",
                entity: "enquiry",
                entity_id: inserted?.id || "new",
                entity_title: form.full_name.trim(),
                detail: form.project_type,
            });

            setModal("success");
            setForm(EMPTY_FORM);
        } catch {
            setModal("error");
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass = (field: keyof FormData) =>
        `w-full bg-transparent border-b py-3 text-white placeholder:text-white/40 focus:outline-none transition-colors ${errors[field]
            ? "border-red-400 focus:border-red-400"
            : "border-white/20 focus:border-[#E20EC2]"
        }`;

    return (
        <>
            {/* ── Modal ── */}
            {modal && <ResultModal type={modal} onClose={() => setModal(null)} />}

            <section className="py-24 max-w-[1440px] mx-auto px-4 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Left: Contact Methods */}
                    <div className="space-y-8">
                        {[
                            {
                                title: "Head Office",
                                content: (
                                    <p className="text-white/70 text-lg">
                                        Bekasi Kota, Jawa Barat<br />Indonesia
                                    </p>
                                ),
                                delay: 0,
                            },
                            {
                                title: "E-mail Address",
                                content: (
                                    <a
                                        href="mailto:contact@langitmediapro.com"
                                        className="text-[#E20EC2] font-medium text-lg hover:text-white transition-colors"
                                    >
                                        contact@langitmediapro.com
                                    </a>
                                ),
                                delay: 0.1,
                            },
                            {
                                title: "Let's Talk",
                                content: (
                                    <a
                                        href="https://api.whatsapp.com/send/?phone=%2B6281243664366&text=Halo+Langit+Media+Pro&type=phone_number&app_absent=0"
                                        className="text-[#E20EC2] font-medium text-lg hover:text-white transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        +62 81243664366
                                    </a>
                                ),
                                delay: 0.2,
                            },
                        ].map(({ title, content, delay }) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay }}
                                className="bg-[#1B1830] border border-white/5 rounded-3xl p-8 hover:border-[#E20EC2]/30 transition-colors duration-300"
                            >
                                <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                                {content}
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#1B1830] border border-white/5 rounded-3xl p-8 lg:p-9 relative overflow-hidden"
                    >
                        {/* Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E20EC2]/10 blur-[100px] pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-[27px] font-bold text-white mb-8">
                                Konsultasikan Kebutuhan{" "}
                                <span className="text-primary">Bisnis Anda</span>
                            </h2>

                            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                                {/* Row 1 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <input
                                            name="full_name"
                                            type="text"
                                            placeholder="Your Name *"
                                            value={form.full_name}
                                            onChange={handleChange}
                                            className={inputClass("full_name")}
                                        />
                                        {errors.full_name && (
                                            <p className="text-red-400 text-xs mt-1">{errors.full_name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            name="email_address"
                                            type="email"
                                            placeholder="Your E-mail *"
                                            value={form.email_address}
                                            onChange={handleChange}
                                            className={inputClass("email_address")}
                                        />
                                        {errors.email_address && (
                                            <p className="text-red-400 text-xs mt-1">{errors.email_address}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <input
                                            name="phone_number"
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={form.phone_number}
                                            onChange={handleChange}
                                            className={inputClass("phone_number")}
                                        />
                                    </div>
                                    <div>
                                        <select
                                            name="project_type"
                                            value={form.project_type}
                                            onChange={handleChange}
                                            className={`${inputClass("project_type")} cursor-pointer appearance-none bg-transparent`}
                                            style={{ backgroundImage: "none" }}
                                        >
                                            <option value="" disabled className="bg-[#1B1830] text-white/40">
                                                Select Project Type *
                                            </option>
                                            {PROJECT_TYPES.map((pt) => (
                                                <option key={pt} value={pt} className="bg-[#1B1830] text-white">
                                                    {pt}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.project_type && (
                                            <p className="text-red-400 text-xs mt-1">{errors.project_type}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <textarea
                                        name="message"
                                        placeholder="Your Message Here"
                                        rows={5}
                                        value={form.message}
                                        onChange={handleChange}
                                        className={`${inputClass("message")} resize-none`}
                                    />
                                </div>

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    disabled={submitting}
                                    whileHover={!submitting ? { scale: 1.03 } : {}}
                                    whileTap={!submitting ? { scale: 0.97 } : {}}
                                    className="bg-white text-[#19172A] font-bold px-10 py-4 rounded-full hover:bg-[#E20EC2] hover:text-white transition-colors duration-300 mt-4 group flex items-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            Mengirim...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <img
                                                src="/icun.png"
                                                alt="Send"
                                                className="w-4 h-4 object-contain transition-transform group-hover:translate-x-1 filter brightness-0 group-hover:invert"
                                            />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
