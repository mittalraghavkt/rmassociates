import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal – returns [ref, isVisible]
 * Attach ref to the element. isVisible becomes true once the element enters the viewport.
 */
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px', ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

/**
 * Reveal component – wraps children with fade+slide-up effect when visible
 */
export const Reveal = ({ children, delay = 0, className = '', as: Tag = 'div' }) => {
  const [ref, visible] = useScrollReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
};
