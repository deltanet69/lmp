"use client";
import { motion } from 'framer-motion';

const clients = [
    { src: "/client/abipraya.png", alt: "Abipraya" },
    { src: "/client/apm.png", alt: "APM" },
    { src: "/client/atera.png", alt: "Atera" },
    { src: "/client/baxter.png", alt: "Baxter" },
    { src: "/client/bkkbn.png", alt: "BKKBN" },
    { src: "/client/braja.png", alt: "Braja" },
    { src: "/client/bri.png", alt: "BRI" },
    { src: "/client/daikin.png", alt: "Daikin" },
    { src: "/client/dharma.png", alt: "Dharma" },
    { src: "/client/epson.png", alt: "Epson" },
    { src: "/client/gulaku.png", alt: "Gulaku" },
    { src: "/client/image 42.png", alt: "Client Logo" },
    { src: "/client/indofoof.png", alt: "Indofood" },
    { src: "/client/jas.png", alt: "JAS" },
    { src: "/client/ksei.png", alt: "KSEI" },
    { src: "/client/lenovo.png", alt: "Lenovo" },
    { src: "/client/malindo.png", alt: "Malindo" },
    { src: "/client/mari.png", alt: "MARI" },
    { src: "/client/md.png", alt: "MD" },
    { src: "/client/mendikbud.png", alt: "Mendikbud" },
    { src: "/client/menhan.png", alt: "Menhan" },
    { src: "/client/menkes-1.png", alt: "Menkes" },
    { src: "/client/menkes.png", alt: "Menkes" },
    { src: "/client/mensos.png", alt: "Mensos" },
    { src: "/client/mui.png", alt: "MUI" },
    { src: "/client/nexia.png", alt: "Nexia" },
    { src: "/client/pelindo.png", alt: "Pelindo" },
    { src: "/client/pertanian.png", alt: "Pertanian" },
    { src: "/client/pln.png", alt: "PLN" },
    { src: "/client/pnm.png", alt: "PNM" },
    { src: "/client/roto.png", alt: "Roto" },
    { src: "/client/rsab.png", alt: "RSAB" },
    { src: "/client/sci.png", alt: "SCI" },
    { src: "/client/seameo.png", alt: "SEAMEO" },
    { src: "/client/timah.png", alt: "Timah" },
    { src: "/client/ui.png", alt: "UI" },
    { src: "/client/uin.png", alt: "UIN" },
    { src: "/client/vivo.png", alt: "Vivo" },
    { src: "/client/yarsi.png", alt: "Yarsi" },
    { src: "/client/zurich.png", alt: "Zurich" },
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
                {/* <div className="w-full relative py-8 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
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
                                className="h-10 md:h-12 w-auto object-contain opacity-60 hover:opacity-100  transition-opacity duration-300 filter grayscale hover:grayscale-0"
                            />
                        ))}
                    </motion.div>
                </div> */}

                {/* Trusted Brands Container */}
                <motion.div
                    className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-4 md:gap-2 mt-12 items-center justify-items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {clients.map((client, i) => (
                        <div key={i} className="flex justify-center items-center w-full h-20 bg-white/5 rounded-xl border border-white/5 hover:bg-white/80 hover:border-white/20 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm">
                            <img
                                src={client.src}
                                alt={client.alt}
                                className="max-h-12 max-w-[120px] object-contain transition-all duration-300 hover:scale-110"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
