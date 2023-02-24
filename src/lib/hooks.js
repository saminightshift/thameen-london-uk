import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Update state with initial match
    setMatches(mediaQuery.matches);

    // Create event listener for changes to the match
    const handleChange = () => setMatches(mediaQuery.matches);
    mediaQuery.addEventListener(handleChange);

    // Remove event listener on cleanup
    return () => mediaQuery.removeEventListener(handleChange);
  }, [query]);

  return matches;
}


export function navigationPanelEffects() {
useEffect(() => {
    const hoverDiv = document.querySelector('[data-target="flyout-panel"]');

    hoverDiv.addEventListener('mouseenter', () => {
      const targetDiv = document.getElementById('flyout-panel');
      targetDiv.style.animation = 'slide-down 2s ease-in-out';
      targetDiv.style.top = '-1rem';
      targetDiv.classList.add('duration-700');
    });

    hoverDiv.addEventListener('mouseleave', () => {
      const targetDiv = document.getElementById('flyout-panel');
      targetDiv.style.animation = 'slide-up 4s ease-in-out';
      targetDiv.style.top = '-20rem';
      targetDiv.style.animationDuration = '1s';
    });

    const megaMenu = document.querySelector('[data-target="mega-menu"]');

    megaMenu.addEventListener('mouseenter', () => {
      const targetDiv = document.getElementById('mega-menu');
      targetDiv.style.animation = 'slide-down 2s ease-in-out';
      targetDiv.style.top = '0rem';
      targetDiv.classList.add('duration-700');
    });

    megaMenu.addEventListener('mouseleave', () => {
      const targetDiv = document.getElementById('mega-menu');
      targetDiv.style.animation = 'slide-up 4s ease-in-out';
      targetDiv.style.top = '-25rem';
      targetDiv.style.animationDuration = '1s';
    });        
  }, []);
}