import { ItemSkeleton } from "@/components/ItemSkeleton";

export default function Loading() {
  return (
    <div className="mt-[20px] lg:w-[70%] w-[90%] flex flex-col lg:items-center animate-pulse">
      <p className="w-[70%] lg:h-[80px] h-[60px] mb-[30px] bg-gray-200 rounded-xl"></p>
      <ul className="flex flex-col lg:items-center">
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
