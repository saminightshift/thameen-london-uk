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
  Link,
  Image,
  Metafield,
} from '@shopify/hydrogen';

import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {getExcerpt} from '~/lib/utils';
import {NotFound, Layout, ProductSwimlane} from '~/components/index.server';
import {ProductCard} from '../../components/index';
import {
  ProductDetail,
  ProductInfo,
  ProductForm,
  MobileProductGallery,
  DesktopProductGallery,
  Section,
  Text,
} from '~/components';
import {Button, ProductVariantSelector} from '../../components/index';
import KlaviyoPublishProductView from '../../components/klaviyo/KlaviyoPublishProductView.client';

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
    complimentary,
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
        <Seo type="product" data={product.title} />
      </Suspense>
      <ProductOptionsProvider data={product}>
        <Section padding="x" className="top flex flex-col min-h-screen">
          <div className="flex md:flex-row flex-col min-h-screen">
            <div className="w-screen md:w-1/2 carousel-wrapper">
              <MobileProductGallery
                media={media.nodes}
                className="block md:hidden"
              />
              <DesktopProductGallery media={media.nodes} className="hidden" />
            </div>
            <div className="top-0 lg:top-[120px] sticky w-full md:w-1/2 mx-auto lg:col-span-2 h-screen">
              <section className="transactional_pane absolute flex flex-col w-full gap-2 md:gap-4 md:p-6 sticky-top">
                <div className="md:border-t-2 md:border-black md:pb-6" />
                <div className="flex justify-between product-pane-container">
                  <span className="product-title-price">{title}</span>
                  <span className="product-title-price hidden md:inline-block">
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
                <div>
                  {productType && (
                    <div className="mb-6 product-pane-container">
                      <Text className="product-type">{productType}</Text>
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
                {exclusive ? (
                  <a href={exclusive.value} target="_blank" rel="noreferrer">
                    <Button className="btn btn-checkout w-full">
                      <span className="px-[25px]">Purchase from Retailer</span>
                    </Button>
                  </a>
                ) : (
                  <ProductForm data={product} />
                )}

                <div>
                  {complimentary && <div className="flex flex-col gap-2"></div>}
                </div>
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
        </Section>
        <Suspense>
          {/* Hidden on Mobile */}
          <section className="py-18 mb-12 page-container relative hidden">
            <div className="flex flex-col md:flex-row gap-4">
              <h4 className="text-base leading-6 font-semibold tracking-[0.08em]">
                Enjoy with
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {product && product?.productType.includes('Hair Fragrance') ? (
                  <div key={product.id}>
                    {/* Create a product card */}
                    <div className="relative">
                      <Link
                        to={`/products/${product.handle}`}
                        className="group block"
                      >
                        <div className="w-full h-64 relative">
                          <div className="absolute inset-0 w-full h-full">
                            <img
                              src={product.media.nodes[0].src}
                              alt={product.title}
                              className="group-hover:opacity-75"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
          <div className="block h-64" />
        </Suspense>
        <KlaviyoPublishProductView product={product} />
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
      complimentary: metafield(
        namespace: "shopify--discovery--product_recommendation"
        key: "complementary_products"
      ) {
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
    collections(first: 10) {
      edges {
        node {
          title
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
