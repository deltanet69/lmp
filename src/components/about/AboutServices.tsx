"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const services = [
    { num: "01", title: "Creative Design Solutions", href: "#" },
    { num: "02", title: "Branding and Identity Mastery", href: "#" },
    { num: "03", title: "Photography and Videography", href: "#" },
    { num: "04", title: "UI/UX Design Innovation", href: "#" },
];

export default function AboutServices() {
    return (
        <section className="relative w-full py-24 bg-[#0C101A] overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight max-w-2xl">
                            Showcasing excellence through portfolios
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Link href="/services" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-bold tracking-widest uppercase text-sm">
                            See More
                            <span className="w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center bg-primary/10">
                                <ArrowUpRight size={16} />
                            </span>
                        </Link>
                    </motion.div>
                </div>

                {/* Services List */}
                <div className="space-y-4">
                    {services.map((service, index) => (
                        <Link href={service.href} key={index} className="block group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 md:p-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all duration-300 hover:border-primary/50"
                            >
                                <div className="flex items-center gap-8 md:gap-12">
                                    <span className="text-2xl md:text-3xl font-black text-white/20 group-hover:text-primary transition-colors">
                                        {service.num}
                                    </span>
                                    <h3 className="text-2xl md:text-4xl font-bold text-white group-hover:text-white transition-colors">
                                        {service.title}
                                    </h3>
                                </div>
                                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all duration-300 -rotate-45 group-hover:rotate-0">
                                    <ArrowUpRight size={28} className="text-white opacity-50 group-hover:opacity-100" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
