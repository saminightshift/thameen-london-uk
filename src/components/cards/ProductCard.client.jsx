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
  } else if (product?.title === 'Discovery Set') {
    return null;
  }

  return (
    <Link onClick={onClick} to={`/products/${product.handle}`}>
      <div className="w-full m-auto relative">
        <div className="card-label">
          <h4>{cardLabel}</h4>
        </div>
        {image && (
          <Image
            className="w-full object-contain mix-blend-multiply"
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
        <div className="product-detail">
          <h3 className="text-center font-semibold text-black text-sm super-tracking leading-5 uppercase">
            {product.title}
          </h3>
          <div className="flex justify-center">
            <span className="text-center font-semibold text-black text-sm super-tracking leading-5 uppercase">
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

/*

<div className={styles}>
  <div className="card-image cursor-pointer">
    <h4 className="card-label">{cardLabel}</h4>
    {image && (
      <Image
        className="w-full object-contain mix-blend-multiply mt-[4rem] "
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
        loading="lazy"
      />
    )}
  </div>
  <div className="relative">
    <h3 className="text-center font-semibold text-black text-xs md:text-sm super-tracking leading-5 uppercase">
      {product.title}
    </h3>
    <div className="">
      <span className="text-center font-semibold text-black text-xs md:text-sm super-tracking leading-5 uppercase">
        <Money withoutTrailingZeros data={price} />
        {isDiscounted(price, compareAtPrice) && (
          <CompareAtPrice className={'opacity-50'} data={compareAtPrice} />
        )}
      </span>
    </div>
  </div>
</div>;



*/
