"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  Heart,
  Share2,
  MessageSquare,
  Bookmark,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { novels } from "@/lib/novels";
import type { Novel } from "@/types/novel_type";
import Image from "next/image";
import { useState } from "react";

// outside your component = pure ✅
const chapters = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: `Chapter ${i + 1}: ${
    [
      "Moonrise",
      "Awakening",
      "Discovery",
      "Revelations",
      "Trials",
      "Destiny",
      "Truth",
      "Legacy",
      "Journey",
      "Final Light",
    ][i]
  }`,
  published: new Date(Date.now() - (i + 1) * 86400000),
}));

export default function NovelClient({ params }: { params: { id: string } }) {
  const novelId = Number.parseInt(params.id);
  const novel: Novel | undefined = novels.find((n) => n.id === novelId);
  const currentNovel = novel ?? novels[0];

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "chapters" | "comments"
  >("overview");

  const relatedNovels = novels
    .filter((n) => n.id !== currentNovel.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/browse" className="hover:text-primary">
            Browse
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>{currentNovel.title}</span>
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Book Cover */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <img
                src={"/novels/hero-section/novel_3.png"}
                alt={currentNovel.title}
                className="w-full rounded-lg shadow-lg mb-4"
              />
              <div className="space-y-2 mb-4">
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  Read Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <BookmarkIcon isBookmarked={isBookmarked} />
                  {isBookmarked ? "Added to Library" : "Add to Library"}
                </Button>
              </div>
            </div>
          </div>

          {/* Novel Info */}
          <div className="md:col-span-3">
            <div className="mb-3">
              <span className="inline-block px-3 py-1 rounded-full bg-secondary/30 text-secondary-foreground text-sm font-medium mb-3">
                {currentNovel.status}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {currentNovel.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              by {currentNovel.author}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
              <div>
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(currentNovel?.rating)
                          ? "fill-accent text-accent"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium">
                  {currentNovel.rating} (
                  {currentNovel.votes?.toLocaleString() ?? "N/A"} votes)
                </p>
              </div>
              <div>
                <div className="text-lg font-bold">{currentNovel.views}M</div>
                <p className="text-sm text-muted-foreground">Views</p>
              </div>
              <div>
                <div className="text-lg font-bold">{currentNovel.chapters}</div>
                <p className="text-sm text-muted-foreground">Chapters</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <Button
                variant="ghost"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-accent" : ""}
              >
                <Heart
                  className={`w-5 h-5 mr-2 ${isLiked ? "fill-accent" : ""}`}
                />
                Like
              </Button>
              <Button variant="ghost">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
              <Button variant="ghost">
                <MessageSquare className="w-5 h-5 mr-2" />
                Comments
              </Button>
            </div>

            {/* Genre Tags */}
            <p className="text-sm text-muted-foreground">{novel?.genre}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-4 border-b border-border mb-8 overflow-x-auto">
            {["overview", "chapters", "comments"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`pb-4 px-2 font-medium text-sm capitalize border-b-2 transition ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "overview" && <OverviewTab novel={currentNovel} />}

          {activeTab === "chapters" && (
            <ChapterTab chapters={chapters} novelId={currentNovel.id} />
          )}

          {activeTab === "comments" && (
            <Card className="p-6">
              <p className="text-muted-foreground">
                Comments feature coming soon...
              </p>
            </Card>
          )}
        </div>

        {/* Related Novels */}
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNovels.map((related) => (
              <Link key={related.id} href={`/novel/${related.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition group cursor-pointer h-full">
                  <img
                    src={related.cover}
                    alt={related.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition">
                      {related.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {related.author}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-sm font-medium">
                          {related.rating}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {related.chapters}ch
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------- Sub Components ---------- */

function BookmarkIcon({ isBookmarked }: { isBookmarked: boolean }) {
  return (
    <Bookmark
      className={`w-5 h-5 mr-2 ${isBookmarked ? "fill-current" : ""}`}
    />
  );
}

function OverviewTab({ novel }: { novel: Novel }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {novel.description}
        </p>
        {novel.longDescription && (
          <p className="text-muted-foreground leading-relaxed">
            {novel.longDescription}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {novel.chapters}
          </div>
          <p className="text-sm text-muted-foreground">Total Chapters</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{novel.views}M</div>
          <p className="text-sm text-muted-foreground">Views</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-accent">{novel.rating}</div>
          <p className="text-sm text-muted-foreground">Rating</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-secondary">
            {novel.status}
          </div>
          <p className="text-sm text-muted-foreground">Status</p>
        </Card>
      </div>
    </div>
  );
}

function ChapterTab({
  chapters,
  novelId,
}: {
  chapters: { id: number; title: string; published: Date }[];
  novelId: number;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Latest Chapters</h2>
      <div className="flex flex-col gap-2">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/novel/${novelId}/chapter/${chapter.id}`}
          >
            <Card className="p-4 hover:bg-muted transition cursor-pointer group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium group-hover:text-primary transition">
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {chapter.published.toLocaleDateString()}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
