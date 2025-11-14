"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";

import { Novel } from "@/types/novel_type";
import { Progress } from "../ui/progress";

interface LibraryCardProps {
  novel: Novel;
}

export default function LibraryCard({ novel }: LibraryCardProps) {
  // --- Progress calculation (clean, safe, guaranteed range) ---
  const progress = (() => {
    const total = novel.chapters ?? 0;
    const read = novel.progress ?? 0;

    if (total <= 0 || read <= 0) return 0;

    const pct = Math.min(100, Math.max(0, (read / total) * 100));
    return Math.round(pct);
  })();

  // --- Safe tag slicing ---
  const tags = Array.isArray(novel.tags) ? novel.tags.slice(0, 2) : [];

  // --- Status badge color (cleaner logic) ---
  const statusClass =
    novel.status === "Ongoing"
      ? "bg-green-500/90 text-white"
      : "bg-blue-500/90 text-white";

  return (
    <Link href={`/novel/${novel.id}`}>
      <Card className="overflow-hidden hover:shadow-lg  transition-all duration-300 hover:border-primary cursor-pointer h-full">
        {/* Cover Image */}
        <div className="relative w-full aspect-3/4 overflow-hidden bg-muted">
          <Image
            src={"/novels/hero-section/novel_4.png"}
            alt={novel.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm ${statusClass}`}
            >
              {novel.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title & Author */}
          <h3 className="font-bold text-lg mb-1 truncate hover:text-primary transition">
            {novel.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{novel.author}</p>

          {/* Genre & Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full font-medium">
              {novel.genre}
            </span>

            {tags.map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="text-xs px-2 py-1 bg-secondary rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div>
            <span className="text-xs flex items-center gap-5 px-2 py-1 text-primary rounded-full font-medium">
              Progress: <Progress value={progress} /> {progress}%
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
