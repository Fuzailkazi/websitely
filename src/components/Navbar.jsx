import React from 'react'
import { IoMdMoon } from "react-icons/io";
import { MdWbSunny } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const Navbar = ({ isDark, setIsDark }) => {
  return (
    <div className={`flex items-center justify-between px-4 md:px-[120px] h-[70px] border-b ${isDark ? 'border-[hsl(240,6%,20%)]' : 'border-gray-300'}`}>
      <div className="logo">
        <h3 className='text-2xl font-bold bg-gradient-to-br from-green-300 to-green-700 bg-clip-text text-transparent'>WebSitely</h3>
      </div>
      <div className="flex items-center gap-4">
        <i onClick={() => setIsDark(!isDark)} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 ${isDark ? 'border-[hsl(240,6%,20%)] hover:bg-[hsl(240,6%,15%)]' : 'border-gray-300 hover:bg-gray-200'}`}>
          {isDark ? <IoMdMoon /> : <MdWbSunny />}
        </i>
        <i className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 ${isDark ? 'border-[hsl(240,6%,20%)] hover:bg-[hsl(240,6%,15%)]' : 'border-gray-300 hover:bg-gray-200'} hover:scale-110`}><FaUser /></i>
      </div>
    </div>
  )
}

export default Navbar