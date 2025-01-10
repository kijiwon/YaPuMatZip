import "../../../globals.css";
import { Suspense } from "react";
import Search from "./SearchContainer";
import Loading from "./loading";
import { BsFillSearchHeartFill } from "react-icons/bs";

type PageParams = Promise<{ q: string }>;

export default async function Page({
  searchParams,
}: {
  searchParams: PageParams;
}) {
  const { q } = await searchParams;

  return (
    <div className="mt-[20px] w-[80%] flex flex-col items-center">
      <p className="w-[80%] flex flex-row  items-center  border-b-[1px] border-dashed  mb-[20px] pb-[10px] font-paper_logy text-[20px]">
        <BsFillSearchHeartFill size={22} />
        <span className="tracking-wider ml-[5px]">
          &ldquo;{q}&rdquo;에 대한 검색 결과
        </span>
      </p>
      <Suspense fallback={<Loading />}>
        <Search q={q || ""} />
      </Suspense>
    </div>
  );
}
