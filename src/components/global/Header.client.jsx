import {Fragment, useState, useRef, useEffect} from 'react';
import {Link, useUrl, useCart, Image} from '@shopify/hydrogen';
import {Bars3Icon} from '@heroicons/react/24/outline';

import {CartDrawer} from './CartDrawer.client';
import {MenuDrawer} from './MenuDrawer.client';
import {useDrawer} from './Drawer.client';

import {DesktopNavigation} from './DesktopNavigation.client';
import {NewsFlashBanner} from '../newsflash/NewsFlashBanner';

export function Header({title, menu}) {
  const {pathname} = useUrl();

  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  const isHome = pathname === `/`;
  const isJournal = pathname === `/journal`;

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const menuItems = menu?.items.map((item) => {
    return {
      title: item.title,
      url: item.url,
      children: item.children?.items.map((child) => {
        return {
          title: child.title,
          url: child.url,
        };
      }),
    };
  });

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      <NewsFlashBanner isHome={isHome} />
      <DesktopNavigation
        menu={menu}
        openCart={openCart}
        isHome={isHome}
        isJournal={isJournal}
        countryCode={countryCode}
      />
      <MobileNavigation
        isHome={isHome}
        isJournal={isJournal}
        title={title}
        menu={menu}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function MobileNavigation({
  isHome,
  isJournal,
  menu,
  openCart,
  openMenu,
  countryCode,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > 0 && isVisible) {
        setIsVisible(false);
      } else if (currentScrollPos === 0 && !isVisible) {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  const subMenu = [];

  const subMenuArray = (menu?.items || []).map((item) => subMenu.push(item));

  return (
    <>
      <header className="items-center w-full flex md:hidden">
        <div
          className={`mobile__nav bg-transparent  flex justify-center px-[1.125rem] w-full border-0 h-[72px] items-center  text-black align-middle ${
            !isVisible ? 'fade-out' : 'fade-in'
          } ${
            isHome || isJournal ? 'text-white hover:text-black' : 'text-black'
          }
        `}
          id="pageHeader"
        >
          <div className="max-w-screen-3xl w-full sticky">
            <div className="nav-block flex justify-between w-full items-center py-3 mx-auto left-0 right-0">
              {/* Mobile Logo */}
              <div className="flex items-center">
                <a href="/" className="mr-4 block" aria-label="Thameen London">
                  {isHome || isJournal ? (
                    <img
                      src="https://studio.thameenlondon.com/wp-content/uploads/2023/01/thameen_logo.svg"
                      alt="Thameen London"
                      width={160}
                      height={25}
                      className="brand-logo"
                    />
                  ) : (
                    <img
                      src="https://studio.thameenlondon.com/wp-content/uploads/2023/01/thameen_logo.svg"
                      alt="Thameen London"
                      width={160}
                      height={25}
                    />
                  )}
                </a>
              </div>

              {/* Mobile Icons */}
              {isHome || isJournal ? (
                <div className="flex align-middle justify-end my-2">
                  <form
                    action={`/${countryCode ? countryCode + '/' : ''}search`}
                    className="items-center gap-2 flex"
                  >
                    <button
                      type="submit"
                      className="relative flex items-center p-2"
                    >
                      <IconSearch />
                    </button>
                  </form>

                  <button
                    className="relative flex items-center p-2"
                    onClick={openCart}
                  >
                    <IconBag />
                  </button>
                  <button
                    className="relative flex items-center p-2"
                    aria-label="Toggle Cart"
                  >
                    <Bars3Icon className="w-6 h-6" onClick={openMenu} />
                  </button>
                </div>
              ) : (
                <div className="flex align-middle justify-end my-2">
                  <form
                    action={`/${countryCode ? countryCode + '/' : ''}search`}
                    className="items-center gap-2 flex"
                  >
                    <button
                      type="submit"
                      className="relative flex items-center p-2"
                    >
                      <IconSearchDark />
                    </button>
                  </form>

                  <button
                    className="relative flex items-center p-2"
                    onClick={openCart}
                  >
                    <IconBagDark />
                  </button>
                  <button
                    className="relative flex items-center p-2"
                    aria-label="Toggle Cart"
                  >
                    <Bars3Icon
                      className="w-6 h-6 text-black"
                      onClick={openMenu}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function CartBadge() {
  const {totalQuantity} = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div
      className={` -right-[8px] top-[45.5px] absolute text-[0.8rem] font-semibold subpixel-antialiased h-4 w-4 flex items-center justify-center leading-none text-center mx-auto`}
    >
      <span>{totalQuantity}</span>
    </div>
  );
}

function IconAccount() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="nav-icon"
    >
      <title>Account</title>
      <circle cx="12" cy="6.5" r="3" stroke="white" strokeWidth="2" />
      <path
        d="M20.9451 21.5H3.05493C3.55237 17 7.36745 13.5 12 13.5C16.6326 13.5 20.4476 17 20.9451 21.5Z"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconAccountDark() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Account</title>
      <circle cx="12" cy="6.5" r="3" stroke="black" strokeWidth="2" />
      <path
        d="M20.9451 21.5H3.05493C3.55237 17 7.36745 13.5 12 13.5C16.6326 13.5 20.4476 17 20.9451 21.5Z"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconBag() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="nav-icon"
    >
      <title>Shopping Bag</title>
      <path
        d="M8 7.5C8 5.29086 9.79086 3.5 12 3.5C14.2091 3.5 16 5.29086 16 7.5V9.5H8V7.5Z"
        stroke="white"
        strokeWidth="2"
      />
      <rect
        x="3"
        y="9.5"
        width="18"
        height="12"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconBagDark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Shopping Bag</title>
      <path
        d="M8 7.5C8 5.29086 9.79086 3.5 12 3.5C14.2091 3.5 16 5.29086 16 7.5V9.5H8V7.5Z"
        stroke="black"
        strokeWidth="2"
      />
      <rect
        x="3"
        y="9.5"
        width="18"
        height="12"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className="nav-icon"
    >
      <title>Search</title>
      <circle cx="12" cy="12.5" r="9" stroke="white" strokeWidth="2" />
      <path d="M18 18.5L21.5 22" stroke="white" strokeWidth="2" />
    </svg>
  );
}

function IconSearchDark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Search</title>
      <circle cx="12" cy="12.5" r="9" stroke="black" strokeWidth="2" />
      <path d="M18 18.5L21.5 22" stroke="black" strokeWidth="2" />
    </svg>
  );
}
