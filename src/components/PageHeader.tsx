"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PageHeaderProps {
    breadcrumb: string;
    pillText: string;
    title: string;
    highlightWord?: string;
}

export default function PageHeader({ breadcrumb, pillText, title, highlightWord }: PageHeaderProps) {
    const parts = highlightWord ? title.split(highlightWord) : [title];

    return (
        <section className="relative w-full min-h-[450px] md:min-h-[550px] flex items-center pt-32 pb-20 overflow-hidden bg-[#0C101A]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img src="/page.png" alt="Header Background" className="w-(full) h-full object-cover opacity-40 grayscale-[50%]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0C101A] via-[#0C101A]/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#19172A] to-transparent opacity-80"></div>
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-12 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-white/40 text-sm font-bold tracking-widest uppercase">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="text-white/20">/</span>
                        <span className="text-primary">{breadcrumb}</span>
                    </div>

                    {/* Glass Pill */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-2.5 shadow-xl shadow-black/20"
                    >
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                        <span className="text-white text-xs font-bold tracking-[0.25em] uppercase">{pillText}</span>
                    </motion.div>

                    {/* H1 Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black text-white leading-[1.1] tracking-tighter max-w-5xl">
                        {highlightWord ? (
                            <>
                                {parts[0]}<span className="text-primary">{highlightWord}</span>{parts[1]}
                            </>
                        ) : title}
                    </h1>
                </motion.div>
            </div>
        </section>
    );
}
