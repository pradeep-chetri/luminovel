"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { rankings } from "@/lib/ranking";


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
