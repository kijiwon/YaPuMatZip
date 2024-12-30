import Header from "@/components/Header";
import NavBar from "@/components/NavBar";

export default function StadiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <NavBar />
      <div className="w-full h-[100vh] flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
