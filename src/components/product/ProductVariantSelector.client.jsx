import {Link} from '@shopify/hydrogen';
import {Disclosure, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Text} from '~/components';

// Can we refactor this to update the ProductForm component instead of redirecting to a new page?

export function ProductVariantSelector({data, handle}) {
  const {title} = data;

  // Create a new handle for the link depending on if the handle includes '100ml' or '50ml'
  const handle100ml = handle.replace('50ml', '100ml');
  const handle50ml = handle.replace('100ml', '50ml');

  // If the handle includes '100ml' then return the 50ml link and change the link title
  if (handle.includes('100ml')) {
    return (
      <Disclosure key={title} as="div" className="w-full gap-2 block">
        {({open}) => (
          <>
            <Disclosure.Button className="text-left inner-block">
              <div className="flex justify-between">
                <Text size="lead" as="h4" className="product-variant-selection">
                  100ml
                </Text>
                <ChevronDownIcon
                  className={`${
                    open ? 'rotate-180' : ''
                  } flex transition-transform transform-gpu duration-500 w-6 h-6 align-middle `}
                />
              </div>
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-y-0 opacity-0"
              enterTo="translate-y-3 opacity-100"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-y-4 opacity-100"
              leaveTo="translate-y-0 opacity-0"
            >
              <Disclosure.Panel className="relative  pt-4 grid gap-2 inner-block border-t border-gray-400 md:hover:bg-gray-100">
                <a href={`${handle50ml}`} className="py-2 font-medium">
                  50ml
                </a>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    );
  } else if (handle.includes('50ml')) {
    // If the handle includes '50ml' then return the 100ml link and change the link title
    return (
      <Disclosure key={title} as="div" className="w-full gap-2 block">
        {({open}) => (
          <>
            <Disclosure.Button className="text-left inner-block">
              <div className="flex justify-between">
                <Text size="lead" as="h4" className="product-variant-selection">
                  50ml
                </Text>
                <ChevronDownIcon
                  className={`${
                    open ? 'rotate-180' : ''
                  } flex transition-transform transform-gpu duration-500 w-6 h-6 align-middle`}
                />
              </div>
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-y-0 opacity-0"
              enterTo="translate-y-3 opacity-100"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-y-4 opacity-100"
              leaveTo="translate-y-0 opacity-0"
            >
              <Disclosure.Panel className="relative  pt-4 grid gap-2 inner-block border-t border-gray-400 md:hover:bg-gray-100">
                <a href={`${handle100ml}`} className="py-2 font-medium">
                  100ml
                </a>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    );
  }
}
