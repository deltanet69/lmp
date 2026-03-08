"use client";
import Link from 'next/link';
import { WordRotate } from '@/components/ui/word-rotate';
import { MagicCard } from '@/components/ui/magic-card';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

import { IPhoneMockup } from 'react-device-mockup';

const images = [
    '/hero/g5.png',
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
            {/* Background Video */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src="/vid2.mp4"
                autoPlay
                loop
                muted
                playsInline
                poster="/heroimg.png"
                preload="auto"
            />

            {/* Background Slider */}
            {/* <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('${images[currentIndex]}')`,
                            willChange: 'transform'
                        }}
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{
                            opacity: 1,
                            scale: [1, 1.3, 1]
                        }}
                        transition={{
                            opacity: { duration: 1.2 },
                            scale: {
                                duration: 20,
                                ease: "linear",
                                repeat: Infinity,
                                repeatType: "reverse"
                            }
                        }}
                    />
                </AnimatePresence>
            </div> */}


            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-linear-65 from-slate-950/95 to-slate-600/40 z-0"></div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-2 md:px-12 w-full pt-40 pb-20 lg:pt-0 lg:pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Side */}
                    <div className="text-white px-2 lg:px-0 space-y-6 md:space-y-8 max-w-4xl text-center lg:text-left mx-auto lg:mx-0">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-7 py-2 w-auto">
                            <span className="w-2 h-2 rounded-full bg-[#00e5ff]  "></span>
                            <span className="text-xs md:text-sm  text-white/90 tracking-widest ">Welcome To</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-[42px] font-black leading-tight tracking-tighter -mb-0.5">
                            Your Trusted Production Partner
                        </h1>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start text-3xl md:text-5xl lg:text-[42px] font-black min-h-[50px] md:min-h-[60px]">
                            <WordRotate
                                className="text-primary tracking-tighter"
                                words={["Company Profile", "Video Animation", "Website Development"]}
                            />
                        </div>
                        <p className="text-white/70 text-lg md:text-xl lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-8 font-medium tracking-tighter">
                            Mitra strategis perusahaan-perusahaan terkemuka Indonesia dalam
                            menciptakan company profile, video animasi, dan pengembangan website
                            yang memperkuat reputasi brand.
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-3 md:pt-6 lg:pt-3">
                            <Link href="/contact" className="bg-primary hover:bg-primary/90 text-white px-10 py-3 rounded-full font-medium transition-all  hover:shadow-[0_0_30px_rgba(226,14,194,0.6)]  tracking-wider text-sm md:text-base lg:text-sm">
                                Mulai Diskusi
                            </Link>
                            <Link href="/portfolio" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-3 rounded-full font-medium transition-all  tracking-wider text-sm md:text-base lg:text-sm">
                                Lihat Portfolio
                            </Link>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="relative flex justify-center lg:justify-end pt-12 md:pt-16 lg:pt-20">
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative w-full flex justify-center lg:justify-end"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -20, 0],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative group"
                            >
                                <IPhoneMockup
                                    screenWidth={300}
                                    screenType="island"
                                    frameColor="#161616"
                                    statusbarColor="#303030"
                                >
                                    <div className="w-full h-full bg-black shadow-xl">
                                        <video
                                            src="/herovideo.mp4"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            poster="/hero/g5.png"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </IPhoneMockup>

                                {/* Watermark Overlay - Optional, removed if it blocks the video screen or adjusted */}
                                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <img
                                        src="/wm2.png"
                                        alt="Watermark"
                                        className="w-full h-auto object-contain scale-75"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
