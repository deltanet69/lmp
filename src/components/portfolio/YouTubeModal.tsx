"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface YouTubeModalProps {
    url: string;
}

/** Extract a YouTube embed URL from various youtube link formats */
function getEmbedUrl(url: string): string {
    // Match youtu.be/VIDEO_ID or youtube.com/watch?v=VIDEO_ID
    const ytRegex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/;
    const match = url.match(ytRegex);
    if (match) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
    }
    // Fallback: use URL as-is (might already be an embed URL)
    return url;
}

export default function YouTubeModal({ url }: YouTubeModalProps) {
    const [open, setOpen] = useState(false);
    const embedUrl = getEmbedUrl(url);

    return (
        <>
            {/* Play Button */}
            <button
                onClick={() => setOpen(true)}
                className="absolute inset-0 flex items-center justify-center z-20 group"
                aria-label="Play video"
            >
                <div className="w-20 h-20 bg-red-600/90 hover:bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-800/60 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm border-4 border-white/20">
                    <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9 translate-x-0.5">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </button>

            {/* Modal */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                >
                    {/* Close button */}
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Video container */}
                    <div
                        className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <iframe
                            src={embedUrl}
                            title="YouTube video"
                            className="w-full h-full"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </>
    );
}
