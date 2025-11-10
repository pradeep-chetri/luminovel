"use client";
import LibraryCard from "./LibraryCard";
import { Novel } from "@/types/novel_type";

interface LibraryGridProps {
  novels: Novel[];
}

export default function LibraryGrid({ novels }: LibraryGridProps) {
  if (novels.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold mb-2">Your library is empty</h3>
        <p className="text-muted-foreground">
          Start reading novels to build your personal collection
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {novels.map((novel) => (
        <LibraryCard key={novel.id} novel={novel} />
      ))}
    </div>
  );
}
