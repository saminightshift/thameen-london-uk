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

import {useMediaQuery} from '../../lib/hooks';

export function Hero(data) {
  const slides = [
    {
      images: [
        {
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Slide_3200x1800px-1.webp?v=1676525105',
          width: 3200,
          height: 1800,
          id: '1_3200X1800',
        },
        {
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Slide_720x1080px-1.webp?v=1676525104',
          width: 720,
          height: 1080,
          id: '1_720x1080',
        },
      ],
      title: 'our new fragrance',
      cta: 'discover fanfare',
      handle: '/products/fanfare-100ml-cologne-elixir',
    },
    {
      images: [
        {
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Slide_3200x1800px-2.webp?v=1676525106',
          width: 3200,
          height: 1800,
          id: '2_3200X1800',
        },
        {
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Slide_720x1080px-2_81169f3b-a51c-4336-922a-5e646017ee82.webp?v=1677531320',
          width: 720,
          height: 1080,
          id: '2_720x1080',
        },
      ],
      title: 'with love',
      cta: 'red cullinan diamond',
      handle: '/products/red-cullinan-diamond-50ml-extrait-de-parfum',
    },
    {
      images: [
        {
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Slide_3200x1800px-3.webp?v=1676525105',
          width: 3200,
          height: 1800,
          id: '3_3200X1800',
        },
        {
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/SLIDE_720X1080PX-3_65431ece-cbc4-4abe-a53c-16a657be0be9.webp?v=1677531320',
          width: 720,
          height: 1080,
          id: '3_720x1080',
        },
      ],
      title: 'Representing an aura of a British heirloom',
      cta: 'Insignia',
      handle: '/products/insignia-50ml-extrait-de-parfum',
    },
    {
      images: [
        {
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Slide_3200x1800px-4.webp?v=1676525105',
          width: 3200,
          height: 1800,
          id: '4_3200X1800',
        },
        {
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Slide_720x1080px-4_6f69d2b1-33b1-411a-b506-eef6696c861a.webp?v=1677531320',
          width: 720,
          height: 1080,
          id: '4_720x1080',
        },
      ],
      title: 'pure elegance',
      cta: 'shop the regal collection',
      handle: '/collections/regal-collection',
    },
    {
      images: [
        {
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Slide_3200x1800px-5.webp?v=1677106663',
          width: 3200,
          height: 1800,
          id: '5_3200X1800',
        },
        {
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Slide_720x1080px-5.webp?v=1677106662',
          width: 720,
          height: 1080,
          id: '5_720x1080',
        },
      ],
      title: 'Taif Rose immortalises the legendary throne',
      cta: 'Peacock Throne',
      handle: '/products/peacock-throne-50ml-extrait-de-parfum',
    },
    {
      images: [
        {
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Slide_3200x1800px-6.webp?v=1677106663',
          width: 3200,
          height: 1800,
          id: '6_3200X1800',
        },
        {
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Slide_720x1080px-6.webp?v=1677106662',
          width: 720,
          height: 1080,
          id: '6_720x1080',
        },
      ],
      title: 'Sensual and seductive with a glorious white floral',
      cta: 'Peregrina',
      handle: '/products/peregrina-100ml-extrait-de-parfum',
    },
  ];

  // const isMobile = useMediaQuery({query: '(max-width: 767px)'});
  // const isDesktop = useMediaQuery({query: '(min-width: 768px)'});

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
    <div className="hero-swiper">
      <Swiper
        {...swiperParams}
        className="relative h-full w-full"
        onBeforeInit={(swiper) => {
          heroRef.current = swiper;
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link to={`${slide.handle}`}>
              <div className="h-full w-full">
                <div
                  className="absolute top-0 left-0 hidden md:flex"
                  style={{
                    backgroundImage: `url(${slide.images[0].url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                  }}
                />
                <div
                  className="absolute top-0 left-0 flex md:hidden"
                  style={{
                    backgroundImage: `url(${slide.images[1].url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
              <div className="swiper-box absolute bottom-0 md:bottom-[2.5rem] flex justify-center mx-auto left-0 right-0 items-center w-full md:w-[520px] h-[150px] md:h-[125px] bg-white">
                <div className="flex flex-col justify-center items-center space-y-2 swiper-text">
                  <h4 className="max-w-md swiper-title">{slide.title}</h4>
                  <h4 className="swiper-cta">{slide.cta}</h4>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-navigation">
        <button
          className="hero-button-prev swiper-button-prev left-caret"
          onClick={() => heroRef.current?.slidePrev()}
        >
          <LeftCaret />
        </button>
        <div className="hero-swiper-pagination" />
        <button
          className="hero-button-next swiper-button-next right-caret"
          onClick={() => heroRef.current?.slideNext()}
        >
          <RightCaret />
        </button>
      </div>
    </div>
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
