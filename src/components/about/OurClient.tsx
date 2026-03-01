"use client";
import { motion } from 'framer-motion';

const clients = [
    { src: "/client/daikin.png", alt: "Daikin" },
    { src: "/client/epson.png", alt: "Epson" },
    { src: "/client/gulaku.png", alt: "Gulaku" },
    { src: "/client/indofoof.png", alt: "Indofood" }, // Note: typo in original filename mapping maintained
    { src: "/client/lenovo.png", alt: "Lenovo" },
    { src: "/client/mendikbud.png", alt: "Mendikbud" },
    { src: "/client/menkes.png", alt: "Menkes" },
    { src: "/client/pelindo.png", alt: "Pelindo" },
    { src: "/client/pln.png", alt: "PLN" },
    { src: "/client/yarsi.png", alt: "Yarsi" },
];

// Double the array to ensure smooth infinite scrolling
const scrollerItems = [...clients, ...clients];

export default function OurClient() {
    return (
        <section className="relative w-full py-20 bg-[#0C101A] overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="max-w-5xl mx-auto px-4 md:px-12" >
                            <p className="text-secondary font-bold tracking-widest text-sm uppercase">Klien Kami</p>
                            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mt-1 mb-4">
                                Kami hadir sebagai <span className="text-primary">partner terbaik</span>
                            </h2>

                            <p className="text-white text-sm leading-6 ">Rumah produksi Langit Media Pro berlandaskan akta pendirian perseroan terbatas dengan nama
                                perusahaan PT Langit Media Pro, Kami mempresentasikan semangat dan harapan setinggi-tingginya dalam mengejar kesuksesesan.
                                Kami selalu hadir sebagai partner terbaik bagi client dalam mengimplementasikan strategi marketing dalam komunikasi audio visual maupun fotografi.
                            </p>
                        </div>

                    </motion.div>
                </div>

                {/* Marquee Container */}
                <div className="w-full relative py-8 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                    <motion.div
                        className="flex w-max items-center gap-16 md:gap-17"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                    >
                        {scrollerItems.map((client, i) => (
                            <img
                                key={i}
                                src={client.src}
                                alt={client.alt}
                                className="h-6 md:h-8 w-auto object-contain opacity-60 hover:opacity-100  transition-opacity duration-300 filter grayscale hover:grayscale-0"
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
