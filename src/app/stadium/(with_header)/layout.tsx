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
      <div className="w-screen h-[100vh] pt-[130px] lg:pt-0 flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
