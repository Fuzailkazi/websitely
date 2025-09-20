import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { MdOutlineArrowUpward } from "react-icons/md";
import { ImNewTab } from "react-icons/im";
import { IoMdDownload } from "react-icons/io";
import { BiSolidShow } from "react-icons/bi";
import { FaEyeSlash } from "react-icons/fa";
import Editor from '@monaco-editor/react';
import { RiComputerLine } from "react-icons/ri";
import { FaTabletAlt } from "react-icons/fa";
import { ImMobile2 } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { GoogleGenAI } from "@google/genai";
import { API_KEY } from './helper';
import { toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [isShowCode, setIsShowCode] = useState(false);
  const [isInNewTab, setIsInNewTab] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [code, setCode] = useState(
    `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-[10px]">
  <h1 class="text-[30px] font-[700]">Welcome to Websitely</h1>
</body>
</html>
    `
  );

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // ✅ Extract code safely
  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  };

  const downloadCode = ()=> {
    let filename = "webSitelyCode.html";
    let blob = new Blob([code], {type: "text/plain"});
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  async function getResponse() {

    if (prompt === "") {
      toast.error("Please eneter a prompt!");
      return;
    };

    setLoading(true);
    const text_prompt = `You are an expert frontend developer and UI/UX designer. The user will provide a detailed prompt describing what kind of website they want. Based on the user’s description, generate a fully working, production-ready website as a **single HTML file**. Use only **HTML, Tailwind CSS (via CDN)**, vanilla JavaScript, and GSAP (via CDN).  

Strict output rules:
- Return the website as a single fenced Markdown code block with the language tag.  
- Do NOT include any explanations, text, or extra code blocks outside that single block. Only the HTML file content.  

Technical requirements:
1. **Stack**: HTML + Tailwind CSS (via CDN) + vanilla JavaScript + GSAP (via CDN). Everything in one file.  
2. **Responsive**: Must be fully responsive (mobile, tablet, desktop) with modern grid and flex layouts.  
3. **Theme**: Default **dark mode**, but if the website type fits better in light mode, auto-select light mode. Include a **toggle button** to switch between dark and light themes.  
4. **Animations & Interactions**:  
   - GSAP scroll-based animations (fade, slide, stagger, parallax).  
   - Smooth hover effects with scale, shadow, and gradient transitions.  
   - Sticky navbar with subtle shadow on scroll.  
   - Animated gradient backgrounds or floating decorative shapes.  
5. **Visual richness**:  
   - Use high-quality **royalty-free images** (Unsplash via direct URLs).  
   - Apply **soft shadows, glassmorphism, or neumorphism** effects where suitable.  
   - Modern cards, rounded corners, gradient buttons, hover animations.  
6. **UI Sections** (as per user request):  
   - Sticky **Navbar** with logo + links + theme toggle.  
   - **Hero section** with headline, subheadline, CTA button, and background image/gradient.  
   - **Main content**: features grid, product showcase, gallery, blog cards, or whatever fits user’s request.  
   - **Call to Action** with strong button.  
   - **Footer** with the text: "Made with WebBuilder"  
7. **Code quality**: Clean, semantic HTML5, ARIA labels for accessibility, well-indented, professional Tailwind usage.  
8. **Performance**: Optimized. No external CSS/JS frameworks beyond Tailwind + GSAP. Use responsive images, gradients, inline SVGs, or Unsplash placeholders.  

Final instruction: Output only the single fenced Markdown code block with the full HTML file content. Nothing else.  

Website prompt: ${prompt}`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: text_prompt,
    });
    setCode(extractCode(response.text));
    console.log(response.text)
    setLoading(false);
  };


  return (
    <div className={`min-h-screen font-sans overflow-x-hidden ${isDark ? 'bg-[hsl(240,6%,5%)] text-[hsl(0,0%,98%)]' : 'bg-white text-black'}`}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <div className="min-h-screen flex flex-col items-center justify-center p-[5vh] gap-8 w-full">
        <h3 className='text-3xl font-bold text-center'>Create beautiful websites with <span className='bg-gradient-to-br from-green-300 to-green-700 bg-clip-text text-transparent'>WebSitely</span></h3>
        <p className={`mt-2 text-base text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Describe your website and ai will code for you.</p>

        <div className={`flex relative ${isDark ? 'bg-[hsl(240,6%,8%)] border-[hsl(240,6%,20%)]' : 'bg-gray-100 border-gray-300'} w-[90%] md:w-full max-w-[700px] rounded-lg min-h-fit`}>
          <textarea onChange={(e) => { setPrompt(e.target.value) }} value={prompt} placeholder='describe your website in detail.' className={`bg-transparent flex-1 rounded-lg border-none p-4 min-h-[150px] text-base outline-none resize-vertical font-sans ${isDark ? '' : 'text-black placeholder-gray-500'}`}></textarea>
          {
            prompt !== "" ?
              <>
                <i onClick={getResponse} className={`absolute bottom-2.5 right-2.5 text-xl w-8 h-8 flex items-center justify-center ${isDark ? 'bg-green-500' : 'bg-green-600'} rounded-full transition-all duration-300 hover:opacity-80 cursor-pointer`}><MdOutlineArrowUpward /></i>
              </> : ""
          }
        </div>

        <p className={`text-xl font-bold mt-[10vh] text-center ${isDark ? '' : 'text-black'}`}>Your AI-Generated Website will appear here.</p>

        <div className={` ${isDark ? 'bg-[hsl(240,6%,8%)]' : 'bg-gray-100'} w-full max-w-[1200px] h-[60vh] md:h-[70vh] rounded-xl my-8 flex flex-col overflow-hidden shadow-lg`}>
          <div className={` ${isDark ? 'bg-[hsl(240,6%,12%)]' : 'bg-gray-200'} rounded-t-xl px-5 flex items-center justify-between h-[60px]`}>
            <h3 className={`font-bold text-base ${isDark ? '' : 'text-black'}`}>Live Preview</h3>

            <div className="flex items-center gap-4">
              <div onClick={() => { setIsInNewTab(true) }} className={`flex items-center gap-2.5 p-3 ${isDark ? 'border-[hsl(240,6%,20%)] hover:bg-[hsl(240,6%,15%)]' : 'border-gray-300 hover:bg-gray-300'} rounded-lg cursor-pointer transition-all duration-300 hover:scale-110`}>Open in new tab <ImNewTab /></div>
              <div onClick={downloadCode} className={`flex items-center gap-2.5 p-3 ${isDark ? 'border-[hsl(240,6%,20%)] hover:bg-[hsl(240,6%,15%)]' : 'border-gray-300 hover:bg-gray-300'} rounded-lg cursor-pointer transition-all duration-300 hover:scale-110`}>Download <IoMdDownload /></div>
              <div onClick={() => { setIsShowCode(!isShowCode) }} className={`flex items-center gap-2.5 p-3 ${isDark ? 'border-[hsl(240,6%,20%)] hover:bg-[hsl(240,6%,15%)]' : 'border-gray-300 hover:bg-gray-300'} rounded-lg cursor-pointer transition-all duration-300 hover:scale-110`}>{isShowCode ? "Hide Code" : "Show Code"} {isShowCode ? <FaEyeSlash /> : <BiSolidShow />}</div>
            </div>
          </div>

          {
            isShowCode ? <>
              <Editor onChange={(code)=>{setCode(code)}} height="100%" theme='vs-dark' defaultLanguage="html" value={code} />
            </> : <>
              {
                loading ?
                  <div className='w-full h-full flex items-center justify-center flex-col'>
                    <FadeLoader color={isDark ? '#22c55e' : '#16a34a'}/>
                    <h3 className={`text-2xl mt-4 font-semibold text-center ${isDark ? '' : 'text-black'}`}><span className='bg-gradient-to-br from-green-300 to-green-700 bg-clip-text text-transparent'>Generating</span> your website...</h3>
                  </div> :
                  <>
                    <iframe srcDoc={code} className='w-full h-full border-none bg-white'></iframe>
                  </>
              }
            </>
          }
        </div>

      </div>


      {
        isInNewTab ?
          <>
            <div className="fixed inset-0 bg-[hsla(240,6%,5%,0.7)] flex items-center justify-center z-50 overflow-y-auto">
              <div className="w-[95%] md:w-[90%] max-w-[1200px] h-[80%] md:h-[90%] bg-white rounded-xl overflow-hidden flex flex-col">
                <div className="w-full px-[50px] h-[70px] flex items-center justify-between bg-gray-100 border-b border-gray-300">
                  <h3 className='font-bold text-black'>Preview</h3>

                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 border border-gray-300 hover:bg-gray-100 hover:scale-110"><RiComputerLine /></div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 border border-gray-300 hover:bg-gray-100 hover:scale-110"><FaTabletAlt /></div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 border border-gray-300 hover:bg-gray-100 hover:scale-110"><ImMobile2 /></div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 border border-gray-300 hover:bg-gray-100 hover:scale-110" onClick={() => { setIsInNewTab(false) }}><IoMdClose /></div>
                  </div>
                </div>
                <iframe srcDoc={code} className='w-full h-full border-none bg-white'></iframe>
              </div>
            </div>
          </> : ""
      }
    </div>
  )
}

export default App