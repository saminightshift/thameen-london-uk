import React, {useState} from 'react';

import {Image, Link, Video} from '@shopify/hydrogen';
import {Heading, Text} from '~/components';
import {Navigation, Pagination, Virtual, EffectFade, Autoplay} from 'swiper';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';

export function Hero({
  byline,
  cta,
  handle,
  heading,
  height,
  loading,
  spread,
  spreadSecondary,
  top,
}) {
  const slides = [
    {
      url: 'https://images.ctfassets.net/t5tvnt0pg52s/1gCoBHteh1bGXCZcLbUQMY/6a1d8081f8945f1f3ad120257a548e89/Hero-1.png',
      title: 'our latest fragrance',
      cta: 'shop insignia',
      id: 1,
    },
    {
      url: 'https://images.ctfassets.net/t5tvnt0pg52s/1et4S3o8hcPTQ6JoEhcejZ/0515456a899adce1392cd7b86751bffa/Hero-2.png',
      title: 'Amber & Sandalwood',
      cta: 'Discover Riviere',
      id: 2,
    },
  ];

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, EffectFade]}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{delay: 200}}
        pagination={{clickable: true}}
        navigation={true}
      >
        <div className="relative h-64">
          {slides.map((slide) => (
            <Link key={slide.id} href={`/products/${slide.id}`}>
              <SwiperSlide key={slide.id}>
                <Image
                  className="w-full object-cover object-center"
                  src={slide.url}
                  alt={slide.title}
                  width={`100%`}
                  height={`100%`}
                />
                {/* Bottom call to action and link section */}
                <div className="absolute bottom-2 flex justify-center mx-auto left-0 right-0 items-center w-2/3 md:w-1/3 lg:w-72 h-28 bg-white">
                  <div className="flex flex-col justify-center items-center space-y-2">
                    <Text
                      format
                      as="p"
                      size="display"
                      className="max-w-md uppercase text-center font-semibold"
                    >
                      {slide.title}
                    </Text>
                    <Text
                      format
                      width="narrow"
                      as="p"
                      size="lead"
                      className="uppercase text-center tracking-widest font-medium"
                    >
                      {slide.cta}
                    </Text>
                  </div>
                </div>
              </SwiperSlide>
            </Link>
          ))}
          <SlidePrevButton />
          <SlideNextButton />
        </div>
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
