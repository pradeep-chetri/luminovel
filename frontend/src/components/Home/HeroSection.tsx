"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import { Novel } from "@/types/novel_type";

const featuredNovels = [
  {
    title: "The Whispering Stars",
    author: "Alyssa K. Moran",
    summary:
      "In a tranquil kingdom where the stars are believed to be silent watchers of fate, young astronomer Elara discovers she can hear their whispers — faint voices echoing through her telescope. As she learns to interpret their celestial language, the constellations reveal ominous prophecies of a coming darkness that threatens to swallow her world. Torn between loyalty to her king and the cosmic truths written in the heavens, Elara must choose whether to warn her people or risk being branded a heretic in a realm that no longer believes in magic.",
    rating: 4.8,
    image: "/novels/hero-section/novel_1.png",
  },
  {
    title: "Chronicles of Emberfall",
    author: "Darius Vale",
    summary:
      "In the ashes of a kingdom that outlawed fire magic centuries ago, a young blacksmith’s apprentice named Kael discovers an ember burning within his soul. When his secret gift flares to life, he becomes the spark of rebellion against a regime built on fear and silence. Hunted by inquisitors and haunted by visions of a world consumed by flame, Kael must decide whether to embrace his dangerous power — or let it die before it consumes everything he loves.",
    rating: 4.6,
    image: "/novels/hero-section/novel_2.png",
  },
  {
    title: "The Silver Sonata",
    author: "Clara Noveen",
    summary:
      "In a quiet seaside town where music holds the power to shape memories, a melancholic musician named Elara discovers a haunting melody that bends the flow of time. Each time she plays it, reality shifts — lost loves return, futures unravel, and her fate rewrites itself note by note. As the song’s echoes grow stronger, Elara must uncover who composed it and why it seems to remember her better than she remembers herself — before the final refrain traps her forever within its sorrowful tune.",
    rating: 4.9,
    image: "/novels/hero-section/novel_3.png",
  },
  {
    title: "Garden of Forgotten Dreams",
    author: "Ren Saito",
    summary:
      "A young artist discovers a hidden garden where every dream forgotten by the world takes form — but each visit comes at a price.",
    rating: 4.7,
    image: "/novels/hero-section/novel_4.png",
  },
  {
    title: "The Last Eclipse",
    author: "Mira Solen",
    summary:
      "As the sun begins to die, a girl blessed by the moon must journey across shattered kingdoms to reignite the light of creation.",
    rating: 4.9,
    image: "/novels/hero-section/novel_5.png",
  },
];

export default function HeroSection(featuredNovels : Novel[]) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  return (
    <section className="w-full py-12 md:py-8 bg-background dark:bg-background transition-colors duration-500">
      <div className="max-w-8xl mx-auto">
        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden rounded-2xl">
          <div className="flex gap-6">
            {featuredNovels.map((novel, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 pb-10 gap-15">
                <Card className="border border-primary/20 dark:border-primary/30 shadow-lg bg-white dark:bg-secondary/10 backdrop-blur-sm duration-300 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow">
                  <CardContent className="flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 md:p-10 h-full">
                    {/* Image Card - Left Side */}
                    <div className="relative w-full md:w-1/2 h-80 md:h-120 rounded-2xl overflow-hidden">
                      <Image
                        src={
                          novel.cover ||
                          "/placeholder.svg?height=400&width=300&query=novel cover"
                        }
                        fill
                        alt={novel.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Description Card - Right Side */}
                    <div className="flex flex-col justify-between gap-6 md:w-1/2 text-center md:text-left">
                      <div>
                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary dark:text-primary/90 leading-tight">
                          {novel.title}
                        </h2>

                        {/* Author */}
                        <p className="text-sm md:text-base text-primary/70 dark:text-primary/70 mb-4 font-medium">
                          by {novel.author}
                        </p>

                        {/* Summary */}
                        <p className="text-muted-foreground dark:text-muted-foreground/85 text-sm md:text-base leading-relaxed mb-5">
                          {novel.description}
                        </p>

                        {/* Rating */}
                        <div className="flex justify-center md:justify-start items-center gap-2 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(novel.rating)
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm font-semibold text-primary dark:text-primary/90">
                            {novel.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                        <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-8 py-2 font-semibold transition-all shadow-md hover:shadow-lg">
                          Read Now
                        </Button>
                        <Button variant="outline" className="bg-transparent">
                          Add to Library
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 gap-3">
          {featuredNovels.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-primary dark:bg-primary/90 w-8 h-3"
                  : "bg-muted-foreground/30 dark:bg-primary/20 w-3 h-3 hover:bg-primary/50 dark:hover:bg-primary/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
