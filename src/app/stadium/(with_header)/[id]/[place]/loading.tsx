export default function Loading() {
  return (
    <div className="w-[100%] flex flex-col justify-center items-center mt-[50px] animate-pulse">
      <div className="w-[70%] h-[48px] bg-gray-200 mb-[30px] rounded-xl"></div>
      <div className="w-[100%] h-[70px] bg-gray-200 mb-[20px] rounded-xl"></div>
      <div className="w-[80%] h-[320px] ml-auto mr-auto bg-gray-300 rounded-md"></div>
      <hr className="w-[100%] border-b-1 border-dashed border-gray-400 mt-[20px]" />
    </div>
  );
}
