import {Fragment, useState, useEffect} from 'react';
import {Link, useUrl, useCart, Image} from '@shopify/hydrogen';
import {useWindowScroll} from 'react-use';
import gsap, {TweenMax} from 'gsap';
import {Popover, Transition} from '@headlessui/react';
import {
  Bars3Icon,
  BookmarkSquareIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ComputerDesktopIcon,
  CursorArrowRaysIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  NewspaperIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Input} from '~/components';

import {CartDrawer} from './CartDrawer.client';
import {MenuDrawer} from './MenuDrawer.client';
import {useDrawer} from './Drawer.client';

import {NewsFlashBanner} from '../newsflash/NewsFlashBanner';

/**
 * A client component that specifies the content of the header on the website
 */
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

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      <DesktopHeader
        countryCode={countryCode}
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
      />
    </>
  );
}

const solutions = [
  {
    name: 'Analytics',
    description:
      'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: null,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Security',
    description: "Your customers' data will be safe and secure.",
    href: '#',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Integrations',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: Squares2X2Icon,
  },
];
const callsToAction = [
  {name: 'Watch Demo', href: '#', icon: PlayIcon},
  {name: 'View All Products', href: '#', icon: CheckCircleIcon},
  {name: 'Contact Sales', href: '#', icon: PhoneIcon},
];
const company = [
  {name: 'About', href: '#', icon: InformationCircleIcon},
  {name: 'Customers', href: '#', icon: BuildingOfficeIcon},
  {name: 'Press', href: '#', icon: NewspaperIcon},
  {name: 'Careers', href: '#', icon: BriefcaseIcon},
  {name: 'Privacy', href: '#', icon: ShieldCheckIcon},
];
const resources = [
  {name: 'Community', href: '#', icon: UserGroupIcon},
  {name: 'Partners', href: '#', icon: GlobeAltIcon},
  {name: 'Guides', href: '#', icon: BookmarkSquareIcon},
  {name: 'Webinars', href: '#', icon: ComputerDesktopIcon},
];
const blogPosts = [
  {
    id: 1,
    name: 'Boost your conversion rate',
    href: '#',
    preview:
      'Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.',
    imageUrl:
      'https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2849&q=80',
  },
  {
    id: 2,
    name: 'How to use search engine optimization to drive traffic to your site',
    href: '#',
    preview:
      'Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.',
    imageUrl:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2300&q=80',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function DesktopHeader({countryCode, isHome, menu, openCart}) {
  const [isOpen, setIsOpen] = useState(false);

  const {y} = useWindowScroll();

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

  const onEnter = ({currentTarget}) => {
    gsap.to(currentTarget, {
      y: 0,
      duration: 0.5,
      ease: 'power4.out',
      opacity: 1,
      stagger: {
        each: 0.1,
        from: 'start',
      },
    });
  };

  const onLeave = ({currentTarget}) => {
    gsap.to(currentTarget, {
      y: 20,
      duration: 0.5,
      ease: 'power4.out',
      opacity: 0,
      stagger: {
        each: 0.1,
        from: 'start',
      },
    });
  };

  // const styles = {
  //   button:
  //     'relative flex items-center justify-center w-8 h-8 focus:ring-primary/5',
  //   container: `${
  //     isHome
  //       ? 'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader'
  //       : 'bg-contrast/80 text-primary'
  //   } ${
  //     y > 50 && !isHome ? 'shadow-lightHeader ' : ''
  //   }hidden h-nav lg:flex items-center sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8`,
  // };

  return (
    <>
      <NewsFlashBanner />
      <div className="container mx-auto flex">
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
    <div className="text-white bg-black absolute bottom-[-2px] right-[-2px] text-[0.625rem] font-medium subpixel-antialiased h-4 w-4 flex items-center justify-center leading-none text-center rounded-full px-[0.125rem] pb-px">
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
