import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for lazy-loading 3D content when section is in viewport
 * This prevents creating multiple WebGL contexts simultaneously
 * 
 * @param threshold - Intersection observer threshold (0-1)
 * @param rootMargin - Margin around the root element
 * @returns Object with ref to attach to section and isVisible boolean
 */
export function useLazy3D(threshold = 0.1, rootMargin = '100px') {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Once visible, keep it visible to prevent re-rendering
    if (hasBeenVisible) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, hasBeenVisible]);

  return { ref, isVisible };
}

/**
 * Hook to track if section is currently in viewport (for pausing animations)
 */
export function useInViewport(threshold = 0.5) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  return { ref, isInView };
}
