export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body>
        <div className=" absolute">{auth}</div>
        <div>{children}</div>
      </body>
    </html>
  );
}
