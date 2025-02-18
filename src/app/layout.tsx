import "regenerator-runtime/runtime";

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
