"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const rankings = {
  "Top Overall": [
    {
      title: "Echoes of Eternity",
      author: "Luna Virelle",
      genre: "Fantasy",
      rating: 4.9,
      image: "/novels/rankings/overall_1.png",
    },
    {
      title: "Code of Shadows",
      author: "Rei Nakamura",
      genre: "Thriller",
      rating: 4.8,
      image: "/novels/rankings/overall_2.png",
    },
    {
      title: "The Whispering Stars",
      author: "Alyssa K. Moran",
      genre: "Fantasy",
      rating: 4.8,
      image: "/novels/rankings/overall_3.png",
    },
    {
      title: "Empire of Ashes",
      author: "Darius Vale",
      genre: "Action",
      rating: 4.7,
      image: "/novels/rankings/overall_4.png",
    },
    {
      title: "The Silent Crown",
      author: "Ren Saito",
      genre: "Drama",
      rating: 4.6,
      image: "/novels/rankings/overall_5.png",
    },
  ],
  "Top Fantasy": [
    {
      title: "Garden of Forgotten Dreams",
      author: "Ren Saito",
      genre: "Fantasy",
      rating: 4.9,
      image: "/novels/rankings/fantasy_1.png",
    },
    {
      title: "Chronicles of Emberfall",
      author: "Darius Vale",
      genre: "Fantasy",
      rating: 4.8,
      image: "/novels/rankings/fantasy_2.png",
    },
    {
      title: "The Last Eclipse",
      author: "Mira Solen",
      genre: "Fantasy",
      rating: 4.8,
      image: "/novels/rankings/fantasy_3.png",
    },
    {
      title: "The Silver Sonata",
      author: "Clara Noveen",
      genre: "Fantasy",
      rating: 4.7,
      image: "/novels/rankings/fantasy_4.png",
    },
    {
      title: "The Whispering Stars",
      author: "Alyssa K. Moran",
      genre: "Fantasy",
      rating: 4.7,
      image: "/novels/rankings/fantasy_5.png",
    },
  ],
  "Top Romance": [
    {
      title: "The Blossoming Veil",
      author: "Elara Mistral",
      genre: "Romance",
      rating: 4.9,
      image: "/novels/rankings/romance_1.png",
    },
    {
      title: "Threads of Time",
      author: "Kara Ellis",
      genre: "Romance",
      rating: 4.8,
      image: "/novels/rankings/romance_2.png",
    },
    {
      title: "Moonlit Sonata",
      author: "Iris Vayne",
      genre: "Romance",
      rating: 4.8,
      image: "/novels/rankings/romance_3.png",
    },
    {
      title: "The Painter’s Heart",
      author: "Ren Saito",
      genre: "Romance",
      rating: 4.7,
      image: "/novels/rankings/romance_4.png",
    },
    {
      title: "A Song for Tomorrow",
      author: "Clara Noveen",
      genre: "Romance",
      rating: 4.6,
      image: "/novels/rankings/romance_5.png",
    },
  ],
  "Top Mystery": [
    {
      title: "The Clockmaker’s Secret",
      author: "Irene Weller",
      genre: "Mystery",
      rating: 4.9,
      image: "/novels/rankings/mystery_1.png",
    },
    {
      title: "Whispers in the Fog",
      author: "Dante Rowen",
      genre: "Mystery",
      rating: 4.8,
      image: "/novels/rankings/mystery_2.png",
    },
    {
      title: "Letters from the Abyss",
      author: "Celine Korr",
      genre: "Mystery",
      rating: 4.8,
      image: "/novels/rankings/mystery_3.png",
    },
    {
      title: "Shadows of Hollow Street",
      author: "Mira Solen",
      genre: "Mystery",
      rating: 4.7,
      image: "/novels/rankings/mystery_4.png",
    },
    {
      title: "The Mirror That Lied",
      author: "Lukas Thorne",
      genre: "Mystery",
      rating: 4.6,
      image: "/novels/rankings/mystery_5.png",
    },
  ],
};

export default function RankingSection() {
  return (
    <section className="w-full py-16 transition-colors duration-500">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary dark:text-primary/90 mb-8">
          Ranking
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {Object.entries(rankings).map(([category, novels]) => (
            <div
              key={category}
              className="bg-white/50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/30 backdrop-blur-sm shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-5 text-gray-900 dark:text-gray-100">
                {category}
              </h3>

              <div className="space-y-5">
                {novels.map((novel, index) => {
                  const rankStyles =
                    index === 0
                      ? "text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-amber-600 text-2xl drop-shadow-sm"
                      : index === 1
                        ? "text-transparent bg-clip-text bg-gradient-to-b from-gray-300 to-gray-500 text-xl"
                        : index === 2
                          ? "text-transparent bg-clip-text bg-gradient-to-b from-amber-700 to-orange-400 text-lg"
                          : "text-gray-500 dark:text-zinc-400 text-base";

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 hover:bg-primary/5 dark:hover:bg-primary/10 p-2 rounded-lg transition-all"
                    >
                      <span
                        className={`font-bold w-6 text-center ${rankStyles}`}
                      >
                        {index + 1}
                      </span>

                      <div className="relative w-12 h-16 rounded-md overflow-hidden">
                        <Image
                          src={"/novels/hero-section/novel_3.png"}
                          alt={novel.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-col overflow-hidden">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {novel.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {novel.author}
                        </p>
                        <p className="text-xs text-primary/80 dark:text-primary/70">
                          {novel.genre}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-yellow-500 text-xs ml-auto">
                        <Star className="w-4 h-4 fill-yellow-500" />
                        <span className="font-medium">{novel.rating}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
