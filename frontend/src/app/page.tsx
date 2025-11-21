import CompletedSection from "@/components/Home/CompletedSection";
import HeroSection from "@/components/Home/HeroSection";
import NewArrivalsSection from "@/components/Home/NewArrivalSection";
import RankingSection from "@/components/Home/RankingSection";
import TopGenreTags from "@/components/Home/TopGenreTags";
import TrendingSection from "@/components/Home/TrendingSection";
import WeeklySection from "@/components/Home/WeeklySection";
import { weeklyDATA } from "@/lib/novels";

export default function Home() {
  return (
    <main className="px-30">
      <HeroSection />
      <WeeklySection weeklyFeatured={weeklyDATA}/>
      <TrendingSection trendingNovels={weeklyDATA}/>
      <RankingSection />
      <NewArrivalsSection />
      <CompletedSection />
    </main>
  );
}
