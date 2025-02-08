"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";

const VoiceSearch = dynamic(() => import("./VoiceSearch"));

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
    <div className="flex flex-row items-center justify-center lg:w-[50%] w-[85%] border-[3px] rounded-lg py-[2px]">
      <input
        ref={searchRef}
        value={terms}
        onChange={(e) => setTerms(e.target.value)}
        onKeyDown={submitOnEnter}
        className="h-[30px] lg:h-[40px] outline-none flex-1 focus:outline-none pl-[10px] lg:text-[20px] text-[16px] font-kyobo tracking-widest"
      />
      <VoiceSearch setTerms={setTerms} />
      <IoSearch
        onClick={onClickSearch}
        className="cursor-pointer pr-[5px] lg:text-[40px] text-[28px]"
      />
    </div>
  );
}
