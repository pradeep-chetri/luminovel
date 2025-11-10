import { library_novels } from "@/lib/novels";
import LibraryClient from "@/components/Library/LibraryClient";

export default function LibraryPage() {
  return (
    <div className="container mx-auto py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Library</h1>
        <p className="text-muted-foreground">
          Track your reading progress and manage your novel collection
        </p>
      </div>

      {/* Client Component */}
      <LibraryClient novels={library_novels} />
    </div>
  );
}
