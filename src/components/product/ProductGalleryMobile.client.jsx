import {MediaFile} from '@shopify/hydrogen';
import {ATTR_LOADING_EAGER} from '~/lib/const';

/**
 * This is a client component for mobile view of the product gallery. As it swipes horizontally as opposed to vertically, we have separated each out into their own components.
 *
 */

export function MobileProductGallery({media}) {
  if (!media.length) {
    return null;
  }

  return (
    <div className="w-full h-full carousel flex md:hidden pb-5 bg-[#F3ECEE]">
      {media.map((med, i) => {
        let mediaProps = {};
        const isFullWidth = i % 3 === 0;

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

        return (
          <div
            className="carousel-item w-full mix-blend-multiply"
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
              className="w-full object-contain mobile-carousel-image"
              {...mediaProps}
            />
          </div>
        );
      })}
    </div>
  );
}
