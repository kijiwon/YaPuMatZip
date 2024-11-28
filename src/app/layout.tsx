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
        {auth}
        {children}
      </body>
    </html>
  );
}
