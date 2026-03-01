"use client";
import { motion } from 'framer-motion';

const processes = [
    {
        icon: "/proses/1.png",
        title: "Research",
        description: "Bukan sekedar riset. Kami gali kebutuhan, target audience, dan point yang ingin disampaikan."
    },
    {
        icon: "/proses/2.png",
        title: "Strategy",
        description: "Data dan insight kami olah menjadi konsep yang akan memandu proses produksi."
    },
    {
        icon: "/proses/3.png",
        title: "Concept",
        description: "Tim kreatif kami mengembangkan konsep menjadi storyline, naskah, dan storyboard yang detail."
    },
    {
        icon: "/proses/4.png",
        title: "Production",
        description: "Tim produksi kami bekerja sesuai standar untuk menjdikan konsep menjadi karya visual."
    }
];

export default function BusinessProcess() {
    return (
        <section className="py-24 max-w-[1440px] mx-auto px-4 md:px-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <p className="text-[#0EA5E9] font-bold tracking-widest text-sm uppercase mb-3">Business Process</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Proses Kerja Kami</h2>
                <p className="text-white/70 max-w-3xl mx-auto text-lg font-medium leading-relaxed">
                    Langit Media Pro mempresentasikan semangat dan harapan setinggi-tingginya dalam mengejar kesuksesan. Kami selalu hadir sebagai partner terbaik bagi klien dalam mengimplementasikan strategi marketing dan komunikasi audio visual maupun fotografi.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {processes.map((process, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        whileHover={{ y: -5 }}
                        className="group relative bg-[#1B1830] border border-white/5 rounded-[2rem] p-8 overflow-hidden transition-all duration-500 hover:border-[#E20EC2]/50 hover:shadow-[0_0_40px_rgba(226,14,194,0.15)] rounded-2xl"
                    >
                        {/* Magic Glow Effect Background */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E20EC2]/0 to-[#7A0668]/0 group-hover:from-[#E20EC2]/10 group-hover:to-transparent transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none rounded-[2rem]" />

                        <div className="mb-8 w-16 h-16 flex items-center justify-center relative z-10">
                            {/* Note: Icon paths assume public/proces/... exists or will be added */}
                            <img
                                src={process.icon}
                                alt={process.title}
                                className="w-full h-full object-contain filter group-hover:brightness-125 transition-all duration-500"
                            />
                        </div>

                        <h3 className="text-2xl font-bold text-[#E20EC2] mb-4 relative z-10 tracking-wide">{process.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed font-medium relative z-10">
                            {process.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
