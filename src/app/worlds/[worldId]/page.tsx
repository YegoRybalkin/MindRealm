import { Suspense } from "react";
import { MemoryWorld } from "@/components/world/MemoryWorld";

export default async function WorldPage({ params }: { params: Promise<{ worldId: string }> }) {
  const { worldId } = await params;
  return (
    <Suspense fallback={<div className="h-dvh bg-[#0d0b0a]" />}>
      <MemoryWorld key={worldId} worldId={worldId} />
    </Suspense>
  );
}
