"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', isDropdown: true },
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Enquiry', href: '/enquiry' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isMobileMenuOpen]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 pointer-events-none ${isScrolled ? 'pt-4 pb-2' : 'pt-6 pb-2'}`}>
            <div className="mx-auto max-w-[1440px] px-4 md:px-12 flex items-center justify-between pointer-events-auto relative z-50">
                {/* Logo Section */}
                <div className="flex items-center justify-start">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <img src="/lmp.png" alt="LMP Logo" className="h-10 md:h-14 w-auto object-contain" />
                    </Link>
                </div>

                {/* Desktop Menu Section */}
                <div className="hidden md:flex relative items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-3.5 px-10 gap-8 shadow-lg shadow-black/20">
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative group">
                            {link.isDropdown ? (
                                <div
                                    className="cursor-pointer text-md tracking-wide text-white/90 hover:text-[#E20EC2] transition-colors flex items-center gap-1 py-2"
                                    onMouseEnter={() => setIsHomeDropdownOpen(true)}
                                    onMouseLeave={() => setIsHomeDropdownOpen(false)}
                                >
                                    {link.name}
                                    <svg className={`w-4 h-4 transition-transform duration-300 ${isHomeDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {isHomeDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 mt-2 w-48 bg-[#1B1830]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl py-2"
                                            >
                                                <Link href="/?variant=1" className="block px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                                                    Home 1
                                                </Link>
                                                <Link href="/?variant=2" className="block px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                                                    Home 2
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link href={link.href!} className="text-md tracking-wide text-white/90 hover:text-[#E20EC2] transition-colors py-2 block">
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA Button Section (Hidden on Mobile) */}
                <div className="hidden md:flex bg-white/5 backdrop-blur-md border border-white/10 rounded-full overflow-hidden shadow-lg shadow-black/20">
                    <Link href="https://api.whatsapp.com/send/?phone=%2B6281243664366&text=Halo+Langit+Media+Pro&type=phone_number&app_absent=0" className="flex items-center gap-3 px-8 py-3.5 hover:bg-white/10 transition-colors">
                        <span className="text-md text-white tracking-wider">Let&apos;s talk</span>
                        <img src="/phone.png" alt="Phone" className="w-5 h-5 object-contain" />
                    </Link>
                </div>

                {/* Mobile Menu Toggle (Hamburger) */}
                <button
                    className="md:hidden flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-[#19172A]/98 backdrop-blur-xl md:hidden flex flex-col pt-32 px-6 pb-8 pointer-events-auto h-screen overflow-y-auto"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <div key={link.name} className="border-b border-white/10 pb-4">
                                    {link.isDropdown ? (
                                        <div className="flex flex-col gap-4">
                                            <span className="text-2xl font-bold text-white/50">{link.name}</span>
                                            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#E20EC2]">
                                                <Link
                                                    href="/?variant=1"
                                                    className="text-xl text-white/90 hover:text-[#E20EC2]"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    Home 1
                                                </Link>
                                                <Link
                                                    href="/?variant=2"
                                                    className="text-xl text-white/90 hover:text-[#E20EC2]"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    Home 2
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            href={link.href!}
                                            className="text-2xl font-bold text-white/90 hover:text-[#E20EC2] block"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
