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

