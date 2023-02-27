import React, {useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {A11y, Navigation} from 'swiper';

export default function HomepageProductsSwiper({props, children}) {
  const productSwiperRef = useRef(null);

  const swiperParameters = {
    modules: [A11y, Navigation],
    slidesPerView: 2,
    spaceBetween: 12,
    rewind: true,
    navigation: {
      enabled: true,
      prevEl: '.product-swiper-prev',
      nextEl: '.product-swiper-next',
    },
    lazy: {enabled: true},
    breakpoints: {
      280: {
        grid: {rows: 1},
        slidesPerView: 1,
        margin: 0,
        initialSlide: 0,
        spaceBetween: 0,
      },
      768: {
        grid: {rows: 1},
        slidesPerView: 2,
      },
      1024: {
        grid: {rows: 1},
        slidesPerView: 3,
        slidesPerGroup: 1,
        initialSlide: 0,
        speed: 300,
        navigation: {
          prevEl: '.product-swiper-prev',
          nextEl: '.product-swiper-next',
          hideOnClick: false,
        },
      },
      1280: {
        observer: true,
        observeParents: true,
        slidesPerView: 4,
      },
      1920: {
        grid: {rows: 1},
        slidesPerView: 5,
        slidesPerGroup: 1,
        initialSlide: 0,
        speed: 300,
        navigation: {
          prevEl: '.product-swiper-prev',
          nextEl: '.product-swiper-next',
          hideOnClick: false,
        },
      },
    },
  };

  return (
    <div className="swiper-container page-container">
      <Swiper
        {...swiperParameters}
        onBeforeInit={(swiper) => {
          productSwiperRef.current = swiper;
        }}
        className="product-swiper"
      >
        {children.map((child, index) => (
          <SwiperSlide key={index} className="product-swiper__slide mx-0">
            <div className="product-swiper__slide-content">{child}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="navigation-wrapper -mx-0">
        <button
          className="product-button-prev"
          onClick={() => productSwiperRef.current?.slidePrev()}
        >
          <LeftCaret />
        </button>
        <button
          className="product-button-next"
          onClick={() => productSwiperRef.current?.slideNext()}
        >
          <RightCaret />
        </button>
      </div>
    </div>
  );
}

export function LeftCaret() {
  return (
    <svg
      width="30"
      height="30"
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
      width="30"
      height="30"
      viewBox="0 0 7 13"
      fill="evenodd"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 6.5L0 0.5V12.5L7 6.5Z" fill="black" />
    </svg>
  );
}
