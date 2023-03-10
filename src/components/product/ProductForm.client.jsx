import {useEffect, useCallback, useState} from 'react';

import {
  useProductOptions,
  isBrowser,
  useUrl,
  AddToCartButton,
  Money,
} from '@shopify/hydrogen';

import {Heading, Text, Button, ProductOptions} from '~/components';
import {CartDrawer} from '../global/CartDrawer.client';
import {useDrawer} from '../index';

export function ProductForm() {
  const {pathname, search} = useUrl();
  const [params, setParams] = useState(new URLSearchParams(search));

  const {options, setSelectedOption, selectedOptions, selectedVariant} =
    useProductOptions();

  const isOutOfStock = !selectedVariant?.availableForSale || false;
  const isOnSale =
    selectedVariant?.priceV2?.amount <
      selectedVariant?.compareAtPriceV2?.amount || false;

  useEffect(() => {
    if (params || !search) return;
    setParams(new URLSearchParams(search));
  }, [params, search]);

  useEffect(() => {
    options.map(({name, values}) => {
      if (!params) return;
      const currentValue = params.get(name.toLowerCase()) || null;
      if (currentValue) {
        const matchedValue = values.filter(
          (value) => encodeURIComponent(value.toLowerCase()) === currentValue,
        );
        setSelectedOption(name, matchedValue[0]);
      } else {
        params.set(
          encodeURIComponent(name.toLowerCase()),
          encodeURIComponent(selectedOptions[name].toLowerCase()),
        ),
          window.history.replaceState(
            null,
            '',
            `${pathname}?${params.toString()}`,
          );
      }
    });
  }, []);

  const handleChange = useCallback(
    (name, value) => {
      setSelectedOption(name, value);
      if (!params) return;
      params.set(
        encodeURIComponent(name.toLowerCase()),
        encodeURIComponent(value.toLowerCase()),
      );
      if (isBrowser()) {
        window.history.replaceState(
          null,
          '',
          `${pathname}?${params.toString()}`,
        );
      }
    },
    [setSelectedOption, params, pathname],
  );

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  return (
    <>
      <form className="grid md:gap-10">
        {
          <div className="grid gap-4">
            {options.map(({name, values}) => {
              if (values.length === 1) {
                return null;
              }
              return (
                <div
                  key={name}
                  className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
                >
                  <Heading as="legend" size="lead" className="min-w-[4rem]">
                    {name}
                  </Heading>
                  <div className="flex flex-wrap items-baseline gap-4">
                    <ProductOptions
                      name={name}
                      handleChange={handleChange}
                      values={values}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        }
        <div className="grid items-stretch gap-4">
          <AddToCartButton
            variantId={selectedVariant?.id}
            quantity={1}
            accessibleAddingToCartLabel="Adding item to your cart"
            disabled={isOutOfStock}
            type="button"
            onClick={openCart}
          >
            <span
              className={`${
                isOutOfStock ? 'btn btn-sec' : 'btn btn-prim'
              } w-full`}
            >
              {isOutOfStock ? (
                <span
                  className="btn-padding disabled:cursor-not-allowed"
                  disabled
                >
                  Sold out
                </span>
              ) : (
                <span className="btn-padding">Add to bag</span>
              )}
            </span>
          </AddToCartButton>
        </div>
      </form>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
