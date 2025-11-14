"use client";

import { useState, useMemo } from "react";
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
  const [selectedGenre, setSelectedGenre] =
    useState<NovelGenre | "All">("All");
  const [selectedStatus, setSelectedStatus] =
    useState<NovelStatus | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"rating" | "views" | "chapters" | "name">(
    "rating",
  );

  // Toggle Like (simple, clean)
  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Reset filters
  const clearFilters = () => {
    setSelectedGenre("All");
    setSelectedStatus("All");
    setSearchQuery("");
  };

  // 🔥 Optimized filtering + sorting
  const filteredNovels = useMemo(() => {
    const s = searchQuery.toLowerCase();

    const filtered = novels.filter((n) => {
      const matchGenre = selectedGenre === "All" || n.genre === selectedGenre;
      const matchStatus = selectedStatus === "All" || n.status === selectedStatus;
      const matchSearch =
        n.title.toLowerCase().includes(s) ||
        n.author.toLowerCase().includes(s);

      return matchGenre && matchStatus && matchSearch;
    });

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

    return filtered;
  }, [novels, selectedGenre, selectedStatus, searchQuery, sortBy]);

  const showClear =
    selectedGenre !== "All" ||
    selectedStatus !== "All" ||
    searchQuery.length > 0;

  return (
    <div>
      <BrowseHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5">
        <BrowseFilters
          genres={genres}
          statuses={statuses}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onClear={clearFilters}
          showClear={showClear}
        />

        <BrowseResults
          novels={filteredNovels}
          liked={liked}
          toggleLike={toggleLike}
          onClear={clearFilters}
        />
      </div>
    </div>
  );
}
