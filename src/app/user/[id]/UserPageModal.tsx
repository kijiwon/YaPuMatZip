"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserPageModal() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 1500);
  }, [router]);

  return <div>접근 권한이 없습니다</div>;
}
