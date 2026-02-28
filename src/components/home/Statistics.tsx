"use client";
import { MagicCard } from '@/components/ui/magic-card';
import { motion } from 'framer-motion';

const stats = [
    { value: "10+", label: "Tahun Pengalaman" },
    { value: "200+", label: "Produksi Video Kreatif" },
    { value: "50+", label: "Klien Korporasi" },
];

export default function Statistics() {
    return (
        <section className="relative w-full py-24 overflow-hidden bg-[#151324]">
            {/* Floating Icons */}
            <motion.img
                src="/fl1.png"
                alt="Floating 1"
                className="absolute top-45 left-60 w-22 md:w-27 opacity-40 blur-[1px]"
                animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
                src="/fl2.png"
                alt="Floating 2"
                className="absolute bottom-10 right-60 w-20 md:w-32 opacity-40 blur-[1px]"
                animate={{ y: [0, 30, 0], rotate: [0, -10, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-[1440px] mx-auto px-4 md:px-12 relative z-10 text-center">
                <p className="text-secondary font-semibold tracking-wider text-sm md:text-base uppercase mb-2">Behind the pixels</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">Dalam Perjalanan Kami Selama 10 Tahun+</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div key={index} whileHover={{ y: -8 }}>
                            <MagicCard
                                className="flex flex-col items-center justify-center p-10 bg-[#201E35]/60 border-white/5 hover:shadow-[0_0_30px_rgba(226,14,194,0.3)] rounded-3xl h-full backdrop-blur-sm"
                                gradientColor="rgba(226,14,194,0.2)"
                            >
                                <h3 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-xl">{stat.value}</h3>
                                <p className="text-white/70 font-medium text-lg">{stat.label}</p>
                            </MagicCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
