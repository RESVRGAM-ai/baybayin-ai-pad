import React from 'react';

const GradientAnimationBar = () => {
  return (
    <>
      <div 
        className="w-full fixed top-0 left-0 z-[9999]"
        style={{
          height: '6px', // Slightly taller to ensure coverage
          background: 'linear-gradient(90deg, #FF8C00, #FFD700, #4CAF50, #2196F3, #8B4513)',
          backgroundSize: '400% 100%',
          animation: 'gradientSlide 10s linear infinite',
          border: 'none',
          boxShadow: '0 1px 0 white', // Add white shadow to cover the line
          marginTop: '-1px', // Pull up slightly to cover any gap
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      />
      <style jsx global>{`
        @keyframes gradientSlide {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 400% 50%;
          }
        }

        /* Add these global styles */
        body {
          margin: 0;
          padding: 0;
          background: white;
          overflow-x: hidden;
        }

        #__next {
          background: white;
          min-height: 100vh;
        }
      `}</style>
    </>
  );
};

export default GradientAnimationBar;