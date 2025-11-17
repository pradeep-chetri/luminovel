"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { Novel } from "@/types/novel_type";

interface RankCardProps {
  novel: Novel;
  index: number;
}

export default function RankCard({ novel, index }: RankCardProps) {
  return (
    <Link href={`/novel/${novel.id}`}>
      <Card className="p-4 hover:shadow-lg transition hover:border-primary overflow-hidden cursor-pointer">
        <div className="flex gap-4">
          {/* Rank Number */}
          <span className="text-2xl font-bold w-8 text-primary ">
            {index + 1}
          </span>

          {/* Image */}
          <div className="relative w-20 h-24  rounded-md overflow-hidden">
            <Image
              src={"/novels/hero-section/novel_5.png"}
              alt={novel.title}
              fill
              className="object-cover hover:scale-105 transition"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1 truncate hover:text-primary transition">
              {novel.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{novel.author}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              <span className="text-xs px-2 py-0.5 bg-secondary/60 rounded-full">
                {novel.genre}
              </span>
              {novel.tags?.slice(0, 2).map((tag, i) => (
                <span
                  key={`${tag}-${i}`}
                  className="text-xs px-2 py-0.5 bg-secondary/40 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-yellow-500 mb-2">
              <Star className="w-4 h-4 fill-yellow-500" />
              <span className="text-sm font-medium">{novel.rating}</span>
            </div>
            <div className="text-xs text-muted-foreground mb-1">
              {novel.views}k views
            </div>
            <div className="text-xs text-muted-foreground">
              {novel.chapters} chapters
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
