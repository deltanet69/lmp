"use client";

import { useState } from "react";

interface ProjectGalleryProps {
    images: string[];
    title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
    const [lightbox, setLightbox] = useState<string | null>(null);

    if (!images || images.length === 0) return null;

    return (
        <>
            {/* Gallery Grid — "Image Gallery with Hovered Content" style */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {images.map((src, index) => (
                    <button
                        key={index}
                        onClick={() => setLightbox(src)}
                        className="group relative overflow-hidden rounded-2xl aspect-square bg-white/5 border border-white/10 cursor-zoom-in"
                    >
                        {/* Image */}
                        <img
                            src={src}
                            alt={`${title} gallery ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Hover overlay — Hovered Content style */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-4">
                            <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
                                <div className="flex items-center gap-2 text-white/80">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                    </svg>
                                    <span className="text-xs font-semibold uppercase tracking-widest">View</span>
                                </div>
                            </div>
                        </div>

                        {/* Corner index badge */}
                        <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {index + 1}
                        </span>
                    </button>
                ))}
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-sm"
                    onClick={() => setLightbox(null)}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
                        onClick={() => setLightbox(null)}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Full Image */}
                    <img
                        src={lightbox}
                        alt="Gallery preview"
                        className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl select-none"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Navigation */}
                    {images.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((src, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => { e.stopPropagation(); setLightbox(src); }}
                                    className={`w-2.5 h-2.5 rounded-full border transition-all ${src === lightbox
                                        ? "bg-primary border-primary scale-125"
                                        : "bg-white/30 border-white/30 hover:bg-white/60"
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
