import { ItemSkeleton } from "@/components/ItemSkeleton";

export default function Loading() {
  return (
    <div className="mt-[20px] w-[70%] flex flex-col items-center">
      <p className="w-[70%] h-[80px] mb-[30px] bg-gray-200 rounded-xl"></p>
      <ul className="flex flex-col items-center">
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
      </ul>
    </div>
  );
}
