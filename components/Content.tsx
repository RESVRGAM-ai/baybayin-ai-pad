import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { FontLoader, GradientAnimationBar, DownloadButton } from '@/components';
import { convertToBaybayin } from '@/src/utils/baybayinConverter';

interface BaybayinConverterProps {
  // Add any props if needed
}

const BaybayinConverter: React.FC<BaybayinConverterProps> = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [currentFont, setCurrentFont] = useState<string>('BaybayinSimple');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(36);
  const [placeholderWidth, setPlaceholderWidth] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (placeholderRef.current) {
      setPlaceholderWidth(placeholderRef.current.offsetWidth);
    }
  }, [currentFont]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const input = e.target.value;
    setInputText(input);
    setOutputText(convertToBaybayin(input));
  };

  const handleFontChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const newFont = e.target.value;
    setIsTransitioning(true);
    
    if (newFont === 'DoctrinaChristiana') {
      document.fonts.ready.then(() => {
        setCurrentFont(newFont);
        setIsTransitioning(false);
      }).catch(err => {
        console.error('Font loading error:', err);
        setIsTransitioning(false);
      });
    } else {
      setTimeout(() => {
        setCurrentFont(newFont);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleFontSizeChange = (increment: boolean): void => {
    setFontSize(prevSize => {
      const newSize = increment ? prevSize + 2 : prevSize - 2;
      return Math.min(Math.max(newSize, 24), 48);
    });
  };

  const getFontSize = (): string => {
    if (outputText) return `${fontSize}px`;
    return isMobile ? '2.5rem' : '3.75rem';
  };

  const handleFontLoaded = (loaded: boolean) => {
    if (!loaded) {
      console.warn('Some fonts failed to load');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative isolate">
      <FontLoader onFontLoad={handleFontLoaded} />
      <GradientAnimationBar />
      <div className="w-full max-w-3xl mx-auto px-4 flex flex-col" style={{ marginTop: '-1px' }}>
        <div className="text-right pt-6 mb-8">
          <h1 className="text-4xl font-bold mb-2">Pagsasalin sa Baybayin</h1>
          <div className="flex items-center justify-end gap-2">
            <h2 className="text-xl">Baybayin AI Writing Pad</h2>
            <span className="bg-black text-white text-xs px-2 py-1 rounded transition-colors duration-300 hover:bg-gray-800">BETA</span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center mb-8">
          <div className="w-full relative">
            <div className="relative w-full flex flex-col items-center">
              <div ref={placeholderRef} className="invisible absolute">ᜊᜌ᜔ᜊᜌᜒᜈ᜔ ᜊᜓᜑᜌᜒᜈ᜔</div>
              <textarea
                className="w-full h-[45vh] bg-transparent resize-none focus:outline-none font-baybayin mb-4 text-black placeholder-gray-400 transition-opacity duration-300 ease-in-out"
                readOnly
                value={outputText}
                placeholder="ᜊᜌ᜔ᜊᜌᜒᜈ᜔ ᜊᜓᜑᜌᜒᜈ᜔"
                style={{ 
                  fontFamily: currentFont,
                  letterSpacing: '0.02em',
                  lineHeight: '1.5',
                  opacity: isTransitioning ? 0 : (outputText ? 1 : 0.7),
                  transform: outputText ? 'translateY(0)' : 'translateY(10px)',
                  textAlign: outputText ? 'left' : 'center',
                  paddingTop: outputText ? '0' : 'calc(22.5vh - 44px)',
                  paddingLeft: outputText ? '20px' : '0',
                  paddingRight: outputText ? '20px' : '0',
                  fontSize: getFontSize(),
                  fontWeight: outputText ? '400' : '500',
                }}
              />
              {!outputText && (
                <div 
                  className="absolute bottom-20 md:bottom-20 text-gray-400 pointer-events-none opacity-70 px-4 md:px-0 max-w-[90%] md:max-w-none"
                  style={{ 
                    width: 'fit-content',
                    left: 'auto',
                    right: isMobile ? '4' : `calc(50% - ${placeholderWidth/2}px)`,
                    textAlign: 'left',
                    transform: 'none'
                  }}
                >
                  <div className="space-y-1">
                    <p className="text-xs md:text-sm">Ang Baybayin ay panulat silabaryo at hindi alpabeto.</p>
                    <p className="text-xs md:text-sm">Ang bawat titik ay Pantig &#34;Ba&#34; at hindi isa-sang letra &#34;B&#34;.</p>
                    <p className="text-xs md:text-sm">Ginagamit ito sa pagsulat ng mga wikang Filipino.</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end items-center gap-2">
              {outputText && (
                <div className="flex items-center">
                  <button 
                    onClick={() => handleFontSizeChange(false)}
                    className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-100 rounded-md transition-colors duration-200"
                    aria-label="Decrease font size"
                  >
                    <span className="text-lg">−</span>
                  </button>
                  <button 
                    onClick={() => handleFontSizeChange(true)}
                    className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-100 rounded-md transition-colors duration-200"
                    aria-label="Increase font size"
                  >
                    <span className="text-lg">+</span>
                  </button>
                  <DownloadButton 
                    outputText={outputText}
                    currentFont={currentFont}
                    fontSize={fontSize}
                  />
                </div>
              )}

              <div className="relative inline-block">
                <select 
                  className="appearance-none bg-white border border-gray-200 text-black rounded-md pl-4 pr-10 py-2 focus:outline-none focus:border-black hover:border-gray-400 transition-all duration-200 text-sm cursor-pointer transform hover:scale-[1.02]"
                  onChange={handleFontChange}
                  value={currentFont}
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                >
                  <option value="BaybayinSimple">Baybayin SIMPLE 2018</option>
                  <option value="DoctrinaChristiana">Doctrina Christiana 1593</option>
                  <option value="TAWBIDPinta">TAWBID Pinta 2020</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-600 transition-transform duration-200">
                  ▼
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mb-8">
          <div className="w-full md:w-[70%]">
            <div 
              className={`bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out ${
                isInputFocused ? 'shadow-2xl translate-y-[-2px]' : 'hover:translate-y-[-1px] hover:shadow-xl'
              }`}
            >
              <div className="h-8 bg-[#1E1E1E] flex items-center px-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 transition-opacity duration-200 hover:opacity-80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 transition-opacity duration-200 hover:opacity-80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 transition-opacity duration-200 hover:opacity-80"></div>
                </div>
              </div>
              
              <div className="p-4">
                <textarea
                  className="w-full h-32 bg-transparent text-gray-400 resize-none focus:outline-none font-mono transition-colors duration-300"
                  placeholder="Ako ay isang 'AI agent' na likha ni G. Leyson.

Ano ang gusto mong isalin sa Baybayin?"
                  value={inputText}
                  onChange={handleInputChange}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  style={{ 
                    caretColor: '#fff',
                    paddingLeft: '14px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="border-t border-black mx-[18px] pt-4 pb-8">
          <div className="flex justify-end text-sm">
            <p className="text-gray-400">
              Powered by AI. Built by{' '}
              <span className="text-black font-bold">RESVRGAM.ai</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaybayinConverter;