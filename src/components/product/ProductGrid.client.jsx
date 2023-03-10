import {useState, useRef, useEffect, useCallback} from 'react';
import {Link, flattenConnection, useUrl} from '@shopify/hydrogen';

import {Button, Grid, ProductCard} from '~/components';
import {getImageLoadingPriority} from '~/lib/const';

export function ProductGrid({url, collection}) {
  const nextButtonRef = useRef(null);
  const initialProducts = collection?.products?.nodes || [];
  const {hasNextPage, endCursor} = collection?.products?.pageInfo ?? {};
  const [products, setProducts] = useState(initialProducts);
  const [cursor, setCursor] = useState(endCursor ?? '');
  const [nextPage, setNextPage] = useState(hasNextPage);
  const [pending, setPending] = useState(false);
  const haveProducts = initialProducts.length > 0;

  const fetchProducts = useCallback(async () => {
    setPending(true);
    const postUrl = new URL(window.location.origin + url);
    postUrl.searchParams.set('cursor', cursor);

    const response = await fetch(postUrl, {
      method: 'POST',
    });
    const {data} = await response.json();
    // @ts-ignore TODO: Fix types
    const newProducts = flattenConnection(
      data?.collection?.products || data?.products || [],
    );
    const {endCursor, hasNextPage} = data?.collection?.products?.pageInfo ||
      data?.products?.pageInfo || {endCursor: '', hasNextPage: false};

    setProducts([...products, ...newProducts]);
    setCursor(endCursor);
    setNextPage(hasNextPage);
    setPending(false);
  }, [cursor, url, products]);

  const handleIntersect = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchProducts();
        }
      });
    },
    [fetchProducts],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '100%',
    });

    const nextButton = nextButtonRef.current;

    if (nextButton) observer.observe(nextButton);

    return () => {
      if (nextButton) observer.unobserve(nextButton);
    };
  }, [nextButtonRef, cursor, handleIntersect]);

  const {pathname} = useUrl();

  const allProducts = pathname === `/products`;

  const collectionPage = pathname === `/collections/${collection?.handle}`;

  function allFragrances(products) {
    const filteredProducts = products.filter(
      (product) =>
        product?.productType === 'EDP 50ML' ||
        product?.productType === 'COL 100ML' ||
        product?.productType === 'EHP 10ML',
    );

    return filteredProducts;
  }

  function onlyFifty(products) {
    const filteredProducts = products.filter(
      (product) => product?.productType === 'EDP 50ML',
    );

    return filteredProducts;
  }

  const filteredProducts = allProducts ? allFragrances(products) : products;

  if (!haveProducts) {
    return (
      <div className="page-container">
        <p>No products found on this collection</p>
        <Link to="/products">
          <p className="underline">Browse catalog</p>
        </Link>
      </div>
    );
  } else if (allProducts) {
    return (
      <div className="mx-auto px-0 md:px-12">
        <div className="product-card-grid">
          {filteredProducts.map((product, i) => (
            <div className="product-card bg-[#F3ECEE]" key={product.id}>
              <ProductCard
                product={product}
                loading={getImageLoadingPriority(i)}
              />
            </div>
          ))}
        </div>

        {nextPage && (
          <div
            className="flex items-center justify-center mt-6"
            ref={nextButtonRef}
          >
            <Button
              variant="secondary"
              disabled={pending}
              onClick={fetchProducts}
              width="full"
            >
              {pending ? 'Loading...' : 'Load more products'}
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {/* COLLECTION PAGES */}
      <div className="md:page-container">
        {collection?.image ? (
          <div className="collection-page-grid">
            <div className="collection-card large">
              <div
                className=""
                style={{
                  backgroundImage: `url(${collection?.image?.url})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  height: '100%',
                  width: '100%',
                }}
              />
            </div>

            {products.map((product, i) => (
              <div className="product-card bg-[#F3ECEE]" key={product.id}>
                <ProductCard
                  product={product}
                  loading={getImageLoadingPriority(i)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="product-card-grid">
            {products.map((product, i) => (
              <div className="product-card bg-[#F3ECEE]" key={product.id}>
                <ProductCard
                  product={product}
                  loading={getImageLoadingPriority(i)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {nextPage && (
        <div
          className="flex items-center justify-center mt-6"
          ref={nextButtonRef}
        >
          <Button
            variant="secondary"
            disabled={pending}
            onClick={fetchProducts}
            width="full"
          >
            {pending ? 'Loading...' : 'Load more products'}
          </Button>
        </div>
      )}
    </>
  );
}
