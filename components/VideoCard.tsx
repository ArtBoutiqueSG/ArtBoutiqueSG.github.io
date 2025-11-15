"use client";
import { useEffect, useState } from "react";
import { GumletItem } from "@/app/Data/types";
import Link from "next/link";
import { useRef } from "react";
import { toSlug } from "@/utils/slug";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";



export default function VideoCard({ item }: { item: GumletItem }) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [userInteracted, setUserInteracted] = useState(false);
    const [videoVisible, setVideoVisible] = useState(false);

    const togglePlay = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setUserInteracted(true);

        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play().catch(() => { });
            setIsPlaying(true);
        }
    };

    const toggleMute = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setUserInteracted(true);

        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const onHover = () => {
        if (userInteracted) return;
        if (window.innerWidth < 768) return;

        if (videoRef.current) {
            videoRef.current.muted = true;

            // Make the video visible BEFORE calling play()
            setVideoVisible(true);

            // Allow the DOM to update before calling play()
            setTimeout(() => {
                videoRef.current?.play().catch(() => { });
            }, 50);

            setIsPlaying(true);
        }
    };


    const onLeave = () => {
        if (userInteracted) return; // <-- prevent hover pause after click
        if (window.innerWidth < 768) return;
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    return (
        <Link
            href={`/category/${toSlug(item.Category)}`}
            className="
        relative block flex-shrink-0
        w-[75vw] sm:w-[55vw] md:w-[260px]
        rounded-xl overflow-hidden
      "
        >
            <div
                className="relative w-full overflow-hidden rounded-xl group pointer-events-auto"
                style={{ aspectRatio: "9 / 16" }} // <-- Instagram-style portrait
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
            >
                {/* Thumbnail */}
                <img
                    src={item.gumlet.thumbnailUrl}
                    alt={item.gumlet.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300
        ${videoVisible ? "opacity-0" : "opacity-100"}`}
                />

                {/* Video */}
                <video
                    ref={videoRef}
                    src={item.gumlet.playbackUrl}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300
        ${videoVisible ? "opacity-100" : "opacity-0"}`}
                    playsInline
                    muted
                    preload="auto"
                    onPlay={() => setVideoVisible(true)}
                    onPause={() => setVideoVisible(false)}
                />

                {/* Category Tag */}
                <span className="absolute top-3 left-3 bg-accent text-xs px-3 py-1 rounded-full shadow-md rotate-[-4deg] z-20">
                    {item.Category}
                </span>


                {/* CONTROLS */}
                <div className="absolute bottom-3 right-3 flex flex-col gap-2 z-20">

                    {/* Play / Pause Button */}
                    <button
                        onClick={togglePlay}
                        className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition"
                    >
                        {isPlaying ? (
                            <Pause className="w-4 h-4" />
                        ) : (
                            <Play className="w-4 h-4" />
                        )}
                    </button>

                    {/* Volume Button */}
                    <button
                        onClick={toggleMute}
                        className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition"
                    >
                        {isMuted ? (
                            <VolumeX className="w-4 h-4" />
                        ) : (
                            <Volume2 className="w-4 h-4" />
                        )}
                    </button>

                </div>
            </div>


        </Link>
    );
}
