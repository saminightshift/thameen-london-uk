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
    const journalLink = document.getElementById('journal_link');

    megaMenu.addEventListener('mouseenter', () => {
      const targetDiv = document.getElementById('mega-menu');
      targetDiv.style.animation = 'slide-down 2s ease-in-out';
      targetDiv.style.top = '0rem';
      targetDiv.classList.add('duration-700');
    });

    journalLink.addEventListener('mouseenter', () => {
      const targetDiv = document.getElementById('mega-menu');
      targetDiv.style.animation = 'slide-up 4s ease-in-out';
      targetDiv.style.top = '-25rem';
      targetDiv.style.animationDuration = '1s';
    });

    megaMenu.addEventListener('mouseleave', () => {
      const targetDiv = document.getElementById('mega-menu');
      targetDiv.style.animation = 'slide-up 4s ease-in-out';
      targetDiv.style.top = '-25rem';
      targetDiv.style.animationDuration = '1s';
    });

    const fragrances = document.querySelector('[data-target="fragrances"]');
    const collections = document.querySelector('[data-target="collections"]');
    const gifting = document.querySelector('[data-target="gifting"]');
    const fragranceList = document.getElementById('fragrances');
    const collectionList = document.getElementById('collections');
    const giftingList = document.getElementById('gifting');

    collections.addEventListener('mouseenter', () => {
      const targetDiv = document.getElementById('collections');
      targetDiv.classList.remove('hidden');
      targetDiv.classList.add('flex');
      targetDiv.style.animation = 'fade-in 2s ease-in-out';
    });

    collections.addEventListener('mouseleave', () => {
      const targetDiv = document.querySelectorAll('collection-tab');
      targetDiv.style.animation = 'fade-out 2s ease-in-out';
      targetDiv.classList.add('hidden');
    });

    collectionList.addEventListener('mouseleave', () => {
      const targetDiv = document.getElementById('collections');
      targetDiv.style.animation = 'fade-out 2s ease-in-out';
      targetDiv.classList.add('hidden');
    });

    gifting.addEventListener('mouseenter', () => {
      const targetDiv = document.getElementById('gifting');
      targetDiv.classList.remove('hidden');
      targetDiv.classList.add('flex');
      targetDiv.style.animation = 'fade-in 2s ease-in-out';
    });

    gifting.addEventListener('mouseleave', () => {
      const targetDiv = document.querySelectorAll('gifting-tab');
      targetDiv.style.animation = 'fade-out 2s ease-in-out';
      targetDiv.classList.add('hidden');
    });

    giftingList.addEventListener('mouseleave', () => {
      const targetDiv = document.getElementById('gifting');
      targetDiv.style.animation = 'fade-out 2s ease-in-out';
      targetDiv.classList.add('hidden');
    });

    fragrances.addEventListener('mouseenter', () => {
      const targetDiv = document.getElementById('fragrances');
      targetDiv.classList.remove('hidden');
      targetDiv.classList.add('flex');
      targetDiv.style.animation = 'fade-in 2s ease-in-out';
    });

    fragrances.addEventListener('mouseleave', () => {
       const targetDiv = document.getElementById('fragrances-tab');
      targetDiv.style.animation = 'fade-out 2s ease-in-out';
      targetDiv.classList.add('hidden');
    });

    fragranceList.addEventListener('mouseleave', () => {
      const targetDiv = document.getElementById('fragrances');
      targetDiv.style.animation = 'fade-out 2s ease-in-out';
      targetDiv.classList.add('hidden');
    });

    // if the mouse goes to another nav menu button then hide the list for the previous one

    const fragrancesButton = document.querySelector(
      '[data-target="fragrances"]',
    );
    const collectionsButton = document.querySelector(
      '[data-target="collections"]',
    );
      const giftingButton = document.querySelector('[data-target="gifting"]');
      
      const journalButton = document.querySelector('[data-target="journal"]');

    fragrancesButton.addEventListener('mouseenter', () => {
      const targetDiv = document.getElementById('collections');
      targetDiv.style.animation = 'fade-out 2s ease-in-out';
      targetDiv.classList.add('hidden');
    });

    fragrancesButton.addEventListener('mouseenter', () => {
      const targetDiv = document.getElementById('gifting');
      targetDiv.style.animation = 'fade-out 2s ease-in-out';
      targetDiv.classList.add('hidden');
    });

    collectionsButton.addEventListener('mouseenter', () => {
      const targetDiv = document.getElementById('fragrances');
      targetDiv.style.animation = 'fade-out 2s ease-in-out';
      targetDiv.classList.add('hidden');
    });

    collectionsButton.addEventListener('mouseenter', () => {
      const targetDiv = document.getElementById('gifting');
      targetDiv.style.animation = 'fade-out 2s ease-in-out';
      targetDiv.classList.add('hidden');
    });

    giftingButton.addEventListener('mouseenter', () => {
      const targetDiv = document.getElementById('fragrances');
      targetDiv.style.animation = 'fade-out 2s ease-in-out';
      targetDiv.classList.add('hidden');
    });

    giftingButton.addEventListener('mouseenter', () => {
      const targetDiv = document.getElementById('collections');
      targetDiv.style.animation = 'fade-out 2s ease-in-out';
      targetDiv.classList.add('hidden');
    });
      
      journalButton.addEventListener('mouseenter', () => {
        const targets = [fragranceList, collectionList, giftingList]
        targets.forEach(target => {
          target.style.animation = 'fade-out 2s ease-in-out';
          target.classList.add('hidden');
        });
      });


      journalButton.addEventListener('mouseleave', () => {
        if ([fragranceList, collectionList, giftingList])  {
          const targetDiv = document.getElementById('mega-menu');
          targetDiv.style.animation = 'slide-down 2s ease-in-out';
          targetDiv.style.top = '0rem';
          targetDiv.classList.add('duration-700');
        };
      });

      fragrancesButton.addEventListener('mouseleave', () => {
        const svg = document.querySelectorAll('[data-source="svg-img]');
        const all = [collectionList, giftingList];
        if (svg) {
          all.forEach(target => {
            target.style.animation = 'fade-out 2s ease-in-out';
          target.classList.add('hidden');
          })
        }

      });

        
  }, []);
}