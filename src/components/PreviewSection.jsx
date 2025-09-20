import React from 'react';
import { ImNewTab } from "react-icons/im";
import { IoMdDownload } from "react-icons/io";
import { BiSolidShow } from "react-icons/bi";
import { FaEyeSlash } from "react-icons/fa";

const PreviewSection = ({
  isDark,
  isShowCode,
  setIsShowCode,
  setIsInNewTab,
  onDownload,
  children
}) => {
  return (
    <div className={` ${isDark ? 'bg-[hsl(240,6%,8%)]' : 'bg-gray-100'} w-full max-w-[1200px] h-[60vh] md:h-[70vh] rounded-xl my-8 flex flex-col overflow-hidden shadow-lg`}>
      <div className={` ${isDark ? 'bg-[hsl(240,6%,12%)]' : 'bg-gray-200'} rounded-t-xl px-5 flex items-center justify-between h-[60px]`}>
        <h3 className={`font-bold text-base ${isDark ? '' : 'text-black'}`}>Live Preview</h3>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsInNewTab(true)}
            className={`flex items-center gap-2.5 p-3 ${isDark ? 'border-[hsl(240,6%,20%)] hover:bg-[hsl(240,6%,15%)]' : 'border-gray-300 hover:bg-gray-300'} rounded-lg cursor-pointer transition-all duration-300 hover:scale-110`}
          >
            Open in new tab <ImNewTab />
          </button>
          <button
            onClick={onDownload}
            className={`flex items-center gap-2.5 p-3 ${isDark ? 'border-[hsl(240,6%,20%)] hover:bg-[hsl(240,6%,15%)]' : 'border-gray-300 hover:bg-gray-300'} rounded-lg cursor-pointer transition-all duration-300 hover:scale-110`}
          >
            Download <IoMdDownload />
          </button>
          <button
            onClick={() => setIsShowCode(!isShowCode)}
            className={`flex items-center gap-2.5 p-3 ${isDark ? 'border-[hsl(240,6%,20%)] hover:bg-[hsl(240,6%,15%)]' : 'border-gray-300 hover:bg-gray-300'} rounded-lg cursor-pointer transition-all duration-300 hover:scale-110`}
          >
            {isShowCode ? "Hide Code" : "Show Code"} {isShowCode ? <FaEyeSlash /> : <BiSolidShow />}
          </button>
        </div>
      </div>

      {children}
    </div>
  );
};

export default PreviewSection;