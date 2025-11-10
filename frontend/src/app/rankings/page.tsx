import { novels } from "@/lib/novels";
import RankingClient from "@/components/Ranking/RankingClient";

export default function RankingPage() {
  return (
    <div className="container mx-auto py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Novel Rankings</h1>
        <p className="text-muted-foreground">
          Discover the top-rated and most popular novels across all genres
        </p>
      </div>

      {/* Client Component */}
      <RankingClient novels={novels} />
    </div>
  );
}
