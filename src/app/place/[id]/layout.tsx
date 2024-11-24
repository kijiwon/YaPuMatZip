import Header from "@/app/components/Header";
import NavBar from "@/app/components/NavBar";

export default function PlaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <NavBar />
      {children}
    </div>
  );
}
