"use client";

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Ensure window is defined (for server-side rendering)
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    
    // Use `addEventListener` and `removeEventListener` for modern browsers
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
    
  }, [matches, query]);

  return matches;
}
