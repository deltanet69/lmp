"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Enquiry', href: '/enquiry' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <div className="mx-auto max-w-[1440px] px-4 md:px-12 pointer-events-auto relative z-50">
                {/* Unified Mobile Header / Desktop Container */}
                <div className="flex items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-2.5 px-6 shadow-lg shadow-black/20 md:bg-transparent md:backdrop-blur-none md:border-transparent md:rounded-none md:p-0 md:shadow-none">

                    {/* Logo Section */}
                    <div className="flex items-center justify-start">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                            <img src="/lmp.png" alt="LMP Logo" className="h-8 md:h-14 w-auto object-contain" />
                        </Link>
                    </div>

                    {/* Desktop Menu Section */}
                    <div className="hidden md:flex relative items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-2 px-10 gap-8 shadow-lg shadow-black/20">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group">
                                <Link
                                    href={link.href}
                                    className={`text-md tracking-wide hover:text-[#E20EC2] transition-colors py-2 block ${pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href)) ? 'text-[#E20EC2] font-bold' : 'text-white/90'}`}
                                >
                                    {link.name}
                                </Link>
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
                        className="md:hidden flex items-center justify-center p-2 rounded-full text-white hover:bg-white/10 transition-colors"
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
                                    <Link
                                        href={link.href}
                                        className={`text-xl font-medium hover:text-[#E20EC2] block ${pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href)) ? 'text-[#E20EC2]' : 'text-white/90'}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </div>
                            ))}

                            {/* Mobile CTA Button */}
                            <div className="mt-4">
                                <Link
                                    href="https://api.whatsapp.com/send/?phone=%2B6281243664366&text=Halo+Langit+Media+Pro&type=phone_number&app_absent=0"
                                    className="flex items-center justify-center gap-3 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full overflow-hidden shadow-lg shadow-black/20"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span>Let&apos;s talk</span>
                                    <img src="/phone.png" alt="Phone" className="w-6 h-6 object-contain" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
