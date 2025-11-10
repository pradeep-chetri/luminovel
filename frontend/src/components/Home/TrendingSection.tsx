"use client";

import Image from "next/image";

const trendingNovels = [
  {
    title: "Crimson Oath: Bloodbound",
    genre: "Fantasy",
    cover: "/novels/trending/trending_1.png",
  },
  {
    title: "Shattered Code",
    genre: "Sci-Fi",
    cover: "/novels/trending/trending_2.png",
  },
  {
    title: "The Blossoming Veil",
    genre: "Romance",
    cover: "/novels/trending/trending_3.png",
  },
  {
    title: "Empire of Ashes",
    genre: "Action",
    cover: "/novels/trending/trending_4.png",
  },
  {
    title: "Echoes of Eternity",
    genre: "Mystery",
    cover: "/novels/trending/trending_5.png",
  },
  {
    title: "Chronicles of the Depths",
    genre: "Adventure",
    cover: "/novels/trending/trending_6.png",
  },
];

export default function TrendingSection() {
  return (
    <section className="w-full py-12 transition-colors duration-500">
      <div className="max-w-8xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-primary dark:text-primary/90 mb-8">
          Trending This Week
        </h2>

        {/* Cards Row */}
        <div className="flex gap-6 scrollbar-hide pb-2">
          {trendingNovels.map((novel, index) => (
            <div
              key={index}
              className="w-[180px] md:w-[200px] transition-transform hover:scale-[1.02]"
            >
              <div className="w-full h-[260px] relative rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
                <Image
                  src={"/novels/hero-section/novel_2.png"}
                  alt={novel.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="200px"
                  priority
                />
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                  {novel.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {novel.genre}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
