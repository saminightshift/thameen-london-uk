import {Link} from '@shopify/hydrogen';
import {Disclosure} from '@headlessui/react';
import {Text, IconCaret} from '~/components';

// Can we refactor this to update the ProductForm component instead of redirecting to a new page?

export function ProductVariantSelector({data, handle}) {
  const {title, id, slug, tags} = data;

  // Create a new handle for the link depending on if the handle includes '100ml' or '50ml'
  const handle100ml = handle.replace('50ml', '100ml');
  const handle50ml = handle.replace('100ml', '50ml');

  // If the handle includes '100ml' then return the 50ml link and change the link title
  if (handle.includes('100ml')) {
    return (
      <Disclosure key={title} as="div" className="w-full gap-2 block">
        {({open}) => (
          <>
            <Disclosure.Button className="text-left inner-block border-b-2 border-black">
              <div className="flex justify-between">
                <Text size="lead" as="h4">
                  100ml
                </Text>
                <IconCaret
                  className={`${
                    open ? '' : 'rotate-[90deg]'
                  } transition-transform transform-gpu duration-400 `}
                />
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="relative pb-4 pt-4 grid gap-2 inner-block">
              <a href={`${handle50ml}`}>50ml</a>
            </Disclosure.Panel>
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
            <Disclosure.Button className="text-left inner-block border-b-2 border-black">
              <div className="flex justify-between">
                <Text size="lead" as="h4">
                  50ml
                </Text>
                <IconCaret
                  className={`${
                    open ? '' : 'rotate-[90deg]'
                  } transition-transform transform-gpu duration-400 `}
                />
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="relative pb-4 pt-4 grid gap-2 inner-block">
              <a href={`${handle100ml}`}>100ml</a>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }
}
