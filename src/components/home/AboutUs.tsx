"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SpinningText } from '@/components/ui/spinning-text';

export default function AboutUs() {
    return (
        <section className="relative w-full py-24 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 items-center">

                    {/* Left Side: Image with Glass & Spinning Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative flex justify-start pb-12 lg:pb-0"
                    >
                        <div className="relative w-full max-w-xl aspect-[4/5] bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-2 lg:p-3">
                            <img src="/aboutimage.png" alt="About Us" className="w-full h-auto max-h object-cover hover:scale-105 transition-transform duration-700 rounded-[1.5rem]" />

                            {/* Floating Spinning Text */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-4 -right-8 md:-bottom-12 md:-right-8 bg-[#19172A] p-3 rounded-full border border-white/10 shadow-xl shadow-primary/20 w-32 h-32 md:w-44 md:h-44 flex items-center justify-center overflow-hidden"
                            >
                                <div className="text-white text-[15px] md:text-[22px] tracking-widest">
                                    <SpinningText>
                                        We Are Creative Agency •
                                    </SpinningText>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side: About Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <p className="text-secondary font-bold tracking-widest text-sm uppercase mb-3">About Us</p>
                        <div className="space-y-3">
                            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight">Langit Media Pro</h2>
                            <h3 className="text-xl md:text-xl text-white font-medium italic">&quot;Menjangkau Langit, Menginspirasi Bumi&quot;</h3>
                        </div>
                        <p className="text-white/70 text-lg md:text-lg leading-relaxed max-w-full font-medium">
                            Adalah semangat tim kami. Dengan kreativitas tanpa batas, kami menciptakan karya yang bermakna, memadukan teknologi terkini dan cerita mendalam.
                            <br />
                            <br />
                            Kami percaya pada kolaborasi dan dampak positif, menjadikan setiap produksi inspirasi bagi perubahan. Langit adalah kanvas kami, bumi adalah panggungnya.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors shadow-lg group hover:border-primary/30"
                            >
                                <h4 className="text-xl font-bold text-secondary mb-3">Pendekatan Setiap Karya</h4>
                                <p className="text-white/60 text-base leading-relaxed">Setiap proyek adalah kanvas bagi kami untuk menunjukkan dedikasi terhadap detail dan kreativitas tanpa batas.</p>
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors shadow-lg group hover:border-primary/30"
                            >
                                <h4 className="text-xl font-bold text-secondary mb-3">Solusi Bisnis Terintegrasi</h4>
                                <p className="text-white/60 text-base leading-relaxed">Konsultasikan kebutuhan komunikasi visual dan digital Anda—kami siap memberikan saran ahli yang tepat sasaran.</p>
                            </motion.div>
                        </div>

                        <div className="pt-8 text-center lg:text-left">
                            <Link href="/about" className="inline-block bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(226,14,194,0.4)] hover:shadow-[0_0_30px_rgba(226,14,194,0.6)] uppercase tracking-wider text-sm">
                                Pelajari Lebih Lanjut
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
