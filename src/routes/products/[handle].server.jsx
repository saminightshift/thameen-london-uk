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
            <div className="w-full md:w-1/2 sticky top md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll ">
              {/* TODO use DaisyUI vertical carousel to create desktop slider */}
              {/* <ProductGallery
                media={media.nodes}
                className="w-screen md:w-full"
              /> */}
              <div className="w-screen md:w-full">
                <div className="mb-4">
                  <img
                    src="https://via.placeholder.com/960x1080.png?text=Product+Image"
                    alt="Product Image"
                  />
                </div>
                <div className="mb-4">
                  <img
                    src="https://via.placeholder.com/960x1080.png?text=Product+Image"
                    alt="Product Image"
                  />
                </div>
                <div className="mb-4">
                  <img
                    src="https://via.placeholder.com/960x1080.png?text=Product+Image"
                    alt="Product Image"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 mx-auto lg:col-span-2 h-screen">
              <section className="flex flex-col w-full gap-8 p-6 ">
                <div className="border-t-2 border-black pb-6" />
                <div className="flex justify-between">
                  <span className="uppercase text-[1.25rem] font-semibold tracking-widest inline-block">
                    {title}
                  </span>
                  <span className="text-[1.25rem] font-semibold">
                    <Money withoutTrailingZeros data={priceV2} as="span" />
                    {isOnSale && (
                      <Money
                        withoutTrailingZeros
                        data={priceV2}
                        as="span"
                        className="opacity-50 strike"
                      />
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {productType && (
                    <Text className={'text-black font-medium'}>
                      {productType}
                    </Text>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <ProductVariantSelector
                    data={product}
                    handle={handle}
                    title={title}
                    tags={tags}
                  />
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
          <Section padding="y" className="py-18 relative flex">
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
