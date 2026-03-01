"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { portfolioProjects } from '@/data/portfolio';

const categories = ["All Projects", "Company Profile", "Video Animation", "Website Development"];

export default function PortfolioGrid() {
    const [activeTab, setActiveTab] = useState("All Projects");

    const filteredProjects = activeTab === "All Projects"
        ? portfolioProjects
        : portfolioProjects.filter(p => p.category === activeTab);

    return (
        <section className="py-24 max-w-[1440px] mx-auto px-4 md:px-12">
            <div className="text-center mb-16">
                <h2
                    className="text-7xl md:text-8xl font-black mb-4 uppercase tracking-tight text-transparent bg-clip-text drop-shadow-2xl"
                    style={{ backgroundImage: 'linear-gradient(to top, #1B1830, #302C50, #726D96, #FFFFFF)' }}
                >
                    Latest Projects
                </h2>
                <p className="text-white/70 max-w-7xl mx-auto text-lg mb-12 font-medium">
                    Kami menyediakan solusi komunikasi visual dan digital yang dirancang khusus untuk kebutuhan korporasi anda.
                </p>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-7 py-2.5 rounded-full text-sm md:text-base transition-all duration-300 cursor-pointer border ${activeTab === cat
                                ? 'bg-primary text-white font-bold border-primary shadow-[0_0_25px_rgba(226,14,194,0.5)]'
                                : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative rounded-[2.5rem] overflow-hidden bg-[#1D1B2E] aspect-[3/4] cursor-pointer transition-all duration-500 hover:shadow-[0_0_40px_rgba(226,14,194,0.2)] border border-white/5"
                        >
                            <Link href={`/portfolio/${project.id}`} className="block w-full h-full">
                                {/* Project Image */}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />

                                {/* Top Badges */}
                                <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
                                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                                        {project.category}
                                    </span>
                                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                                        {project.year}
                                    </span>
                                </div>

                                {/* Bottom Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10"></div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                                    <div className="flex items-end justify-between gap-4">
                                        <div className="space-y-1">
                                            <p className="text-secondary font-bold text-xs uppercase tracking-[0.2em] transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                {project.subtitle}
                                            </p>
                                            <h3 className="text-xl md:text-xl font-bold text-white leading-tight">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-black/40 border border-white/20">
                                            <img src="/icun.png" alt="Arrow" className="w-5 h-5 object-contain brightness-0 invert" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
