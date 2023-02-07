// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Disclosure, Transition} from '@headlessui/react';
import {Link} from '@shopify/hydrogen';
import Parser from '../../lib/utils';
import {Text, IconClose} from '~/components';

export function ProductDetail({title, content, learnMore}) {
  return (
    <Disclosure key={title} as="div" className="w-full gap-2 block">
      {/* @ts-expect-error @headlessui/react incompatibility with node16 resolution */}
      {({open}) => (
        <>
          <Disclosure.Button className="text-left inner-block border-b-2 border-black">
            <div className="flex justify-between">
              <Text size="lead" as="h4">
                {title}
              </Text>
              <IconClose
                className={`${
                  open ? '' : 'rotate-[45deg]'
                } transition-transform transform-gpu duration-400`}
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
            <Disclosure.Panel className="relative pb-4 pt-4 grid gap-2 inner-block">
              <div className="font-medium inline-block ">{Parser(content)}</div>
              {learnMore && (
                <div className="inline-block">
                  <Link
                    className="pb-px border-b border-primary/30 text-primary/50"
                    to={learnMore}
                  >
                    Learn more
                  </Link>
                </div>
              )}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
