"use client";
import LibraryGrid from "./LibraryGrid";
import { Novel } from "@/types/novel_type";

interface LibraryClientProps {
  novels: Novel[];
}

export default function LibraryClient({ novels }: LibraryClientProps) {
  return (
    <div>
      {/* Novels Grid */}
      <LibraryGrid novels={novels} />
    </div>
  );
}
