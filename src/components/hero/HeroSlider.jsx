import React, {useState} from 'react';
import {Image} from '@shopify/hydrogen';

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      url: 'https://via.placeholder.com/1200x600.png?text=Slide+1',
      title: 'Slide 1',
    },
    {
      url: 'https://via.placeholder.com/1200x600.png?text=Slide+2',
      title: 'Slide 2',
    },
    {
      url: 'https://via.placeholder.com/1200x600.png?text=Slide+3',
      title: 'Slide 3',
    },
  ];

  const handlePrevClick = () => {
    if (currentSlide === 0) {
      setCurrentSlide(slides.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNextClick = () => {
    if (currentSlide === slides.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="relative h-64">
      <div className="absolute inset-0">
        <Image
          className="w-full h-full object-cover object-center"
          src={slides[currentSlide].url}
          alt={slides[currentSlide].title}
        />
      </div>
      <button
        className="absolute top-0 left-0 m-4 text-3xl text-white hover:text-gray-300"
        onClick={handlePrevClick}
      >
        &lsaquo;
      </button>
      <button
        className="absolute top-0 right-0 m-4 text-3xl text-white hover:text-gray-300"
        onClick={handleNextClick}
      >
        &rsaquo;
      </button>
    </div>
  );
}

export default HeroSlider;
