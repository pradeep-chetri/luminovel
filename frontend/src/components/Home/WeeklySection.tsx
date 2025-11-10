"use client";

import Image from "next/image";

const weeklyFeatured = [
  {
    title: "Reincarnated As A Lion In Another World",
    genre: "Fantasy",
    image: "/novels/weekly/reincarnated_lion.jpg",
  },
  {
    title: "Forced to Be a Villain",
    genre: "Eastern",
    image: "/novels/weekly/villain.jpg",
  },
  {
    title: "Rivers of the Night",
    genre: "Eastern",
    image: "/novels/weekly/rivers_night.jpg",
  },
  {
    title: "Floating Islands: SSS",
    genre: "Fantasy",
    image: "/novels/weekly/floating_islands.jpg",
  },
  {
    title: "Strongest Necromancer System",
    genre: "Fantasy",
    image: "/novels/weekly/necromancer.jpg",
  },
  {
    title: "Werewolf Leveling in the Apocalypse",
    genre: "Fantasy",
    image: "/novels/weekly/werewolf.jpg",
  },
  {
    title: "Online Game: Low Level Hero",
    genre: "Games",
    image: "/novels/weekly/online_game.jpg",
  },
  {
    title: "Goblin Dependency",
    genre: "Fantasy",
    image: "/novels/weekly/goblin_dependency.jpg",
  },
];

export default function WeeklyFeatured() {
  return (
    <section className="w-full py-12 transition-colors duration-500">
      <div className="max-w-8xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-primary dark:text-primary/90 mb-6">
          Weekly Featured
        </h2>

        {/* Scrollable Row */}
        <div className="flex space-x-6 scrollbar-hide">
          {weeklyFeatured.map((novel, index) => (
            <div
              key={index}
              className="w-[180px] md:w-[200px] transition-transform hover:scale-[1.02]"
            >
              <div className="w-full h-[260px] relative rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
                <Image
                  src={"/novels/hero-section/novel_1.png"}
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
