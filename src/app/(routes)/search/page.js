"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import VideoCard from "@/components/VideoCard";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function SearchPageContent({ search_query }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (search_query) {
      fetch(`/api/watch?search_query=${encodeURIComponent(search_query)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch videos");
          }
          return response.json();
        })
        .then((data) => {
          setVideos(data);
        })
        .catch(() => {
          toast.error("Could not fetch videos", {
            position: "bottom-right",
            duration: 5000,
            style: {
              borderRadius: "10px",
              border: "1px solid red",
              background: "rgba(220, 38, 38, .7)",
              color: "#fff",
            },
          });
        });
    }
  }, [search_query]);

  return (
    <div className="md:w-1/2 w-[22.9rem] mx-1 md:mx-auto flex flex-col gap-8 md:gap-4 items-center pb-24 md:pb-4">
      {videos.length
        ? videos.map((video) => (
          <div key={video.id}>
            <div className="md:block hidden">
              <VideoCard
                isVertical={false}
                video={video}
                channel={video.channel}
                includeDescription
                isOption
                channelAvatar={true}
                className="object-cover aspect-square"
                width={35}
                height={35}
              />
            </div>
            <div className="block md:hidden">
              <VideoCard
                isVertical={true}
                video={video}
                channel={video.channel}
                isOption
                channelAvatar={true}
                className="object-cover aspect-square"
                width={35}
                height={35}
              />
            </div>
          </div>
        ))
        : "No videos found"}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InnerSearchPage />
    </Suspense>
  );
}

function InnerSearchPage() {
  const params = useSearchParams();
  const search_query = params.get("search_query");
  return (
    <SearchPageContent search_query={search_query} />
  );
}
