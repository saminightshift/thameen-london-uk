import {Fragment, useState, useRef, useEffect} from 'react';
import {Link, useUrl, useCart, Image} from '@shopify/hydrogen';
import {useWindowScroll} from 'react-use';

import {Popover, Transition, Dialog, Tab} from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {ChevronDownIcon} from '@heroicons/react/24/solid';

import {Input} from '~/components';

import {CartDrawer} from './CartDrawer.client';
import {MenuDrawer} from './MenuDrawer.client';
import {useDrawer} from './Drawer.client';

import {NewsFlashBanner} from '../newsflash/NewsFlashBanner';

export function Header({title, menu}) {
  const {pathname} = useUrl();

  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

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

  console.log(menu);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      <NewsFlashBanner />
      <DesktopHeader
        countryCode={countryCode}
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function DesktopHeader({countryCode, isHome, menu, openCart, openMenu}) {
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

  return (
    <>
      <div
        className={`module__nav bg-transparent text-white flex justify-center px-5 w-full border-b-0 h-[72px] lg:h-auto items-center ${
          !isVisible ? 'fade-out' : 'fade-in'
        }`}
        id="pageHeader"
      >
        <div className="relative max-w-screen-2xl w-full">
          <div className="flex lg:flex-basis justify-between w-full items-center py-3 mx-auto left-0 right-0">
            {/* Desktop Logo */}
            <div className="hidden lg:flex items-center body-mini-semibold uppercase hover:border-b-1">
              <a
                href="/"
                className="mr-4 hidden lg:block"
                aria-label="Thameen London"
              >
                <Logo className="logo-nav" onMouseEnter={isOpen} />
                <span className="sr-only">Thameen London</span>
              </a>
            </div>
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center">
              <a href="/" className="mr-4 block" aria-label="Thameen London">
                <Logo />
              </a>
            </div>

            <div className="justify-between m-auto left-0 right-0 text-center hidden lg:flex">
              <nav className="flex nav-items uppercase font-semibold tracking-widest text-sm">
                {/* Top level menu items */}
                {(menu?.items || []).map((item) => (
                  <Link
                    className="nav-link"
                    key={item.id}
                    to={item.to}
                    target={item.target}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
            {/* Mobile Icons */}
            <div className="flex lg:hidden">
              <button className="relative flex items-center p-2">
                <IconSearch />
              </button>
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
            {/* Desktop Icons */}
            <div className="hidden lg:flex justify-end">
              <button className="hidden lg:flex items-center mr-2 p-2">
                <IconSearch />
              </button>
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
                <CartBadge dark={isHome} />
              </button>
            </div>
          </div>
          <div className="hidden h-full lg:flex">
            {/* Mega menu */}
            <Popover.Group className="ml-8">
              <div className="flex h-full justify-center space-x-8"></div>
            </Popover.Group>
          </div>
        </div>
      </div>
    </>
  );
}

function CartBadge() {
  const {totalQuantity} = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div className="cart-badge text-white bg-black absolute text-[0.8rem] font-semibold subpixel-antialiased h-4 w-4 flex items-center justify-center leading-none text-center rounded-full mx-auto">
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

{
  /* <div className="container mx-auto flex">
  <div className="module__nav flex items-center justify-between w-full">
    <div>
      <Link to="/">
        <Logo className="brand-logo" />
      </Link>
    </div>
    <nav aria-label="main-menu" className="main-menu">
      <ul
        className={`flex items-center ${
          isOpen ? 'text-black bg-white' : 'text-white'
        }}`}
        data-test="main-nav"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <li className="main-menu__item">
          <Link className="nav-link" to="#">
            Fragrances
          </Link>
        </li>
        <li className="main-menu__item">
          <Link className="nav-link" to="#">
            Collections
          </Link>
        </li>
        <li className="main-menu__item">
          <Link className="nav-link" to="#">
            Gifting
          </Link>
        </li>
        <li className="main-menu__item">
          <Link className="nav-link" to="#">
            Journal
          </Link>
        </li>
      </ul>
    </nav>
    <div className={`relative bg-white ${isOpen ? 'block' : 'hidden'}`}>
      <div className="grid grid-cols-3">
        <div className="py-2 px-4">Menu Item 1</div>
        <div className="py-2 px-4">Menu Item 2</div>
        <div className="py-2 px-4">Menu Item 3</div>
      </div>
    </div>
    ;<div className="flex items-center"></div>
  </div>
</div>; */
}
