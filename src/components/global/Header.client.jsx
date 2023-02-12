import {Fragment, useState, useRef, useEffect} from 'react';
import {Link, useUrl, useCart, Image} from '@shopify/hydrogen';
import {Bars3Icon} from '@heroicons/react/24/outline';

import {Input} from '~/components';

import {CartDrawer} from './CartDrawer.client';
import {MenuDrawer} from './MenuDrawer.client';
import {useDrawer} from './Drawer.client';

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
      <DesktopHeader
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

function DesktopHeader({
  isHome,
  isJournal,
  menu,
  openCart,
  openMenu,
  countryCode,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function Logo() {
    if (!isOpen) {
      return (
        <img
          src="https://studio.thameenlondon.com/wp-content/uploads/2023/01/thameen_logo_white.svg"
          alt="Thameen London"
          width={150}
          height={50}
        />
      );
    } else {
      return (
        <img
          src="https://studio.thameenlondon.com/wp-content/uploads/2023/01/thameen_logo.svg"
          alt="Thameen London"
          width={150}
          height={50}
        />
      );
    }
  }

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
      <header className="items-center w-full">
        <div
          className={`module__nav bg-transparent  flex justify-center px-5 w-full border-b-0 h-[72px] lg:h-auto items-center hoverNav text-black  ${
            !isVisible ? 'fade-out' : 'fade-in'
          } ${
            isHome || isJournal ? 'text-white hover:text-black' : 'text-black'
          }
        `}
          id="pageHeader"
        >
          <div className="max-w-screen-3xl w-full sticky">
            <div className="nav-block flex lg:flex-basis justify-between w-full items-center py-3 mx-auto left-0 right-0">
              {/* Desktop Logo */}
              <div className="hidden lg:flex items-center body-mini-semibold uppercase hover:border-b-1 z-40">
                <a
                  href="/"
                  className="mr-4 hidden lg:block"
                  aria-label="Thameen London"
                >
                  <div className="flex items-center w-40 h-12">
                    {isHome || isJournal ? (
                      <div
                        style={{
                          background:
                            'url(https://studio.thameenlondon.com/wp-content/uploads/2023/01/thameen_logo_white.svg)',
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          background:
                            'url(https://studio.thameenlondon.com/wp-content/uploads/2023/01/thameen_logo.svg)',
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    )}
                  </div>
                  <span className="sr-only">Thameen London</span>
                </a>
              </div>
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center">
                <a href="/" className="mr-4 block" aria-label="Thameen London">
                  {isHome || isJournal ? (
                    <img
                      src="https://studio.thameenlondon.com/wp-content/uploads/2023/01/thameen_logo_white.svg"
                      alt="Thameen London"
                      width={150}
                      height={50}
                    />
                  ) : (
                    <img
                      src="https://studio.thameenlondon.com/wp-content/uploads/2023/01/thameen_logo.svg"
                      alt="Thameen London"
                      width={150}
                      height={50}
                    />
                  )}
                </a>
              </div>

              <div className="justify-between m-auto left-0 right-0 text-center hidden lg:flex">
                {isHome || isJournal ? (
                  <nav className="flex nav-items lg:gap-[4rem] xl:gap-[7rem] uppercase font-semibold text-xs z-40">
                    {/* Top level menu items */}
                    {(menu?.items || []).map((item, index) => (
                      <div className="hoverable hover:text-black" key={item.id}>
                        {/* Check if items have children */}
                        {(item?.items || []).length > 0 ? (
                          <span className="uppercase font-semibold cursor-pointer">
                            <span className="nav-link">{item.title}</span>

                            <div className="mega-menu">
                              {/* SubMenu Items */}
                              <div
                                className={`${`menu-${index}`} mega-menu__inner shadow-lg`}
                              >
                                <ul
                                  className={`${`grid-${index}`} grid grid-cols-3 gap-0 mega-menu__list `}
                                >
                                  {item.items.map((subItem) => (
                                    <div key={subItem.id}>
                                      <li className="mega-menu__item">
                                        <Link
                                          to={subItem.to}
                                          className="mega-menu__link"
                                        >
                                          {subItem.title}
                                        </Link>
                                      </li>
                                    </div>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </span>
                        ) : (
                          <Link
                            to={item.to}
                            target={item.target}
                            className="nav-link"
                          >
                            <span className="uppercase tracking-wider font-semibold">
                              {item.title}
                            </span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>
                ) : (
                  <nav className="flex nav-items lg:gap-[4rem] xl:gap-[7rem] uppercase font-semibold text-xs z-40">
                    {/* Top level menu items */}
                    {(menu?.items || []).map((item, index) => (
                      <div className="hoverable text-black" key={item.id}>
                        {/* Check if items have children */}
                        {(item?.items || []).length > 0 ? (
                          <span className="uppercase tracking-wider font-semibold cursor-pointer">
                            <span className="nav-link text-black">
                              {item.title}
                            </span>

                            <div className="mega-menu">
                              {/* SubMenu Items */}
                              <div
                                className={`${`menu-${index}`} mega-menu__inner shadow-lg`}
                              >
                                <ul
                                  className={`${`grid-${index}`} grid grid-cols-3 gap-0 mega-menu__list `}
                                >
                                  {item.items.map((subItem) => (
                                    <div key={subItem.id}>
                                      <li className="mega-menu__item text-black">
                                        <Link
                                          to={subItem.to}
                                          className="mega-menu__link text-black"
                                        >
                                          {subItem.title}
                                        </Link>
                                      </li>
                                    </div>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </span>
                        ) : (
                          <Link
                            to={item.to}
                            target={item.target}
                            className="nav-link"
                          >
                            <span className="uppercase tracking-wider font-semibold">
                              {item.title}
                            </span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>
                )}
              </div>
              {/* Mobile Icons */}
              {isHome || isJournal ? (
                <div className="flex lg:hidden">
                  <form
                    action={`/${countryCode ? countryCode + '/' : ''}search`}
                    className="items-center gap-2 sm:flex"
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
                <div className="flex lg:hidden">
                  <form
                    action={`/${countryCode ? countryCode + '/' : ''}search`}
                    className="items-center gap-2 sm:flex"
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

              {/* Desktop Icons */}
              {isHome || isJournal ? (
                <div className="hidden lg:flex justify-end">
                  <form
                    action={`/${countryCode ? countryCode + '/' : ''}search`}
                  >
                    <button
                      type="submit"
                      className="hidden lg:flex items-center mr-2 p-2"
                    >
                      <IconSearch />
                    </button>
                  </form>
                  <Link
                    to="/account"
                    className="items-center mr-2 relative hover:border-white p-2"
                    aria-expanded="false"
                    aria-label="Account"
                  >
                    <IconAccount />
                  </Link>
                  <button
                    onClick={openCart}
                    className="hidden lg:flex items-center p-2"
                  >
                    <IconBag />
                    <CartBadge />
                  </button>
                </div>
              ) : (
                <div className="hidden lg:flex justify-end">
                  <form
                    action={`/${countryCode ? countryCode + '/' : ''}search`}
                  >
                    <button
                      type="submit"
                      className="hidden lg:flex items-center mr-2 p-2"
                    >
                      <IconSearchDark />
                    </button>
                  </form>

                  <Link
                    to="/account"
                    className="items-center mr-2 relative hover:border-white p-2 "
                    aria-expanded="false"
                    aria-label="Account"
                  >
                    <IconAccountDark />
                  </Link>
                  <button
                    onClick={openCart}
                    className="hidden lg:flex items-center p-2"
                  >
                    <span className="">
                      <IconBagDark />
                    </span>
                    <CartBadge />
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

function CartBadge(isHome, isJournal) {
  const {totalQuantity} = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div className="text-white bg-black right-[5px] top-[32px] p-[10px] absolute text-[0.8rem] font-semibold subpixel-antialiased h-4 w-4 flex items-center justify-center leading-none text-center rounded-full mx-auto">
      <span>{totalQuantity}</span>
    </div>
  );
}

function IconAccount() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <title>Account</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}

function IconAccountDark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="black"
      className="w-6 h-6"
    >
      <title>Account</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}

function IconBag() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <title>Shopping Bag</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
}

function IconBagDark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="black"
      className="w-6 h-6"
    >
      <title>Shopping Bag</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <title>Search</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}

function IconSearchDark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="black"
      className="w-6 h-6"
    >
      <title>Search</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}
