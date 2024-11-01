import React, { useState, useEffect } from 'react';

interface FontLoaderProps {
  onFontLoad?: (status: boolean) => void;
}

const FontLoader: React.FC<FontLoaderProps> = ({ onFontLoad }) => {
  const [fontStatus, setFontStatus] = useState<{[key: string]: boolean}>({});

  // Font loading utility
  const checkFontLoading = async (fontFamily: string): Promise<boolean> => {
    try {
      await document.fonts.load(`1em "${fontFamily}"`);
      return true;
    } catch (error) {
      console.error(`Font loading error for ${fontFamily}:`, error);
      return false;
    }
  };

  useEffect(() => {
    const loadFonts = async () => {
      const fonts = ['BaybayinSimple', 'DoctrinaChristiana', 'TAWBIDPinta'];
      const statuses: {[key: string]: boolean} = {};

      for (const font of fonts) {
        statuses[font] = await checkFontLoading(font);
      }

      setFontStatus(statuses);
      onFontLoad?.(Object.values(statuses).every(status => status));
    };

    loadFonts();
  }, [onFontLoad]);

  // This component doesn't render anything visible
  return null;
};

export default FontLoader;