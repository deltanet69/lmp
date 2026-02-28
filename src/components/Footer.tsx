import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative bg-[#19172A] overflow-hidden ">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-40">
                <img src="/footer.png" alt="Footer Background" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-12">

                {/* CTA Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 py-24 mb-16 border-b border-white/10">
                    <div className="mb-8 md:mb-0 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl leading-tight font-patua text-white mb-6">Siap Mewujudkan Kebutuhan Visual<br />
                            Perusahaan Anda?
                        </h2>
                        <p className="text-white/70 text-lg font-medium max-w-2xl leading-relaxed">Tim kami siap membantu dari riset hingga eksekusi. Diskusikan kebutuhan Anda sekarang juga..</p>
                    </div>
                    <button className="flex items-center gap-5 bg-[#E20EC2] hover:bg-primary/90 text-white px-12 py-4 rounded-full font-bold transition-all hover:shadow-[5px_5px_40px_rgba(226,14,194,0.6)] text-xl cursor-pointer group">
                        <img src="/cs.png" alt="CS" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />
                        <span>Hubungi Tim LMP</span>
                    </button>
                </div>

                {/* Footer 3 Sections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
                    {/* Section 1 */}
                    <div className="space-y-8">
                        <img src="/lmp.png" alt="LMP Logo" className="h-14 w-auto object-contain" />
                        <p className="text-white/70 max-w-sm text-md leading-relaxed font-medium italic">
                            &quot;Menjangkau Langit, Menginspirasi Bumi.&quot;<br />
                            Your Trusted Production Partner.
                        </p>
                        <div className="flex items-center gap-8">
                            {/* Social links */}
                            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
                                <img src="/ig.png" alt="Instagram" className="w-8 h-8 object-contain" />
                            </Link>
                            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
                                <img src="/fb.png" alt="Facebook" className="w-8 h-8 object-contain" />
                            </Link>
                            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
                                <img src="/yt.png" alt="YouTube" className="w-8 h-8 object-contain" />
                            </Link>
                            <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
                                <img src="/tk.png" alt="TikTok" className="w-8 h-8 object-contain" />
                            </Link>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <h3 className="text-2xl font-patua text-white mb-10 tracking-widest uppercase text-xl mt-3">Quick Links</h3>
                        <ul className="space-y-6">
                            <li><Link href="/projects" className="text-white/60 hover:text-primary transition-colors text-lg font-medium">Projects</Link></li>
                            <li><Link href="/services" className="text-white/60 hover:text-primary transition-colors text-lg font-medium">Our Services</Link></li>
                            <li><Link href="/enquiry" className="text-white/60 hover:text-primary transition-colors text-lg font-medium">Enquiry</Link></li>
                            <li><Link href="/contact" className="text-white/60 hover:text-primary transition-colors text-lg font-medium">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <h3 className="text-2xl font-patua text-white mb-10 tracking-widest uppercase text-xl mt-3">Get in Touch</h3>
                        <ul className="space-y-8">
                            <li className="flex items-center gap-6 group">
                                <img src="/gtc3.png" alt="Phone" className="w-7 h-7 object-contain group-hover:scale-110 transition-transform" />
                                <Link href="tel:+62123456789" className="text-white/60 group-hover:text-primary transition-colors text-lg font-medium tracking-wide">+62 123 4567 890</Link>
                            </li>
                            <li className="flex items-center gap-6 group">
                                <img src="/gtc2.png" alt="Email" className="w-7 h-7 object-contain group-hover:scale-110 transition-transform" />
                                <Link href="mailto:contact@langitmediapro.id" className="text-white/60 group-hover:text-primary transition-colors text-lg font-medium tracking-wide">contact@langitmediapro.id</Link>
                            </li>
                            <li className="flex items-center gap-6 group">
                                <img src="/gtc1.png" alt="Location" className="w-7 h-7 object-contain group-hover:scale-110 transition-transform" />
                                <span className="text-white/60 group-hover:text-primary transition-colors text-lg font-medium tracking-wide leading-relaxed">
                                    123 Media Street, Creative City
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footprint Section */}
                <div className="pb-12">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg py-5 px-7 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
                        <div className="order-2 md:order-1 text-sm">
                            © {new Date().getFullYear()} <span className="text-primary text-md">langit media pro</span>. All rights reserved.

                        </div>
                        <div className="text-white/50 text-md  order-1 md:order-2">
                            <Link href="/privacy-policy" className="text-white/50 hover:text-primary transition-colors text-sm ">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
