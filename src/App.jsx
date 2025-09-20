import React, { useState } from 'react'
import Navbar from './components/Navbar'
import PromptInput from './components/PromptInput'
import PreviewSection from './components/PreviewSection'
import CodeEditor from './components/CodeEditor'
import LoadingSpinner from './components/LoadingSpinner'
import PreviewModal from './components/PreviewModal'
import { useAI } from './hooks/useAI'
import { downloadCode } from './utils/helpers'
import { INITIAL_CODE } from './utils/constants'

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [isShowCode, setIsShowCode] = useState(false);
  const [isInNewTab, setIsInNewTab] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [code, setCode] = useState(INITIAL_CODE);

  const { generateWebsite, loading } = useAI();

  const handleSend = async () => {
    const generatedCode = await generateWebsite(prompt);
    if (generatedCode) {
      setCode(generatedCode);
      setPrompt(""); // Clear prompt after successful generation
    }
  };

  const handleDownload = () => {
    downloadCode(code);
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden ${isDark ? 'bg-[hsl(240,6%,5%)] text-[hsl(0,0%,98%)]' : 'bg-white text-black'}`}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <div className="min-h-screen flex flex-col items-center justify-center p-[5vh] gap-8 w-full">
        <h3 className='text-3xl font-bold text-center'>
          Create beautiful websites with <span className='bg-gradient-to-br from-green-300 to-green-700 bg-clip-text text-transparent'>WebSitely</span>
        </h3>
        <p className={`mt-2 text-base text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Describe your website and ai will code for you.
        </p>

        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          onSend={handleSend}
          isDark={isDark}
        />

        <p className={`text-xl font-bold mt-[10vh] text-center ${isDark ? '' : 'text-black'}`}>
          Your AI-Generated Website will appear here.
        </p>

        <PreviewSection
          isDark={isDark}
          isShowCode={isShowCode}
          setIsShowCode={setIsShowCode}
          setIsInNewTab={setIsInNewTab}
          onDownload={handleDownload}
        >
          {isShowCode ? (
            <CodeEditor code={code} onChange={setCode} />
          ) : (
            loading ? (
              <LoadingSpinner isDark={isDark} />
            ) : (
              <iframe srcDoc={code} className='w-full h-full border-none bg-white'></iframe>
            )
          )}
        </PreviewSection>
      </div>

      <PreviewModal
        isOpen={isInNewTab}
        onClose={() => setIsInNewTab(false)}
        code={code}
      />
    </div>
  )
}

export default App