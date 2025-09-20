import React from 'react';
import { RiComputerLine } from "react-icons/ri";
import { FaTabletAlt } from "react-icons/fa";
import { ImMobile2 } from "react-icons/im";
import { IoMdClose } from "react-icons/io";

const PreviewModal = ({ isOpen, onClose, code }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[hsla(240,6%,5%,0.7)] flex items-center justify-center z-50 overflow-y-auto">
      <div className="w-[95%] md:w-[90%] max-w-[1200px] h-[80%] md:h-[90%] bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="w-full px-[50px] h-[70px] flex items-center justify-between bg-gray-100 border-b border-gray-300">
          <h3 className='font-bold text-black'>Preview</h3>

          <div className="flex items-center gap-2.5">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 border border-gray-300 hover:bg-gray-100 hover:scale-110">
              <RiComputerLine />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 border border-gray-300 hover:bg-gray-100 hover:scale-110">
              <FaTabletAlt />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 border border-gray-300 hover:bg-gray-100 hover:scale-110">
              <ImMobile2 />
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 border border-gray-300 hover:bg-gray-100 hover:scale-110"
          >
            <IoMdClose />
          </button>
        </div>
        <iframe srcDoc={code} className='w-full h-full border-none bg-white'></iframe>
      </div>
    </div>
  );
};

export default PreviewModal;