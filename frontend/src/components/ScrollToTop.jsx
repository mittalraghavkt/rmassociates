import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 400px
      const currentScroll = window.scrollY;
      setVisible(currentScroll > 400);

      // Calculate total scrollable height and current progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (currentScroll / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG Circle Parameters for a clean, uniform outline
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  // Calculate the dash offset matching current progress
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`scroll-to-top ${visible ? 'visible' : ''}`}
      aria-label="Scroll to top"
      data-testid="scroll-to-top-btn"
      style={{
        position: 'fixed',
        right: '1.5rem',
        bottom: '1.5rem',
        width: '56px',
        height: '56px',
        borderRadius: '9999px',
        display: 'flex',
        align-items: 'center',
        justifyContent: 'center',
        zIndex: 100,
        cursor: 'pointer',
        backgroundColor: '#1e3a8a', // Dark Navy Core
        color: '#ffffff',
        border: 'none',
        outline: 'none',
        padding: 0,
        boxShadow: '0 10px 25px -8px rgba(30, 58, 138, 0.45)'
      }}
    >
      {/* Dynamic SVG Progress Ring */}
      <svg 
        className="absolute inset-0 w-full h-full -rotate-90"
        style={{ width: '56px', height: '56px', position: 'absolute' }}
      >
        {/* Background track circle */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="3"
        />
        {/* Dynamic active progress indicator */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill={scrollProgress >= 99 ? '#15803d' : 'transparent'} // Completely green fill on completion
          stroke="#16a34a" // Smooth theme green border
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s ease, fill 0.3s ease' }}
        />
      </svg>

      {/* Centered Arrow Icon */}
      <ArrowUp className="w-5 h-5 relative z-10 pointer-events-none" />
    </button>
  );
};

export default ScrollToTop;
