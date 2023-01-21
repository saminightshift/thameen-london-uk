import React, {useState, useRef} from 'react';
import {Image} from '@shopify/hydrogen';
import Slider from 'react-slick';

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

const AutoPlayHero = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="relative h-64">
      <div className="absolute inset-0"></div>
      <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
        {slides.map((slide) => (
          <div key={slide.title}>
            <Image
              className="w-full h-full object-cover object-center"
              src={slide.url}
              alt={slide.title}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AutoPlayHero;
