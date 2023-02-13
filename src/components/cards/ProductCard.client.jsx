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

export function ProductCard({product, label, className, loading, onClick}) {
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

  const styles = clsx('grid gap-6', className);

  return (
    <Link onClick={onClick} to={`/products/${product.handle}`}>
      <div className={styles}>
        <div className="card-image aspect-[1/1] hover:scale-110 transition-all duration-700 cursor-pointer">
          <h4 className="absolute top-0 left-0 m-4 max-w-prose whitespace-pre-wrap rotate-90 uppercase font-bold text-black">
            {cardLabel}
          </h4>
          {image && (
            <Image
              className="w-full object-contain mix-blend-multiply "
              width={[400]}
              height={400}
              sizes="320px"
              loaderOptions={{
                blur: 10,
                crop: 'center',
                scale: 2,
                width: 400,
                height: 400,
              }}
              // @ts-ignore Stock type has `src` as optional
              data={image}
              alt={image.altText || `Picture of ${product.title}`}
              loading={loading}
            />
          )}
        </div>
        <div className="relative -top-8">
          <h3 className="text-center font-semibold text-black text-xs lg:text-sm super-tracking leading-5 uppercase">
            {product.title}
          </h3>
          <div className="">
            <span className="text-center font-semibold text-black text-xs lg:text-sm super-tracking leading-5 uppercase">
              <Money withoutTrailingZeros data={price} />
              {isDiscounted(price, compareAtPrice) && (
                <CompareAtPrice
                  className={'opacity-50'}
                  data={compareAtPrice}
                />
              )}
            </span>
          </div>
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
