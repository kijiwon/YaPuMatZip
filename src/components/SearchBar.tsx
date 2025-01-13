"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const [term, setTerms] = useState("");

  const onClickSearch = () => {
    if (term.length === 0) {
      searchRef.current?.focus();
      alert("검색어를 입력해주세요");
      return;
    }
    setTerms("");
    router.push(`/stadium/search?q=${term}`);
  };

  const submitOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  return (
    <div className="flex flex-row items-center justify-center lg:w-[50%] w-[100%] ">
      <input
        ref={searchRef}
        value={term}
        onChange={(e) => setTerms(e.target.value)}
        onKeyDown={submitOnEnter}
        className="border-y-[3px] border-l-[3px] flex-1 h-[40px] rounded-l-lg focus:outline-none pl-[6px] text-[20px] font-paper_logy tracking-widest"
      />
      <IoSearch
        onClick={onClickSearch}
        size={40}
        className=" cursor-pointer border-y-[3px] border-r-[3px] pr-[5px] rounded-r-lg"
      />
    </div>
  );
}
