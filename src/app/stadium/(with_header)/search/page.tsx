import "../../../globals.css";
import { Suspense } from "react";
import Search from "./SearchContainer";
import Loading from "./loading";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { Metadata } from "next";

type PageParams = Promise<{ q: string }>;

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: PageParams;
}): Promise<Metadata> => {
  const { q } = await searchParams;
  const query = q || "검색어 없음";

  return {
    title: `야푸 맛집 : ${query} 검색 결과`,
    description: `${query} 검색 결과입니다`,
    openGraph: {
      title: `야푸 맛집 : ${query} 검색 결과`,
      description: `${query} 검색 결과입니다`,
      images: ["/logo.png"],
    },
  };
};

export default async function Page({
  searchParams,
}: {
  searchParams: PageParams;
}) {
  const { q } = await searchParams;

  return (
    <div className="mt-[20px] lg:w-[80%] w-[90%] flex flex-col lg:items-center">
      <p className="w-full lg:w-[80%] flex flex-row  items-center  border-b-[1px] border-dashed  mb-[20px] pb-[10px] font-paper_logy lg:text-[20px] text-[18px]">
        <BsFillSearchHeartFill className="lg:text-[22px] text-[18px]" />
        <span className="tracking-wider ml-[5px]">
          &ldquo;{q}&rdquo;에 대한 검색 결과
        </span>
      </p>
      <Suspense key={q} fallback={<Loading />}>
        <Search q={q || ""} />
      </Suspense>
    </div>
  );
}
