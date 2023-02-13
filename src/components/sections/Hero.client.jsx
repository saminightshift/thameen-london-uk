import React, {useRef} from 'react';
import {Image, Link, Video} from '@shopify/hydrogen';
import {
  A11y,
  Autoplay,
  EffectFade,
  Keyboard,
  Navigation,
  Pagination,
} from 'swiper';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';

export function Hero(data) {
  const slides = [
    {
      url: 'https://images.ctfassets.net/t5tvnt0pg52s/1gCoBHteh1bGXCZcLbUQMY/6a1d8081f8945f1f3ad120257a548e89/Hero-1.png',
      title: 'our latest fragrance',
      cta: 'shop insignia',
      id: 1,
      shopUrl: '/products/insignia-50ml-extrait-de-parfum',
    },
    {
      url: 'https://images.ctfassets.net/t5tvnt0pg52s/1et4S3o8hcPTQ6JoEhcejZ/0515456a899adce1392cd7b86751bffa/Hero-2.png',
      title: 'Amber & Sandalwood',
      cta: 'Discover Riviere',
      id: 2,
      shopUrl: '/products/riviere-50ml-extrait-de-parfum',
    },
    {
      url: 'https://studio.thameenlondon.com/wp-content/uploads/2023/01/Fanfare.jpg',
      title: 'Try something new',
      cta: 'Discover Fanfare',
      id: 3,
      shopUrl: '#',
    },
  ];

  const heroRef = useRef();

  const swiperParams = {
    modules: [Pagination, EffectFade, Autoplay, A11y, Keyboard, Navigation],
    effect: 'fade',
    fadeEffect: {crossFade: true},
    speed: 2000,
    pagination: {
      type: 'fraction',
      renderFraction(currentClass, totalClass) {
        return (
          `<span class="${currentClass}"></span>` +
          ' | ' +
          `<span class="${totalClass}"></span>`
        );
      },
    },
    autoplay: {enabled: true, delay: 8000, disableOnInteraction: false},
    loop: true,
    keyboard: {enabled: true},
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
    threshold: 5,
    slidesPerGroupAuto: false,
  };

  return (
    <>
      <Swiper
        {...swiperParams}
        className="relative h-[100vh] w-full"
        onBeforeInit={(swiper) => {
          heroRef.current = swiper;
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Image
              className="hero-slide-image"
              src={slide.url}
              alt={slide.title}
              width={1920}
              height={1080}
              loading="eager"
            />
            <div className="swiper-button-navigation">
              <button
                className="hero-button-prev swiper-button-prev left-caret"
                onClick={() => heroRef.current?.slidePrev()}
              >
                <LeftCaret />
              </button>
              <button
                className="hero-button-next swiper-button-next right-caret"
                onClick={() => heroRef.current?.slideNext()}
              >
                <RightCaret />
              </button>
            </div>
            <Link to={slide.shopUrl}>
              <div className="absolute bottom-0 md:bottom-[2.5rem] flex justify-center mx-auto left-0 right-0 items-center w-full md:w-[520px] h-[150px] md:h-[125px] bg-white">
                <div className="flex flex-col justify-center items-center space-y-2 swiper-text">
                  <h4 className="max-w-md swiper-title">{slide.title}</h4>
                  <h4 className="swiper-cta">{slide.cta}</h4>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

function SpreadMedia({data, loading, scale, sizes, width, widths}) {
  if (data.mediaContentType === 'VIDEO') {
    return (
      <Video
        previewImageOptions={{scale, src: data.previewImage.url}}
        width={scale * width}
        className="block object-cover w-full h-full"
        data={data}
        controls={false}
        muted
        loop
        playsInline
        autoPlay
      />
    );
  }

  if (data.mediaContentType === 'IMAGE') {
    return (
      <Image
        widths={widths}
        sizes={sizes}
        alt={data.alt || 'Marketing Banner Image'}
        className="block object-cover w-full h-full"
        // @ts-ignore
        data={data.image}
        loading={loading}
        width={width}
        loaderOptions={{scale, crop: 'center'}}
      />
    );
  }

  return null;
}

function SlideNextButton() {
  const swiper = useSwiper();
  return (
    <button onClick={() => swiper.slideNext()}>Slide to the next slide</button>
  );
}

function SlidePrevButton() {
  const swiper = useSwiper();
  return (
    <button onClick={() => swiper.slidePrev()}>
      Slide to the previous slide
    </button>
  );
}

function imgUrl(slides) {
  return slides.map((slide) => slide.url);
}

function createSlide() {
  return (
    <SwiperSlide>
      <img
        className="w-full h-full object-cover object-center"
        src={slide.url}
        alt={slide.title}
      />
    </SwiperSlide>
  );
}

export function LeftCaret() {
  return (
    <svg
      width="7"
      height="13"
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
      width="7"
      height="13"
      viewBox="0 0 7 13"
      fill="evenodd"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 6.5L0 0.5V12.5L7 6.5Z" fill="black" />
    </svg>
  );
}
