"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";

const VoiceSearch = dynamic(() => import("./VoiceSearch"), { ssr: false });

export default function SearchBar() {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const [terms, setTerms] = useState("");

  const onClickSearch = () => {
    if (terms.length === 0) {
      searchRef.current?.focus();
      alert("검색어를 입력해주세요");
      return;
    }
    setTerms("");
    router.push(`/stadium/search?q=${terms}`);
  };

  const submitOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  return (
    <div className="lg:w-[60%] w-[85%] flex flex-row items-center">
      <div className="flex flex-row items-center lg:justify-between justify-start flex-1 border-[3px] rounded-lg py-[2px]">
        <input
          ref={searchRef}
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          onKeyDown={submitOnEnter}
          className="flex-1 h-[30px] lg:h-[40px] outline-none focus:outline-none lg:pl-[10px] pl-[5px] lg:text-[20px] text-[16px] font-kyobo tracking-widest"
        />
        <IoSearch
          onClick={onClickSearch}
          className="cursor-pointer lg:text-[36px] text-[28px] lg:mx-[10px] mx-[5px]"
        />
      </div>
      <VoiceSearch setTerms={setTerms} />
    </div>
  );
}
