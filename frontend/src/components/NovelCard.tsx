"use client";

import { Card } from "@/components/ui/card";
import { Novel } from "@/types/novel_type";
import { Star, Heart } from "lucide-react";
import Image from "next/image";

interface NovelCardProps {
  novel: Novel;
  isLiked: boolean;
  onLike: () => void;
  showDescription?: boolean;
}


export function NovelCard({
  novel,
  isLiked,
  onLike,
  showDescription = true,
}: NovelCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition group cursor-default h-full flex flex-col">
      <div className="relative w-full aspect-3/4 overflow-hidden bg-muted">
        <Image
          src={"/novels/hero-section/novel_2.png"}
          alt={novel.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            onLike();
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition"
          aria-label="Add to favorites"
        >
          <Heart
            className={`w-5 h-5 ${isLiked ? "fill-accent text-accent" : "text-muted-foreground"}`}
          />
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition">
          {novel.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{novel.author}</p>

        {novel.tags && (
          <div className="flex flex-wrap gap-1 mb-3">
            {novel.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-secondary/30 text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {showDescription && novel.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {novel.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{novel.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {novel.chapters}ch
          </span>
        </div>
      </div>
    </Card>
  );
}
