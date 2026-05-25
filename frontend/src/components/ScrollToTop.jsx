import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`scroll-to-top ${visible ? 'visible' : ''}`}
      aria-label="Scroll to top"
      data-testid="scroll-to-top-btn"
    >
      <ArrowUp className="w-5 h-5 relative z-10" />
    </button>
  );
};

export default ScrollToTop;
