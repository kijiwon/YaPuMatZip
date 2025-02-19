import { Metadata } from "next";
import "regenerator-runtime/runtime";

export const metadata: Metadata = {
  title: "야푸 맛ZIP",
  description: "구장 별 야푸 맛집을 만나보세요!",
  icons: {
    icon: [
      {
        url: "/icon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
    ],
  },
};

export default function RootLayout({
  children,
  signup,
}: Readonly<{
  children: React.ReactNode;
  signup: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body>
        <div className=" absolute">{signup}</div>
        <div>{children}</div>
      </body>
    </html>
  );
}
