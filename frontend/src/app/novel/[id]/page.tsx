import NovelClient from "@/components/Novel/NovelClient";

export default async function NovelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ Unwrap the promise
  return <NovelClient key={id} params={{ id }} />;
}
