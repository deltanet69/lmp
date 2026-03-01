"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

const images = [
    { src: "/gallery/g1.png", alt: "Gallery Image 1" },
    { src: "/gallery/g2.png", alt: "Gallery Image 2" },
    { src: "/gallery/g3.png", alt: "Gallery Image 3" },
    { src: "/gallery/g4.png", alt: "Gallery Image 4" },
    { src: "/gallery/g5.png", alt: "Gallery Image 5" },
    { src: "/gallery/g6.png", alt: "Gallery Image 6" },
];

export default function Gallery() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="relative w-full py-24 bg-[#0C101A] overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight capitalize">
                            Gallery langit media pro
                        </h2>
                    </motion.div>
                </div>

                {/* Gallery Hover Expand Component */}
                <div className="flex h-[400px] md:h-[600px] w-full gap-2 md:gap-4 overflow-hidden rounded-[2rem]">
                    {images.map((img, index) => {
                        // Determine flex basis logic
                        const isHovered = hoveredIndex === index;
                        const defaultBasis = "flex-1";
                        const hoverBasis = "flex-[3] md:flex-[4]"; // expands significantly, others shrink

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`relative h-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-2xl md:rounded-3xl cursor-pointer ${hoveredIndex === null ? defaultBasis : (isHovered ? hoverBasis : 'flex-[0.5]')
                                    }`}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="absolute inset-0 h-full w-full object-cover hover:scale-105 transition-transform duration-1000"
                                />

                                {/* Overlay Gradient - Only very visible when hovering */}
                                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-40'}`}></div>

                                {/* Optional: Text overlay on hover */}
                                <div className={`absolute bottom-6 left-6 right-6 transition-all duration-500 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 hidden md:block md:w-max'}`}>
                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 md:p-4 rounded-xl inline-block max-w-full truncate">
                                        <h3 className="text-white font-bold text-sm md:text-lg whitespace-nowrap overflow-hidden text-ellipsis">LMP Production {index + 1}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
