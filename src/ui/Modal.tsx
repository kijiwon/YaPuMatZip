"use client";

import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div>
      모달
      <button onClick={() => router.back()}>뒤로가기</button>
      <div>{children}</div>
    </div>
  );
}
