"use client";

import { Novel } from "@/types/novel_type";
import RankCard from "./RankCard";
import { genres } from "@/lib/novels";

interface RankListProps {
  novels: Novel[];
  selectedTab: string;
  limit?: number;
}

export default function RankList({
  novels,
  selectedTab,
  limit = 20,
}: RankListProps) {
  // Filter and sort based on tab
  let rankedNovels: Novel[] = [...novels];

  if (selectedTab === "popularity") {
    rankedNovels.sort((a, b) => b.views - a.views);
  } else if (genres.map((g: string) => g.toLowerCase()).includes(selectedTab)) {
    rankedNovels = rankedNovels
      .filter((n) => n.genre.toLowerCase() === selectedTab)
      .sort((a, b) => b.rating - a.rating);
  } else {
    // overall ranking by rating
    rankedNovels.sort((a, b) => b.rating - a.rating);
  }

  const displayNovels = rankedNovels.slice(0, limit);

  if (displayNovels.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No novels found in this category.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {displayNovels.map((novel, index) => (
        <RankCard key={novel.id} novel={novel} index={index} />
      ))}
    </div>
  );
}
