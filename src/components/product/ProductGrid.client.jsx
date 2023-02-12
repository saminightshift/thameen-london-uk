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

    // ProductGrid can paginate collection, products and search routes
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

  function allFragrances(products) {
    const filteredProducts = products.filter(
      (product) =>
        product?.productType === 'EDP 50ML' ||
        product?.productType === 'COL 100ML' ||
        product?.productType === 'EHP 10ML',
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
      <>
        <Grid layout="products">
          {filteredProducts.map((product, i) => (
            <ProductCard
              key={i}
              product={product}
              loading={getImageLoadingPriority(i)}
            />
          ))}
        </Grid>

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

  return (
    <>
      {/* Responsive grid with 5 products per row */}
      <div className="md:page-container">
        {collection?.image ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            <div className="hidden md:grid col-span-2 gap-2 md:w-full md:h-full ">
              <div
                className="collection-image "
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
              <div className="col-span-1  bg-[#F3ECEE]" key={product.id}>
                <ProductCard
                  product={product}
                  loading={getImageLoadingPriority(i)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {products.map((product, i) => (
              <div className="col-span-1  bg-[#F3ECEE]" key={product.id}>
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
