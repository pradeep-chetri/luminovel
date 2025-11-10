"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NovelCard } from "@/components/NovelCard";
import { Novel } from "@/types/novel_type";

interface BrowseResultsProps {
  novels: Novel[];
  liked: Set<number>;
  toggleLike: (id: number) => void;
  onClear: () => void;
}

export function BrowseResults({
  novels,
  liked,
  toggleLike,
  onClear,
}: BrowseResultsProps) {
  return (
    <div className="lg:col-span-3">
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {novels.length} novel{novels.length !== 1 && "s"}
      </div>

      {novels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-350">
          {novels.map((novel) => (
            <Link key={novel.id} href={`/novel/${novel.id}`}>
              <NovelCard
                novel={novel}
                isLiked={liked.has(novel.id)}
                onLike={() => toggleLike(novel.id)}
                showDescription={false}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">
            No novels found matching your criteria
          </p>
          <Button variant="outline" onClick={onClear}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
