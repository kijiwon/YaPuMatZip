import Modal from "@/ui/modal";

export default function Page() {
  return (
    <div className="fixed inset-0 z-10 w-[100vw] h-[100vh] backdrop-blur-[2px] flex flex-col justify-center items-center">
      <Modal />
    </div>
  );
}
