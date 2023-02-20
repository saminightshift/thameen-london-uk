import clsx from 'clsx';
import {
  flattenConnection,
  Image,
  Link,
  Money,
  useMoney,
} from '@shopify/hydrogen';

import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';
import {useEffect} from 'react';

export function ProductCarouselCard({product, label, loading, onClick}) {
  let cardLabel;

  const cardData = product?.variants ? product : getProductPlaceholder();

  const {
    image,
    priceV2: price,
    compareAtPriceV2: compareAtPrice,
  } = flattenConnection(cardData?.variants)[0] || {};

  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price, compareAtPrice)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }

  useEffect(() => {
    // lazy load images
    const images = document.querySelectorAll('.card-image img');
    const config = {
      rootMargin: '0px 0px 50px 0px',
      threshold: 0,
    };

    let observer = new IntersectionObserver((entries, self) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.target.src === '' &&
          startedIntersecting
        ) {
          preloadImage(entry.target);
          self.unobserve(entry.target);
        }
      });
    }, config);

    images.forEach((image) => {
      observer.observe(image);
    });
  }, []);

  return (
    <Link onClick={onClick} to={`/products/${product.handle}`}>
      <div className="grid gap-2">
        <div className="card-image cursor-pointer w-full min-w-[20px]">
          <h4 className="absolute top-0 left-0 m-4 max-w-prose whitespace-pre-wrap text-xs super-tracking leading-5 rotate-90 uppercase font-bold text-black">
            {cardLabel}
          </h4>
          {image && (
            <img
              className="w-full object-contain mix-blend-multiply on-page-load"
              src={image.url}
              alt={image.altText || `Picture of ${product.title}`}
              loading={loading}
            />
          )}
        </div>
        <div className="relative -top-6 flex justify-center align-baseline">
          <h3 className="text-center font-semibold text-sm super-tracking leading-5 uppercase">
            {product.title}
          </h3>
        </div>
        <div className="relative -top-7 flex justify-center align-baseline">
          <span className="text-center font-semibold text-primary text-sm super-tracking leading-5 uppercase">
            <Money withoutTrailingZeros data={price} />
            {isDiscounted(price, compareAtPrice) && (
              <CompareAtPrice data={compareAtPrice} className="opacity-50" />
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}

function CompareAtPrice({data, className}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
