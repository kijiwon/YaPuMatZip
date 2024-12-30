import "../../globals.css";
import Header from "@/components/Header";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="w-full h-[100vh] flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
