"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { WordRotate } from '@/components/ui/word-rotate';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    '/hero/g1.png',
    '/hero/g2.png',
    '/hero/g3.png'
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Slider */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('${images[currentIndex]}')`,
                            willChange: 'transform'
                        }}
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1.1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            opacity: { duration: 1.5 },
                            scale: { duration: 10, ease: "linear" }
                        }}
                    />
                </AnimatePresence>
            </div>
            {/* Overlay gelap agar teks terbaca, tipis saja biar gambar tetap terlihat */}
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            {/* Konten Utama */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center justify-center pt-50 min-h-screen">

                    {/* Left Side - Text Content (SESUAIKAN DENGAN REFERENSI) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white space-y-6"
                    >
                        {/* Small heading like "Hi There, I am Gerold" */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-7 py-2 w-auto">
                            <span className="w-2 h-2 rounded-full bg-[#00e5ff]  "></span>
                            <span className="text-xs md:text-sm  text-white/90 tracking-widest ">Your Creative Partner</span>
                        </div>

                        {/* Main Headline like "Designs for the Digital World" */}
                        <h1 className="text-5xl md:text-5xl lg:text-5xl font-bold leading-tight -mb-0.5">
                            Your Trusted Production Partner
                        </h1>

                        {/* Rotating Words - menggantikan fungsi "Designs for the Digital World" sebagai value prop */}
                        <div className="text-5xl md:text-5xl lg:text-5xl font-semibold min-h-[60px]">
                            <WordRotate
                                className="text-primary"
                                words={["Company Profile", "Video Animation", "Website Development"]}
                            />
                        </div>

                        {/* Description like "Transforming ideas into..." */}
                        <p className="text-gray-300 text-lg max-w-xl leading-relaxed pt-4">
                            Mitra strategis perusahaan terkemuka Indonesia dalam menciptakan company profile,
                            video animasi, dan pengembangan website yang memperkuat reputasi brand.
                        </p>

                        {/* CTA Buttons - seperti "Become a Pro Designer" tapi kita ganti dengan 2 tombol */}
                        <div className="flex flex-wrap gap-4 pt-6">
                            <Link
                                href="/contact"
                                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-all tracking-wide shadow-lg hover:shadow-primary/30"
                            >
                                Mulai Diskusi
                            </Link>
                            <Link
                                href="/portfolio"
                                className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold transition-all tracking-wide backdrop-blur-sm"
                            >
                                Lihat Portfolio
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Side - Gambar (KOSONG, karena background sudah di kiri, ini bisa untuk elemen dekoratif kecil atau tidak ada) */}
                    {/* Sesuai referensi, gambar besar ada di background, jadi sisi kanan bisa dibiarkan minimalis atau untuk teks tambahan */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:block relative"
                    >
                        {/* Kamu bisa tambahkan elemen dekoratif kecil di sini jika mau, misalnya: */}
                        {/* <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div> */}
                        {/* Atau biarkan kosong agar fokus ke teks dan background */}
                    </motion.div>

                </div>
            </div>

            {/* Scroll Indicator (optional) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            >
                <div className="w-5 h-9 border-2 border-white/30 rounded-full flex justify-center">
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1 h-2 bg-white/60 rounded-full mt-2"
                    />
                </div>
            </motion.div>
        </section>
    );
}