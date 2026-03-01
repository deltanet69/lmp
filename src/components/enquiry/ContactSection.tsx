"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
    return (
        <section className="py-24 max-w-[1440px] mx-auto px-4 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Left Column: Contact Methods */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#1B1830] border border-white/5 rounded-3xl p-8 hover:border-[#E20EC2]/30 transition-colors duration-300"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">Head Office</h3>
                        <p className="text-white/70 text-lg">
                            Bekasi Kota, Jawa Barat<br />
                            Indonesia
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-[#1B1830] border border-white/5 rounded-3xl p-8 hover:border-[#E20EC2]/30 transition-colors duration-300"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">E-mail Address</h3>
                        <a href="mailto:contact@langitmediapro.com" className="text-[#E20EC2] font-medium text-lg hover:text-white transition-colors">
                            contact@langitmediapro.com
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#1B1830] border border-white/5 rounded-3xl p-8 hover:border-[#E20EC2]/30 transition-colors duration-300"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">Let&apos;s Talk</h3>
                        <a href="tel:+6281243664366" className="text-[#E20EC2] font-medium text-lg hover:text-white transition-colors">
                            +62 812-4366-4366
                        </a>
                    </motion.div>
                </div>

                {/* Right Column: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-[#1B1830] border border-white/5 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
                >
                    {/* Glow effect matching BusinessProcess */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E20EC2]/10 blur-[100px] pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Elevate your brand with Us</h2>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/40 py-3 focus:outline-none focus:border-[#E20EC2] transition-colors"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Your E-mail"
                                        className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/40 py-3 focus:outline-none focus:border-[#E20EC2] transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/40 py-3 focus:outline-none focus:border-[#E20EC2] transition-colors"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Subject"
                                        className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/40 py-3 focus:outline-none focus:border-[#E20EC2] transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <textarea
                                    placeholder="Your Message Here"
                                    rows={5}
                                    className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/40 py-3 focus:outline-none focus:border-[#E20EC2] transition-colors resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="button"
                                className="bg-white text-[#19172A] font-bold px-10 py-4 rounded-full hover:bg-[#E20EC2] hover:text-white transition-colors duration-300 mt-4 group flex items-center gap-3"
                            >
                                Send Message
                                <img src="/icun.png" alt="Send" className="w-4 h-4 object-contain transition-transform group-hover:translate-x-1 filter brightness-0 group-hover:invert" />
                            </button>
                        </form>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
