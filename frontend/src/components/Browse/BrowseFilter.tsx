"use client";

import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NovelGenre, NovelStatus } from "@/types/novel_type";

interface BrowseFiltersProps {
  genres: (NovelGenre | "All")[];
  statuses: (NovelStatus | "All")[];
  selectedGenre: NovelGenre | "All";
  setSelectedGenre: (genre: NovelGenre | "All") => void;
  selectedStatus: NovelStatus | "All";
  setSelectedStatus: (status: NovelStatus | "All") => void;
  sortBy: "rating" | "views" | "chapters" | "name";
  setSortBy: (sort: "rating" | "views" | "chapters" | "name") => void;
  onClear: () => void;
  showClear: boolean;
}

export function BrowseFilters({
  genres,
  statuses,
  selectedGenre,
  setSelectedGenre,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  onClear,
  showClear,
}: BrowseFiltersProps) {
  // safe setters without spreading the union types everywhere
  const handleGenreClick = (g: NovelGenre | "All") => {
    if (g !== selectedGenre) setSelectedGenre(g);
  };

  const handleStatusClick = (s: NovelStatus | "All") => {
    if (s !== selectedStatus) setSelectedStatus(s);
  };

  const handleSortChange = (
    value: string,
  ): "rating" | "views" | "chapters" | "name" => {
    if (value === "rating" || value === "views" || value === "chapters" || value === "name") {
      return value;
    }
    return "rating"; // fallback safety
  };

  return (
    <Card className="p-6 sticky top-20 w-70 max-h-350">
      {/* ---------- UI UNTOUCHED BELOW ---------- */}

      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5" />
        <h2 className="font-bold">Filters</h2>
      </div>

      {/* Genre */}
      <div className="mb-6">
        <h3 className="font-semibold text-sm mb-3">Genre</h3>
        <div className="space-y-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                selectedGenre === genre
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mb-6">
        <h3 className="font-semibold text-sm mb-3">Status</h3>
        <div className="space-y-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusClick(status)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                selectedStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(handleSortChange(e.target.value))}
          className="w-full px-3 py-2 rounded-lg border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="rating">Highest Rated</option>
          <option value="views">Most Views</option>
          <option value="chapters">Most Chapters</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      {showClear && (
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-6 bg-transparent"
          onClick={onClear}
        >
          <X className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </Card>
  );
}
