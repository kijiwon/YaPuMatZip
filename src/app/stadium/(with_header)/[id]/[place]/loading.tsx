export default function Loading() {
  return (
    <ul className="w-[100%] flex flex-col justify-center items-center mt-[50px] animate-pulse">
      <li className="lg:w-[70%] w-[90%] h-[36px] bg-gray-200 lg:mb-[30px] mb-[10px] rounded-xl" />
      <li className="w-[100%] lg:h-[70px] h-[40px] bg-gray-200 mb-[20px] rounded-xl" />
      <li className="lg:w-[80%] w-[90%] lg:h-[320px] h-[200px] ml-auto mr-auto bg-gray-300 rounded-md" />
      <hr className="w-[100%] border-b-1 border-dashed border-gray-400 mt-[20px] mb-[30px]" />
      <li className="lg:w-[70%] w-[90%] h-[36px] bg-gray-200 lg:mb-[30px] mb-[10px] rounded-xl" />
      <li className="lg:w-[80%] w-[90%] lg:h-[320px] h-[200px] ml-auto mr-auto bg-gray-300 rounded-md" />
    </ul>
  );
}
