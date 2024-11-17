// import Script from "next/script";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer`}
        strategy="beforeInteractive"
      /> */}
      {children}
    </div>
  );
}
