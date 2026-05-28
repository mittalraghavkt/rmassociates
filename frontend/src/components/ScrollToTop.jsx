import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setVisible(currentScroll > 400);

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

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  // Simple, solid conditional checker to prevent parsing bugs
  let isCompleted = false;
  if (scrollProgress >= 99) {
    isCompleted = true;
  }

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
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        cursor: 'pointer',
        backgroundColor: '#1e3a8a',
        color: '#ffffff',
        border: 'none',
        outline: 'none',
        padding: 0,
        boxShadow: '0 10px 25px -8px rgba(30, 58, 138, 0.45)'
      }}
    >
      <svg 
        className="absolute inset-0 w-full h-full -rotate-90"
        style={{ width: '56px', height: '56px', position: 'absolute' }}
      >
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="3"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill={isCompleted ? '#15803d' : 'transparent'}
          stroke="#16a34a"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s ease, fill 0.3s ease' }}
        />
      </svg>

      <ArrowUp className="w-5 h-5 relative z-10 pointer-events-none" />
    </button>
  );
};

export default ScrollToTop;
