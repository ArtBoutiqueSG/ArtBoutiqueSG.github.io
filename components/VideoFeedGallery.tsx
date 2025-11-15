"use client";
import catalog from "@/app/Data/catalog.json";
import VideoCard from "@/components/VideoCard";
import { VideoItem } from "@/app/Data/types";

function toGumletItem(videoFeedItem: VideoItem) {
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
    Category: videoFeedItem.category,
    gumlet: {
      "thumbnailUrl": `https://video.gumlet.io/${sourceId}/${assetId}/thumbnail-1-0.png`,
      "playbackUrl": `https://video.gumlet.io/${sourceId}/${assetId}/main.m3u8`
    }
  };
  return gumletItem;
}
export default function VideoFeedGallery() {
  const feed = catalog.videoFeed;

  return (
    <div className="w-full overflow-x-auto whitespace-nowrap p-2"    >
      <div className="flex gap-4">
        {feed.map((item, index) => {
          const gItem = toGumletItem(item);
          return <VideoCard item={gItem} key={index} />
        })}
      </div>
    </div>
  );
}