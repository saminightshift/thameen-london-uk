import {Suspense} from 'react';
import {
  gql,
  ProductOptionsProvider,
  Seo,
  ShopifyAnalyticsConstants,
  useLocalization,
  useRouteParams,
  useServerAnalytics,
  useShopQuery,
  Money,
  Metafield,
} from '@shopify/hydrogen';

import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {getExcerpt} from '~/lib/utils';
import {NotFound, Layout, ProductSwimlane} from '~/components/index.server';
import {
  Heading,
  ProductDetail,
  ProductInfo,
  ProductForm,
  ProductGallery,
  MobileProductGallery,
  DesktopProductGallery,
  Section,
  Text,
} from '~/components';
import {ProductVariantSelector} from '../../components/index';

export default function Product() {
  const {handle} = useRouteParams();

  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {
    data: {product, shop, products},
  } = useShopQuery({
    query: PRODUCT_QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
      handle,
    },
    preload: true,
  });

  if (!product) {
    return <NotFound type="product" />;
  }

  const {
    media,
    title,
    vendor,
    descriptionHtml,
    productType,
    notes,
    boxed,
    id,
    has_variant,
    exclusive,
  } = product;

  const {tags} = products;

  const {shippingPolicy, refundPolicy} = shop;

  const {
    priceV2,
    id: variantId,
    sku,
    title: variantTitle,
  } = product.variants.nodes[0];

  const isOnSale =
    product?.priceV2?.amount < product?.compareAtPriceV2?.amount || false;

  useServerAnalytics({
    shopify: {
      canonicalPath: `/products/${handle}`,
      pageType: ShopifyAnalyticsConstants.pageType.product,
      resourceId: id,
      products: [
        {
          product_gid: id,
          variant_gid: variantId,
          variant: variantTitle,
          name: title,
          brand: vendor,
          category: productType,
          price: priceV2.amount,
          sku,
          tags,
        },
      ],
    },
  });

  return (
    <Layout>
      <Suspense>
        <Seo type="product" data={product} />
      </Suspense>
      <ProductOptionsProvider data={product}>
        <section className="top">
          <div className="flex flex-wrap md:flex-row flex-col">
            <div className="w-screen md:w-1/2 carousel-wrapper">
              <MobileProductGallery
                media={media.nodes}
                className="block md:hidden"
              />
              <DesktopProductGallery media={media.nodes} className="hidden" />
            </div>
            <div className="top-0 sticky w-full md:w-1/2 mx-auto lg:col-span-2 h-screen">
              <section className="transactional_pane absolute flex flex-col w-full gap-2 md:gap-4 md:p-6 ">
                <div className="md:border-t-2 md:border-black md:pb-6" />
                <div className="flex justify-between text-[1.5rem] font-semibold tracking-widest px-4 md:px-0">
                  <span className="uppercase md:inline-block">{title}</span>
                  <span className="">
                    <Money withoutTrailingZeros data={priceV2} as="span" />
                    {isOnSale && (
                      <div>
                        <Money
                          withoutTrailingZeros
                          data={priceV2}
                          as="span"
                          className="opacity-50 line-through"
                        />
                      </div>
                    )}
                  </span>
                </div>
                {/* Quick fix: If has variant then show the border line, this needs tidying up */}
                <div className="">
                  {productType && (
                    <div className="pb-6 px-4 md:px-0">
                      <Text className={'text-black font-medium'}>
                        {productType}
                      </Text>
                    </div>
                  )}

                  {has_variant && <div className="border-b-2 border-black" />}
                </div>
                <div className="flex flex-col gap-2">
                  {has_variant && (
                    <ProductVariantSelector
                      data={product}
                      handle={handle}
                      has_variant={has_variant}
                    />
                  )}
                </div>

                <ProductForm />
                <div className="grid">
                  {descriptionHtml && <ProductInfo content={descriptionHtml} />}
                  {/* Fragrance Notes */}
                  {notes ? (
                    <ProductDetail
                      title="Fragrance Notes"
                      content={notes.value}
                      className="capitalize"
                    />
                  ) : null}
                  {/* Gift Set Details */}
                  {boxed ? (
                    <ProductDetail
                      title="More Information"
                      content={boxed.value}
                      className="capitalize"
                    />
                  ) : null}
                  {/* Shipping Policy Details */}
                  {shippingPolicy?.body && (
                    <>
                      <ProductDetail
                        title="Shipping"
                        content="Free shipping on all orders UK orders. <br/> Delivery within 2-4 working days."
                        learnMore={`/policies/${shippingPolicy.handle}`}
                      />
                    </>
                  )}
                  {/* Refund Policy */}
                  {refundPolicy?.body && (
                    <ProductDetail
                      title="Returns"
                      content="14 day Returns Policy"
                      learnMore={`/policies/${refundPolicy.handle}`}
                    />
                  )}
                </div>
              </section>
            </div>
          </div>
          <div className="md:hidden my-32 relative" />
        </section>
        <Suspense>
          {/* Hidden lower carousel whilst fixing page */}
          <Section padding="y" className="py-18 relative hidden">
            <ProductSwimlane title="Related Products" data={id} />
          </Section>
        </Suspense>
      </ProductOptionsProvider>
    </Layout>
  );
}

const PRODUCT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      descriptionHtml
      notes: metafield(namespace: "fragrance", key: "notes") {
        value
        id
      }
      boxed: metafield(namespace: "box_product", key: "items") {
        value
        id
      }
      has_variant: metafield(namespace: "variant", key: "item") {
        value
        id
      }
      exclusive: metafield(namespace: "exclusive_product", key: "link") {
        value
        id
      }
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      productType
      variants(first: 100) {
        nodes {
          id
          availableForSale
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          sku
          title
          unitPrice {
            amount
            currencyCode
          }
        }
      }
      seo {
        description
        title
      }
    }
    products(first: 250) {
      edges {
        node {
          id
          handle
        }
      }
    }
    shop {
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
`;
