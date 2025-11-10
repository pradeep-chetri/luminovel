import BrowseClient from "@/components/Browse/BrowseClient";
import { novels, genres, statuses } from "@/lib/novels"; // adjust path if needed

export default function BrowsePage() {
  return (
    <main className="max-w-8xl mx-auto px-20 py-12">
      <BrowseClient genres={genres} statuses={statuses} novels={novels} />
    </main>
  );
}
