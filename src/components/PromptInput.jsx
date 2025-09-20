import React from 'react';
import { MdOutlineArrowUpward } from "react-icons/md";

const PromptInput = ({ prompt, setPrompt, onSend, isDark }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && prompt.trim() !== "") {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className={`flex relative ${isDark ? 'bg-[hsl(240,6%,8%)] border-[hsl(240,6%,20%)]' : 'bg-gray-100 border-gray-300'} w-[90%] md:w-full max-w-[700px] rounded-lg min-h-fit`}>
      <textarea
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        value={prompt}
        placeholder='describe your website in detail. Press Enter to send, Shift+Enter for new line.'
        className={`bg-transparent flex-1 rounded-lg border-none p-4 min-h-[150px] text-base outline-none resize-vertical font-sans ${isDark ? '' : 'text-black placeholder-gray-500'}`}
      />

      {prompt !== "" && (
        <button
          onClick={onSend}
          className={`absolute bottom-2.5 right-2.5 text-xl w-8 h-8 flex items-center justify-center ${isDark ? 'bg-green-500' : 'bg-green-600'} rounded-full transition-all duration-300 hover:opacity-80 cursor-pointer`}
          aria-label="Send prompt"
        >
          <MdOutlineArrowUpward />
        </button>
      )}
    </div>
  );
};

export default PromptInput;