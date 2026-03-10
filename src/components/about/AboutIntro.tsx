"use client";
import { motion } from 'framer-motion';

export default function AboutIntro() {
    return (
        <section className="relative w-full py-24 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Side: Image with Floating Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative flex justify-start pb-12 lg:pb-0"
                    >
                        {/* Main Image Container */}
                        <div className="relative w-full max-w-xl aspect-[4/5] bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-2 lg:p-3">
                            <img
                                src="/heroimg.png"
                                alt="About Langit Media Pro"
                                className="w-full h-full object-cover rounded-[1.5rem] hover:scale-105 transition-transform duration-700"
                            />


                        </div>

                        {/* Floating Glass Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-10 right-10   md:-bottom-8 md:right-1 bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-3xl shadow-2xl flex items-center gap-4 max-w-[240px]"
                        >
                            <span
                                className="text-5xl md:text-6xl font-black text-transparent tracking-tighter"
                                style={{ WebkitTextStroke: '2px hsla(180, 79%, 48%, 1.00)' }}
                            >
                                10
                            </span>
                            <div>
                                <p className="text-white font-bold leading-tight text-lg">Tahun</p>
                                <p className="text-white/70 text-sm">Pengalaman</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side: About Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <p className="text-secondary font-bold tracking-widest text-sm uppercase">Tentang Kami</p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">Langit Media Pro</h2>
                        <h3 className="text-lg md:text-2xl text-white font-medium italic mb-4">&quot;Menjangkau Langit, Menginspirasi Bumi&quot;</h3>

                        <p className="text-white/70 text-lg leading-relaxed font-medium">
                            Adalah semangat tim kami. Dengan kreativitas tanpa batas, kami menciptakan karya yang bermakna, memadukan teknologi terkini dan cerita mendalam.
                        </p>
                        <p className="text-white/70 text-lg leading-relaxed font-medium">
                            Kami percaya pada kolaborasi dan dampak positif, menjadikan setiap produksi inspirasi bagi perubahan. Langit adalah kanvas kami, bumi adalah panggungnya.
                        </p>
                        <img src="/lmpcr.png" className="w-42 h-42 object-contain" />
                    </motion.div>



                </div>
            </div>
        </section>
    );
}
