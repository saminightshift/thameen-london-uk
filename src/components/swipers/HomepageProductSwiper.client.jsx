import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {A11y, Navigation} from 'swiper';

export default function HomepageProductsSwiper({props, children}) {
  const swiperParameters = {
    modules: [A11y, Navigation],
    slidesPerView: 2,
    spaceBetween: 45,
    navigation: {
      enabled: true,
      prevEl: '.product-swiper-prev',
      nextEl: '.product-swiper-next',
    },
    lazy: {enabled: true},
    breakpoints: {
      768: {spaceBetween: 16},
      1024: {
        direction: 'horizontal',
        grid: {rows: 1},
        slidesPerView: 3,
        slidesPerGroup: 1,
        centeredSlides: false,
        spaceBetween: 32,
        initialSlide: 0,
        rewind: false,
        speed: 300,
        navigation: {
          prevEl: '.product-swiper-prev',
          nextEl: '.product-swiper-next',
          hideOnClick: false,
        },
        zoom: {minRatio: 1, maxRatio: 3},
        simulateTouch: true,
        allowSlidePrev: true,
        allowSlideNext: true,
        allowTouchMove: true,
        followFinger: true,
        longSwipes: true,
        shortSwipes: true,
        resistance: true,
        resistanceRatio: 0.85,
        threshold: 0,
        touchRatio: 1,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 48,
      },
      1920: {
        direction: 'horizontal',
        grid: {rows: 1},
        slidesPerView: 5,
        slidesPerGroup: 1,
        centeredSlides: false,
        spaceBetween: 64,
        initialSlide: 0,
        rewind: false,
        speed: 300,
        navigation: {
          prevEl: '.product-swiper-prev',
          nextEl: '.product-swiper-next',
          hideOnClick: false,
        },
        zoom: {minRatio: 1, maxRatio: 3},
        simulateTouch: true,
        allowSlidePrev: true,
        allowSlideNext: true,
        allowTouchMove: true,
        followFinger: true,
        longSwipes: true,
        shortSwipes: true,
        resistance: true,
        resistanceRatio: 0.85,
        threshold: 0,
        touchRatio: 1,
      },
    },
  };

  return (
    <>
      <Swiper
        {...swiperParameters}
        className="product-carousel_home page-container"
      >
        {children.map((child, index) => (
          <SwiperSlide key={index} className="product-carousel_home-slide">
            <div className=".product-carousel_home-slide-content">{child}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="navigation-wrapper sm:px-0 sm:left-0 sm:right-0">
        <div className="product-swiper-prev swiper-button-prev">
          <LeftCaret />
        </div>
        <div className="product-swiper-next swiper-button-next">
          <RightCaret />
        </div>
      </div>
    </>
  );
}

export function LeftCaret() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 7 13"
      fill="evenodd"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 6.5L7 0.5V12.5L0 6.5Z" fill="black" />
    </svg>
  );
}

export function RightCaret() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 7 13"
      fill="evenodd"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 6.5L0 0.5V12.5L7 6.5Z" fill="black" />
    </svg>
  );
}
