"use client";

import Image from "next/image";
import { Novel } from "@/types/novel_type";


export default function CompletedSection(completedNovels: Novel[]) {
  return (
    <section className="w-full py-12 transition-colors duration-500">
      <div className="max-w-8xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-primary dark:text-primary/90 mb-8">
          Completed Novels
        </h2>

        {/* Cards Row */}
        <div className="flex gap-6 scrollbar-hide pb-2">
          {completedNovels.map((novel, index) => (
            <div
              key={index}
              className="w-[180px] md:w-[200px] transition-transform hover:scale-[1.02]"
            >
              <div className="w-full h-[260px] relative rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
                <Image
                  src={"/novels/hero-section/novel_5.png"}
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
