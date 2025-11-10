"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const novels = [
  {
    title: "The Garden of Starlight",
    author: "Luna Virelle",
    rating: 4.5,
    genre: "Fantasy",
    image: "/novels/new/garden_of_starlight.png",
    description:
      "When stars fall like petals, a young botanist discovers a secret garden where constellations bloom — and destinies intertwine.",
  },
  {
    title: "Threads of Fate",
    author: "Ren Saito",
    genre: "Drama",
    rating: 4.5,
    image: "/novels/new/threads_of_fate.png",
    description:
      "A seamstress finds she can stitch memories into fabric, altering lives and rewriting love stories — one seam at a time.",
  },
  {
    title: "The Last Lullaby",
    author: "Clara Noveen",
    genre: "Mystery",
    rating: 4.5,
    image: "/novels/new/last_lullaby.png",
    description:
      "A musician haunted by forgotten melodies uncovers a tragic conspiracy that spans lifetimes.",
  },
  {
    title: "Moonlit Empire",
    author: "Darius Vale",
    genre: "Action",
    rating: 4.5,
    image: "/novels/new/moonlit_empire.png",
    description:
      "A warrior reborn under a cursed moon seeks vengeance in a kingdom that no longer remembers his name.",
  },
  {
    title: "Whispered Horizons",
    author: "Alyssa K. Moran",
    genre: "Fantasy",
    rating: 4.5,
    image: "/novels/new/whispered_horizons.png",
    description:
      "When the winds carry forgotten prayers, a wanderer sets out to uncover the gods who stopped listening.",
  },
  {
    title: "Eclipsed Hearts",
    author: "Mira Solen",
    genre: "Romance",
    rating: 4.5,
    image: "/novels/new/eclipsed_hearts.png",
    description:
      "Two souls tethered by time meet across eclipses, each encounter changing the course of fate itself.",
  },
  {
    title: "Shadows Between Pages",
    author: "Iris Vayne",
    genre: "Mystery",
    rating: 4.5,
    image: "/novels/new/shadows_between_pages.png",
    description:
      "A librarian unearths books that rewrite themselves at midnight — and a story that mirrors her own life.",
  },
  {
    title: "Kingdom of Glass",
    author: "Kara Ellis",
    genre: "Drama",
    rating: 4.5,
    image: "/novels/new/kingdom_of_glass.png",
    description:
      "In a city of fragile towers, a glasswright dreams of building something that will never shatter — even when love does.",
  },
];

export default function NewArrivalsSection() {
  const [selected, setSelected] = useState(novels[0]);

  return (
    <section className="w-full py-16 transition-colors duration-500">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary dark:text-primary/90 mb-8">
          New Arrivals
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Novel Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6">
            {novels.map((novel, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelected(novel)}
                className={`cursor-pointer group relative rounded-xl overflow-hidden border ${
                  selected.title === novel.title
                    ? "border-[#6C63A6] shadow-[0_0_12px_#B8A9F3]"
                    : "border-[#E6E0F5] dark:border-[#2A243D]"
                } bg-white/70 dark:bg-white/5 backdrop-blur-sm`}
              >
                <div className="relative w-full h-56 md:h-64">
                  <Image
                    src={"/novels/hero-section/novel_4.png"}
                    alt={novel.title}
                    fill
                    className="object-cover group-hover:brightness-110 transition-all"
                  />
                </div>
                <div className="p-3 text-center">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                    {novel.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                    {novel.author}
                  </p>
                  <p className="text-xs text-[#6C63A6] dark:text-[#B8A9F3] mt-1">
                    {novel.genre}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detail Panel */}
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.title}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.3 }}
                className="bg-white/70 dark:bg-white/5 border border-[#E6E0F5]/60 dark:border-[#2A243D] rounded-2xl p-6 flex flex-col shadow-sm backdrop-blur-sm"
              >
                <div className="relative w-full h-72 rounded-lg overflow-hidden mb-5">
                  <Image
                    src={"/novels/hero-section/novel_4.png"}
                    alt={selected.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {selected.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selected.author}
                </p>
                <p className="text-sm text-[#6C63A6] dark:text-[#B8A9F3] mb-3">
                  {selected.genre}
                </p>
                <div className="flex items-center gap-1 text-yellow-500 text-xs pb-4">
                  <Star className="w-4 h-4 fill-yellow-500" />
                  <span className="font-medium">{selected.rating}</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selected.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
