import { ItemSkeleton } from "@/components/ItemSkeleton";

export default function Loading() {
  return (
    <div className="animate-pulse">
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
    </div>
  );
}
