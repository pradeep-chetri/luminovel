"use client";

import { useState } from "react";
import CategoryTabs from "./CategoryTabs";
import RankList from "./RankList";
import { Novel } from "@/types/novel_type";
import { genres } from "@/lib/novels";

const RankingTabs = [
  { key: "overall", label: "🏆 Overall Ranking" },
  { key: "popularity", label: "🔥 Popularity Ranking" },
  ...genres.map((g) => ({ key: g.toLowerCase(), label: g })),
];

interface RankingClientProps {
  novels: Novel[];
}

export default function RankingClient({ novels }: RankingClientProps) {
  const [selectedTab, setSelectedTab] = useState("overall");

  const currentTabLabel =
    RankingTabs.find((t) => t.key === selectedTab)?.label || "Ranking";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar */}
      <CategoryTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />

      {/* Ranking List */}
      <section className="lg:col-span-3">
        <h2 className="text-2xl font-bold mb-6 capitalize">
          {currentTabLabel}
        </h2>
        <RankList novels={novels} selectedTab={selectedTab} />
      </section>
    </div>
  );
}
