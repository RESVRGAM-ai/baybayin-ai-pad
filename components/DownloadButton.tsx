import React from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface DownloadButtonProps {
  outputText: string;
  currentFont: string;
  fontSize: number;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ outputText, currentFont, fontSize }) => {
  const handleDownload = async () => {
    if (!outputText) return;

    // A4 dimensions in pixels at 72 DPI
    const A4_WIDTH = 595;
    const A4_HEIGHT = 842;
    
    // Create main container with A4 proportions
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = `${A4_WIDTH}px`;
    tempDiv.style.minHeight = `${A4_HEIGHT}px`;
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.display = 'flex';
    tempDiv.style.flexDirection = 'column';
    tempDiv.style.justifyContent = 'space-between';
    
    // Content wrapper with balanced padding
    const contentWrapper = document.createElement('div');
    contentWrapper.style.padding = '60px 80px'; // Increased, balanced padding
    contentWrapper.style.width = '100%';
    contentWrapper.style.boxSizing = 'border-box';
    contentWrapper.style.flexGrow = '1';
    contentWrapper.style.display = 'flex';
    contentWrapper.style.flexDirection = 'column';
    
    // Content container
    const contentDiv = document.createElement('div');
    contentDiv.style.width = '100%';
    contentDiv.style.fontFamily = currentFont;
    contentDiv.style.fontSize = `${fontSize * 1.2}px`; // Slightly larger for better proportion
    contentDiv.style.lineHeight = '1.8'; // Increased line height
    contentDiv.style.letterSpacing = '0.05em'; // Slightly increased spacing
    contentDiv.style.whiteSpace = 'pre-wrap';
    contentDiv.style.wordBreak = 'break-word';
    contentDiv.textContent = outputText;
    
    contentWrapper.appendChild(contentDiv);
    
    // Footer wrapper for positioning
    const footerWrapper = document.createElement('div');
    footerWrapper.style.width = '100%';
    footerWrapper.style.marginTop = 'auto'; // Push to bottom
    
    // Footer image container
    const footerImg = document.createElement('img');
    footerImg.src = '/img/download-footer.png';
    footerImg.style.width = '100%';
    footerImg.style.height = 'auto';
    footerImg.style.display = 'block';
    footerImg.style.marginBottom = '-1px'; // Prevent any gap at bottom
    
    footerWrapper.appendChild(footerImg);
    tempDiv.appendChild(contentWrapper);
    tempDiv.appendChild(footerWrapper);
    document.body.appendChild(tempDiv);

    try {
      // Wait for footer image to load
      await new Promise((resolve) => {
        if (footerImg.complete) resolve(true);
        else footerImg.onload = () => resolve(true);
      });

      // Calculate dimensions with footer
      const contentHeight = contentWrapper.offsetHeight;
      const footerHeight = footerImg.offsetHeight;
      const minSpacing = 60; // Minimum space between content and footer
      
      // Calculate total height including footer
      const totalHeight = contentHeight + minSpacing + footerHeight;
      tempDiv.style.height = `${Math.max(A4_HEIGHT, totalHeight)}px`;

      const canvas = await html2canvas(tempDiv, {
        scale: 2, // Higher resolution
        backgroundColor: 'white',
        useCORS: true,
        logging: false,
        allowTaint: true,
        imageTimeout: 0,
        width: A4_WIDTH,
        height: Math.max(A4_HEIGHT, tempDiv.offsetHeight),
        windowWidth: A4_WIDTH,
        windowHeight: Math.max(A4_HEIGHT, tempDiv.offsetHeight)
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Create PDF with proper dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('baybayin-text.pdf');
    } finally {
      document.body.removeChild(tempDiv);
    }
  };

  return (
    <button 
      onClick={handleDownload}
      className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-100 rounded-md transition-colors duration-200"
      aria-label="Download as PDF"
    >
      <Download size={18} />
    </button>
  );
};

export default DownloadButton;