import React, { useEffect } from 'react';

const FontLoader: React.FC = () => {
  useEffect(() => {
    // Load fonts programmatically to ensure they're loaded
    const fonts = [
      {
        family: 'DoctrinaChristiana',
        url: '/fonts/DoctrinaChristianaBOLD.woff2',
        descriptors: { weight: 'bold' }
      }
    ];

    fonts.forEach(async (font) => {
      try {
        // @ts-ignore - FontFace is not in TypeScript types
        const fontFace = new FontFace(
          font.family,
          `url(${font.url}) format('woff2')`,
          font.descriptors
        );
        
        // Wait for font to load
        await fontFace.load();
        
        // Add to document fonts
        document.fonts.add(fontFace);
        
        console.log(`${font.family} loaded successfully`);
      } catch (err) {
        console.error(`Error loading ${font.family}:`, err);
      }
    });
  }, []);

  return null;
};

export default FontLoader;