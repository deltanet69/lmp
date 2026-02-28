"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Projects', href: '/projects' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Enquiry', href: '/enquiry' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 pointer-events-none ${isScrolled ? 'pt-7 pb-2' : 'pt-6 pb-2'
            }`}>
            <div className="mx-auto max-w-[1700px] px-4 py-3 md:px-12 flex items-center justify-between pointer-events-auto">

                {/* Logo Section */}
                <div className="flex items-center justify-start ">
                    <Link href="/">
                        <img src="/lmp.png" alt="LMP Logo" className="h-14 w-auto object-contain" />
                    </Link>
                </div>

                {/* Menu Section */}
                <div className="hidden md:flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-3.5 px-10 gap-8 shadow-lg shadow-black/20">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className="text-md font-medium tracking-wide text-white/90 hover:text-primary transition-colors">
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* CTA Button Section */}
                <div className="flex bg-white/5 backdrop-blur-md border border-white/10 rounded-full overflow-hidden shadow-lg shadow-black/20">
                    <Link href="/contact" className="flex items-center gap-3 px-8 py-3.5 hover:bg-white/10 transition-colors">
                        <span className="text-sm font-medium text-white uppercase tracking-wider">Let&apos;s talk</span>
                        <img src="/phone.png" alt="Phone" className="w-5 h-5 object-contain" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
