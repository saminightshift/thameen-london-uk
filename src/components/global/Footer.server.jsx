import {Listbox} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Link, useUrl} from '@shopify/hydrogen';

import {Section, FooterMenu} from '~/components';
import CountrySelection from './CountrySelection.client';

/**
 * A server component that specifies the content of the footer on the website
 */
export function Footer() {
  const {pathname} = useUrl();

  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : null;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative left-0 right-0 bottom-0 bg-black lg:bg-white mt-8"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-20 text-white lg:text-black">
        <div className="grid grid-cols-1 lg:grid-flow-col lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16">
          {/* Newsletter section */}
          <div className="mt-12  lg:col-span-4 lg:col-start-1">
            <h3 className="text-sm font-semibold uppercase">Sign up</h3>
            <p className="mt-2 text-sm tracking-wider">
              Sign up below for email updates about Thameen, including launch
              announcements, product information and early access to
              limited-edition products.
            </p>
            <form className="mt-8 flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                type="email"
                autoComplete="email"
                required
                placeholder="Email"
                className="w-full text-sm tracking-wider min-w-0 appearance-none border-0 border-b-[1px] bg-transparent py-2 px-4 placeholder-gray-500"
              />
            </form>
            <p className="mt-4 text-xs">
              You can unsubscribe any time by using the link in our emails.
            </p>
          </div>
          {/* Footer menu section */}
          <div className="mt-12 grid grid-cols-1 col-span-6 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:col-span-10 lg:col-start-6 text-white lg:text-black">
            <div className="gap-y-12">
              <div className="space-y-10">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    <Link to="/account">Account</Link>
                  </h3>
                </div>
                <CountrySelection />
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    Contact
                  </h3>
                  <ul
                    role="list"
                    className="mt-2 space-y-2 text-xs tracking-wider"
                  >
                    <li>
                      <a href="mailto:support@thameenlondon.com">
                        Email Customer Care
                      </a>
                    </li>
                    <li>
                      <a href="tel:+440207233333">Phone + 44 020 7233 333</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="gap-y-12 ">
              <div className="space-y-10">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    CUSTOMER CARE
                  </h3>
                  <ul
                    role="list"
                    className="mt-2 space-y-2 text-xs tracking-wider"
                  >
                    <li>
                      <Link to="/policies/shipping-policy">Shipping</Link>
                    </li>
                    <li>
                      <Link to="/policies/refund-policy">Returns</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    Legal &amp; Cookies
                  </h3>
                  <ul
                    role="list"
                    className="mt-2 space-y-2 text-xs tracking-wider"
                  >
                    <li>
                      <Link to="/policies/terms-of-service">
                        Terms &amp; Conditions
                      </Link>
                    </li>
                    <li>
                      <Link to="/policies/privacy-policy">Privacy Policy</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="gap-y-12">
              <div className="space-y-10">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    <Link to="/pages/our-story">Our Story</Link>
                  </h3>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    Follow Us
                  </h3>
                  <ul
                    role="list"
                    className="mt-2 space-y-2 text-xs tracking-wider"
                  >
                    <li>
                      <a href="https://instagram.com/thameenfragrance">
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a href="https://facebook.com/thameenlondon">Facebook</a>
                    </li>
                    <li>
                      <a href="https://linkedin.com/company/thameen-fragrance">
                        LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="gap-y-12">
              <div className="space-y-10">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    Store Locator
                  </h3>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    Thameen Services
                  </h3>
                  <ul
                    role="list"
                    className="mt-2 space-y-2 text-xs tracking-wider"
                  >
                    <li>Free shipping</li>
                    <li>30 days free returns</li>
                    <li>Complimentary gift wrapping, messaging & sending</li>
                    <li>Two complimentary samples with each order</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Footer section */}
        <div className="text-white lg:text-black text-xs text-center mt-10 py-6">
          &copy; {new Date().getFullYear()} Thameen London. All rights reserved.
          <br />
          <span className="text-[10px] text-[#0e0e0e] lg:text-[#fefefe]">
            Powered by Daze DGTL
          </span>
        </div>
      </div>
    </footer>
  );
}
