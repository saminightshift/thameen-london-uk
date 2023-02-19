import React, {useState} from 'react';
import {MediaFile} from '@shopify/hydrogen';
import {ATTR_LOADING_EAGER} from '~/lib/const';
import {LeftCaret, RightCaret} from '../sections/Hero.client';

/**
 * This is a client component for mobile view of the product gallery. As it swipes horizontally as opposed to vertically, we have separated each out into their own components.
 *
 */

export function MobileProductGallery({media}) {
  if (!media.length) {
    return null;
  }

  const [current, setCurrent] = useState(0);
  const length = media.length;

  const nextSlide = () => {
    // change the MediaFile component to the next one
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    // change the MediaFile component to the previous one
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const FractionPagination = ({totalSlides}) => {
    const currentSlide = current + 1;
    const totalSlide = totalSlides;

    return (
      <div className="mobile-slide-navigation-fraction">
        <span>{currentSlide}</span>
        <span>|</span>
        <span>{totalSlide}</span>
      </div>
    );
  };

  const SlideNav = ({totalSlides}) => {
    return (
      <div className="mobile-slide-navigation">
        <button className="focus:outline-none" onClick={prevSlide}>
          <LeftCaret />
        </button>
        <FractionPagination totalSlides={totalSlides} />
        <button className="focus:outline-none" onClick={nextSlide}>
          <RightCaret />
        </button>
      </div>
    );
  };

  return (
    <>
      <div
        className="w-full h-screen carousel flex lg:hidden bg-[#F3ECEE]"
        data-test="mobile-product-gallery"
      >
        {media.map((med, i) => {
          let mediaProps = {};
          const isFirst = i === 0;
          const isMiddle = i === 1;
          const isLast = i === media.length - 1;
          const isFullWidth = i % 3 === 0;
          const isMood = med?.image?.url.includes('Product_Mood');

          const data = {
            ...med,
            image: {
              // @ts-ignore
              ...med.image,
              altText: med.alt || 'Product image',
            },
          };

          switch (med.mediaContentType) {
            case 'IMAGE':
              mediaProps = {
                width: 800,
                widths: [400, 800, 1200, 1600, 2000, 2400],
              };
              break;
            case 'VIDEO':
              mediaProps = {
                width: '100%',
                autoPlay: true,
                controls: false,
                muted: true,
                loop: true,
                preload: 'auto',
              };
              break;
            case 'EXTERNAL_VIDEO':
              mediaProps = {width: '100%'};
              break;
            case 'MODEL_3D':
              mediaProps = {
                width: '100%',
                interactionPromptThreshold: '0',
                ar: true,
                loading: ATTR_LOADING_EAGER,
                disableZoom: true,
              };
              break;
          }

          if (i === 0 && med.mediaContentType === 'IMAGE') {
            mediaProps.loading = ATTR_LOADING_EAGER;
          }

          const styles = [
            isFirst ? 'mobile-item-first' : '',
            isMiddle ? 'mobile-item-middle' : '',
            isLast ? 'mobile-item-last' : '',
            isMood ? 'mobile-item-mood' : '',
          ].join(' ');

          return (
            <div
              className="carousel-item mobile-item w-full image-loading "
              key={med.id || med.image.id}
            >
              <MediaFile
                tabIndex="0"
                data={data}
                sizes={
                  isFullWidth
                    ? '(min-width: 64em) 60vw, (min-width: 48em) 50vw, 90vw'
                    : '(min-width: 64em) 30vw, (min-width: 48em) 25vw, 90vw'
                }
                options={{
                  crop: 'center',
                  scale: 2,
                }}
                className={`${styles} w-full object-contain mobile-carousel-image mix-blend-multiply`}
                {...mediaProps}
                style={{
                  transform: `translateX(-${current * 100}%)`,
                  opacity: current === i ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out',
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="mobile-slide-navigation-wrapper">
        <SlideNav totalSlides={media.length} />
      </div>
    </>
  );
}
