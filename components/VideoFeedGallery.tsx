"use client";
import catalog from "@/app/Data/catalog.json";
import { VideoItem } from "@/app/Data/types"
import Link from "next/link";
import { useRef } from "react";

function toSlug(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-");
}
function toGumletFeed(videoFeedItem: VideoItem) {
  const u = new URL(videoFeedItem.gumletUrl);
  const parts = u.pathname.split("/").filter(Boolean);

  // Expected pattern:
  // video/manage/collection/<sourceId>/asset/<assetId>
  const collectionIndex = parts.indexOf("collection");
  const assetIndex = parts.indexOf("asset");

  if (collectionIndex === -1 || assetIndex === -1) {
    throw new Error("Invalid Gumlet URL format");
  }

  const sourceId = parts[collectionIndex + 1];
  const assetId = parts[assetIndex + 1];
  const gumletItem = {
    Category : videoFeedItem.category,
    gumlet : {
      "thumbnailUrl": `https://video.gumlet.io/${sourceId}/${assetId}/thumbnail-1-0.png`,
      "playbackUrl": `https://video.gumlet.io/${sourceId}/${assetId}/main.m3u8`
    }
  };
  return gumletItem;
}
export default function VideoFeedGallery() {
  const feed = catalog.videoFeed;

  return (
    <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide p-2 mt-6">
      <div className="flex gap-4">
        {feed.map((item, index) => {
          const gItem = toGumletFeed(item);
          return <VideoCard item={gItem} key={index} />
        })}
      </div>
    </div>
  );
}

function VideoCard({ item }: { item: any }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const onHover = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => { });
    }
  };

  const onLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      href={`/category/${toSlug(item.Category)}`}
      className="relative block w-[200px] rounded-xl overflow-hidden"
    >
      <div
        className="relative w-full h-[260px] bg-black rounded-xl overflow-hidden group"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {/* Thumbnail */}
        <img
          src={item.gumlet.thumbnailUrl}
          alt={item.gumlet.title}
          className="absolute inset-0 object-cover w-full h-full group-hover:opacity-0 transition-opacity duration-300"
        />

        {/* Video player */}
        <video
          ref={videoRef}
          src={item.gumlet.playbackUrl}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          playsInline
          preload="none"
        />

        {/* Category tag */}
        <span className="absolute top-3 left-3 bg-accent text-xs px-3 py-1 rounded-full shadow-md rotate-[-4deg] z-20">
          {item.Category}
        </span>
      </div>
    </Link>
  );
}
