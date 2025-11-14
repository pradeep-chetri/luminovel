"use client";

import { useState } from "react";
import { BrowseHeader } from "./BrowseHeader";
import { BrowseFilters } from "./BrowseFilter";
import { BrowseResults } from "./BrowseResult";
import { Novel, NovelGenre, NovelStatus } from "@/types/novel_type";

interface BrowseClientProps {
  genres: (NovelGenre | "All")[];
  statuses: (NovelStatus | "All")[];
  novels: Novel[];
}

export default function BrowseClient({
  genres,
  statuses,
  novels,
}: BrowseClientProps) {
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [selectedGenre, setSelectedGenre] = useState<NovelGenre | "All">("All");
  const [selectedStatus, setSelectedStatus] = useState<NovelStatus | "All">(
    "All",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "rating" | "views" | "chapters" | "name"
  >("rating");

  // Toggle like (no-unused-expressions fix)
  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedGenre("All");
    setSelectedStatus("All");
    setSearchQuery("");
  };

  // Filter novels (prefer-const fix)
  const filtered = novels.filter((n) => {
    const matchGenre = selectedGenre === "All" || n.genre === selectedGenre;
    const matchStatus = selectedStatus === "All" || n.status === selectedStatus;
    const matchSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGenre && matchStatus && matchSearch;
  });

  // Sort novels
  filtered.sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "views":
        return b.views - a.views;
      case "chapters":
        return b.chapters - a.chapters;
      case "name":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const showClear =
    selectedGenre !== "All" ||
    selectedStatus !== "All" ||
    searchQuery.length > 0;

  return (
    <div className="">
      <BrowseHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <BrowseFilters
          genres={genres}
          statuses={statuses}
          selectedGenre={selectedGenre}
          // ✅ Fix type mismatch — convert string to correct union type
          setSelectedGenre={(genre) =>
            setSelectedGenre(genre as NovelGenre | "All")
          }
          selectedStatus={selectedStatus}
          setSelectedStatus={(status) =>
            setSelectedStatus(status as NovelStatus | "All")
          }
          sortBy={sortBy}
          setSortBy={setSortBy}
          onClear={clearFilters}
          showClear={showClear}
        />
        <BrowseResults
          novels={filtered}
          liked={liked}
          toggleLike={toggleLike}
          onClear={clearFilters}
        />
      </div>
    </div>
  );
}
