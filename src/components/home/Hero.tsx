"use client";
import Link from 'next/link';
import { WordRotate } from '@/components/ui/word-rotate';
import { MagicCard } from '@/components/ui/magic-card';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Video with subtle zoom */}
            <motion.video
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src="/vid.mp4"
                autoPlay
                loop
                muted
                playsInline
            />
            {/* Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute top-0 left-0 w-full h-full bg-[#171720]/75 z-0"
            ></motion.div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-2 md:px-12 w-full pt-40 pb-20 lg:pt-0 lg:pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                    {/* Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white space-y-8 max-w-4xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-7 py-2 w-auto"
                        >
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                            <span className="text-xs md:text-sm text-white/90 tracking-widest uppercase">Welcome To</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter">
                            Your Trusted Production Partner
                        </h1>
                        <div className="flex flex-col sm:flex-row sm:items-center text-3xl md:text-5xl font-black min-h-[50px] md:min-h-[70px]">
                            <WordRotate
                                className="text-primary tracking-tighter"
                                words={["Company Profile", "Video Animation", "Website Development"]}
                            />
                        </div>
                        <p className="text-white/70 text-lg md:text-xl max-w-xl leading-relaxed font-medium tracking-tight">
                            Mitra strategis perusahaan-perusahaan terkemuka Indonesia dalam
                            menciptakan company profile, video animasi, dan pengembangan website
                            yang memperkuat reputasi brand.
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="flex flex-wrap gap-6 pt-3"
                        >
                            <Link href="/contact" className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full font-bold transition-all hover:shadow-[0_0_40px_rgba(226,14,194,0.6)] tracking-wider text-base">
                                Mulai Diskusi
                            </Link>
                            <Link href="/portfolio" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold transition-all tracking-wider text-base">
                                Lihat Portfolio
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="relative flex justify-center lg:justify-end perspective-1000"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, rotateZ: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative w-full max-w-sm md:max-w-sm lg:max-w-[480px] group"
                        >
                            <MagicCard
                                className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/20 bg-white/5 border border-white/10 cursor-pointer p-4"
                                gradientColor="rgba(226,14,194,0.15)"
                            >
                                <div className="relative rounded-[2rem] overflow-hidden">
                                    <img src="/heroimg.png" alt="Hero" className="w-full h-auto object-cover relative z-10" />

                                    {/* Watermark Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-opacity duration-300">
                                        <img
                                            src="/wm2.png"
                                            alt="Watermark"
                                            className="w-full h-auto object-contain"
                                            onError={(e) => console.log('Image failed to load:', e)}
                                        />
                                    </div>
                                </div>
                            </MagicCard>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
