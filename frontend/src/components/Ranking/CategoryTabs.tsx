"use client";
import { genres } from "@/lib/novels";

const RankingTabs = [
  { key: "overall", label: "🏆 Overall Ranking" },
  { key: "popularity", label: "🔥 Popularity Ranking" },
  ...genres.map((g) => ({ key: g.toLowerCase(), label: g })),
];

interface CategoryTabsProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

export default function CategoryTabs({
  selectedTab,
  onTabChange,
}: CategoryTabsProps) {
  return (
    <aside className="lg:col-span-1 space-y-2">
      <h2 className="text-xl font-semibold mb-4">Rankings</h2>
      {RankingTabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`w-full text-left px-4 py-2 rounded-md transition ${
            selectedTab === tab.key
              ? "bg-primary text-primary-foreground font-medium"
              : "hover:bg-muted text-muted-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </aside>
  );
}
