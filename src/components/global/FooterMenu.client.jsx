// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Disclosure} from '@headlessui/react';
import {Link} from '@shopify/hydrogen';

import {Heading, IconCaret} from '~/components';

/**
 * A server component that specifies the content of the footer on the website
 */
export function FooterMenu() {
  const footerMenu = [
    {id: 'footer-menu'},
    {
      title: 'Account',
      href: '/account',
      items: [],
    },
    {
      title: 'Shipping To',
      href: '',
      items: [
        {
          title: 'United Kingdom (£)',
          href: '/',
        },
        {
          title: 'United States ($)',
          href: 'https://us.thameenlondon.com',
        },
      ],
    },
    {
      title: 'Contact',
      href: '',
      items: [
        {
          title: 'Email Customer Care',
          href: 'mailto:support@thameenlondon.com',
        },
      ],
    },
    {
      title: 'Customer Care',
      href: '',
      items: [
        {
          title: 'Shipping',
          href: '/policy/shipping',
        },
        {
          title: 'Ordering & Payment',
          href: '/policy/ordering',
        },
        {
          title: 'Refunds & Returns',
          href: '/policy/refund-policy',
        },
      ],
    },
    {
      title: 'Legal & Cookies',
      href: '',
      items: [
        {
          title: 'Terms & Conditions',
          href: '/policy/terms-of-service',
        },
        {
          title: 'Privacy & Cookie Policy',
          href: '/policy/privacy-policy',
        },
      ],
    },
    {
      title: 'Our Story',
      href: '',
      items: [
        {
          title: 'Our Story',
          href: '/about',
        },
        {
          title: 'Careers',
          href: '/careers',
        },
        {
          title: 'Site Map',
          href: '/sitemap',
        },
      ],
    },
    {
      title: 'Follow Us',
      href: '',
      items: [
        {
          title: 'Instagram',
          href: 'https://www.instagram.com/thameenfragrance',
        },
        {
          title: 'Facebook',
          href: 'https://www.facebook.com/thameenlondon',
        },
        {
          title: 'LinkedIn',
          href: 'https://www.linkedin.com/company/thameenlondon',
        },
      ],
    },
    {
      title: 'Store Locator',
      href: '/store-locator',
    },
    {
      title: 'Thameen Services',
      href: '',
    },
  ];

  return (
    <>
      {(footerMenu?.items || []).map((item) => (
        <section key={item.id} className="grid gap-4">
          <Disclosure>
            {/* @ts-expect-error @headlessui/react incompatibility with node16 resolution */}
            {({open}) => (
              <>
                <Disclosure.Button className="text-left md:cursor-default">
                  <Heading className="flex justify-between" size="lead" as="h3">
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="md:hidden">
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button>
                {item?.items?.length > 0 && (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Disclosure.Panel static>
                      <nav className={styles.nav}>
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.id}
                            to={subItem.to}
                            target={subItem.target}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </nav>
                    </Disclosure.Panel>
                  </div>
                )}
              </>
            )}
          </Disclosure>
        </section>
      ))}{' '}
    </>
  );
}
