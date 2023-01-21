import React from 'react';
import {
  Pagination,
  EffectFade,
  Autoplay,
  A11y,
  Navigation,
  Keyboard,
} from '../../../node_modules/swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

export default function SwiperHero() {
  const swiperParams = {
    modules: [Pagination, EffectFade, Autoplay, A11y, Navigation, Keyboard],
    lazy: {enabled: true, loadOnTransitionStart: true},
    loopedSlides: 10,
    speed: 2000,
    watchSlidesProgress: true,
    autoplay: {enabled: true},
    threshold: 5,
    observeParents: true,
    observer: true,
    fadeEffect: {crossFade: true},
    pagination: {
      hideOnClick: false,
      type: 'fraction',
      el: '.swiper-pagination',
    },
    grabCursor: true,
    effect: 'fade',
    loop: true,
    keyboard: {enabled: true},
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
    slidesPerGroupAuto: false,
  };

  return (
    <>
      <Swiper {...swiperParams}>
        <SwiperSlide>
          <img
            className="swiper-slide-image"
            src="https://via.placeholder.com/1200x600.png?text=Slide+1"
            alt="Slide 1"
          />
          <div className="swiper-slide-content">
            <div className="swiper-slide-title">Slide 1</div>
            <div className="swiper-slide-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="swiper-slide-image"
            src="https://via.placeholder.com/1200x600.png?text=Slide+1"
            alt="Slide 1"
          />
          <div className="swiper-slide-content">
            <div className="swiper-slide-title">Slide 1</div>
            <div className="swiper-slide-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="swiper-slide-image"
            src="https://via.placeholder.com/1200x600.png?text=Slide+1"
            alt="Slide 1"
          />
          <div className="swiper-slide-content">
            <div className="swiper-slide-title">Slide 1</div>
            <div className="swiper-slide-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
