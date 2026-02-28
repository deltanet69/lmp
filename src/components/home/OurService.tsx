"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
    {
        title: "Company Profile",
        description: "Memvisualkan nilai dan reputasi perusahaan Anda melalui Visual berkualitas tinggi.",
        icon: "/sr1.png"
    },
    {
        title: "Animation Videos",
        description: "Menjelaskan produk, layanan, atau bisnis yang kompleks menjadi visual menarik. ",
        icon: "/sr2.png"
    },
    {
        title: "Website Development",
        description: "Membangun company profile bisnis dengan teknologi & keamanan maksimal.",
        icon: "/sr3.png"
    }
];

export default function OurService() {
    return (
        <section className="py-24 max-w-[1440px] mx-auto px-4 md:px-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <p className="text-secondary font-bold tracking-widest text-sm uppercase mb-3">Our Services</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Layanan Unggulan Kami</h2>
                <p className="text-white/70 max-w-2xl mx-auto text-lg font-medium">
                    Kami menyediakan solusi komunikasi visual dan digital yang dirancang khusus untuk kebutuhan korporasi anda.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{ y: -10 }}
                        className="group relative backdrop-blur-md border border-white/10 rounded-3xl p-10 overflow-hidden transition-all duration-300 hover:bg-primary shadow-black/20 hover:shadow-[0_0_30px_rgba(226,14,194,0.4)] cursor-pointer"
                    >
                        <div className="mb-8 w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center p-4 group-hover:bg-white/20 transition-colors shadow-inner">
                            <img src={service.icon} alt={service.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{service.title}</h3>
                        <p className="text-white/70 group-hover:text-white/90 transition-colors text-base leading-relaxed font-medium">
                            {service.description}
                        </p>

                        <div className="mt-8">
                            <Link href="/services" className="inline-flex items-center gap-3 text-primary group-hover:text-white transition-colors cursor-pointer group/link font-bold uppercase tracking-widest text-sm">
                                Explore More
                                <img src="/icun.png" alt="Arrow" className="w-5 h-5 object-contain group-hover/link:translate-x-1 transition-transform brightness-0 invert" />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
