import "../styles/clone.css";

function LoadingComponents() {
  return (
    <div className="flex justify-center items-center flex-wrap gap-5">
      <div className="clone-container flex flex-col relative rounded-2xl justify-center items-center bg-[#222222] w-[200px] h-[254px]">
        <div className="bg-[#333333] w-[100px] h-[30px] absolute top-[-1%] left-0 px-2 py-1 rounded-xl ml-2 mt-3"></div>
        <div className="bg-[#333333] min-h-[100px] max-h-[100px] min-w-[100px]"></div>
        <div className="bg-[#333333] w-[100px] h-[20px] absolute left-1 bottom-10 px-2 py-1 rounded-xl ml-2 mt-3"></div>
        <div className="bg-[#333333] w-[70px] h-[20px] absolute left-1 bottom-3 px-2 py-1 rounded-xl ml-2 mt-3"></div>
        <div className="bg-[#333333] w-[70px] h-[20px] absolute left-20 bottom-3 px-2 py-1 rounded-xl ml-2 mt-3"></div>
      </div>
    </div>
  );
}

export default LoadingComponents