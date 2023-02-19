import {Fragment, useState, useRef, useEffect} from 'react';
import {Link, useUrl, useCart, Image} from '@shopify/hydrogen';
import {Bars3Icon} from '@heroicons/react/24/outline';

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
          className={`module__nav bg-transparent  flex justify-center px-[1.125rem]  md:px-12 w-full border-b-0 h-[72px] lg:h-auto items-center hoverNav text-black align-middle ${
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
                  <div className="flex items-center">
                    {isHome || isJournal ? (
                      <img
                        src="https://studio.thameenlondon.com/wp-content/uploads/2023/01/thameen_logo.svg"
                        alt="Thameen London"
                        width={284}
                        height={45}
                        className="brand-logo"
                      />
                    ) : (
                      <img
                        src="https://studio.thameenlondon.com/wp-content/uploads/2023/01/thameen_logo.svg"
                        alt="Thameen London"
                        width={284}
                        height={45}
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
                      src="https://studio.thameenlondon.com/wp-content/uploads/2023/01/thameen_logo.svg"
                      alt="Thameen London"
                      width={200}
                      height={100}
                      className="brand-logo"
                    />
                  ) : (
                    <img
                      src="https://studio.thameenlondon.com/wp-content/uploads/2023/01/thameen_logo.svg"
                      alt="Thameen London"
                      width={200}
                      height={100}
                    />
                  )}
                </a>
              </div>

              <div className="justify-between m-auto left-0 right-0 text-center hidden lg:flex">
                {isHome || isJournal ? (
                  <nav className="flex nav-items lg:gap-[4rem] xl:gap-[7rem] uppercase font-semibold text-base z-40">
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
      width="24"
      height="25"
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
      width="24"
      height="25"
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
      width="24"
      height="25"
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
      width="24"
      height="25"
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
      width="24"
      height="25"
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
