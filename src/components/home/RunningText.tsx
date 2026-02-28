"use client";
import { motion } from 'framer-motion';

const items = [
    "Company profile", "Animation", "website development",
    "Company profile", "Animation", "website development",
    "Company profile", "Animation", "website development",
    "Company profile", "Animation", "website development",
];

export default function RunningText() {
    return (
        <div className="w-full bg-[#0C0F18] mt-20 py-8 md:py-10 overflow-hidden flex whitespace-nowrap overflow-x-hidden">
            <motion.div
                className="flex items-center gap-12 md:gap-24 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            >
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-12 md:gap-24">
                        <span
                            className="text-5xl md:text-7xl font-black text-transparent tracking-[0.2em] uppercase"
                            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.15)' }}
                        >
                            {item}
                        </span>
                        <img src="/dot.png" alt="dot" className="w-5 h-5 md:w-8 md:h-8 object-contain" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
