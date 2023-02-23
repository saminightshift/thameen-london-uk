import React, {useEffect} from 'react';
import {Link, useCart, useUrl} from '@shopify/hydrogen';
import {navigationPanelEffects} from '../../lib/hooks';

export function DesktopNavigation({openCart, countryCode}) {
  const {pathname} = useUrl();
  const isHome = pathname === `/`;
  const isJournal = pathname === `/journal`;

  navigationPanelEffects();

  const closeOnClick = () => {
    useEffect(() => {
      const targets = document.querySelectorAll('[data-source="list"]');
      const megaMenu = document.getElementById('mega-menu');
      targets.classList.add('hidden');
      megaMenu.style.animation = 'slide-up 4s ease-in-out';
      megaMenu.style.top = '-25rem';
      megaMenu.style.animationDuration = '1s';
    }, []);
  };

  return (
    <div className="dektop-nav">
      <div className="group">
        <div
          className={`${
            isHome || isJournal ? 'text-white' : 'text-black'
          } group-hover:text-black  relative w-screen flex justify-start items-center bg-transparent z-100 px-6 module__nav`}
          data-target="flyout-panel"
        >
          <div
            id="flyout-panel"
            className="absolute -top-40 left-0 w-full h-[78px] overflow-hidden -z-10 duration-700 origin-top bg-white"
          ></div>
          <div
            className="px-3 md:px-10 text-2xl text-white"
            data-source="svg-img"
          >
            <Link to="/">
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
            </Link>
          </div>
          <div
            className="flex top-0 justify-between mx-auto w-full navbar-block"
            data-target="mega-menu"
          >
            <div className="group mx-auto">
              <button
                className="group-hover:text-black nav-items fragrance-tab"
                data-target="fragrances"
              >
                <span className="text text__md-semibold uppercase nav-link">
                  Fragrances
                </span>
              </button>
              <div
                id="fragrances"
                className="hidden flex-col absolute left-0 py-4 w-full text-black duration-300"
                data-source="list"
              >
                <div className="menu-panel-content grid grid-cols-3 mx-auto z-100 fragrance-tab">
                  <div
                    className="flex flex-col col-start-1 col-span-1"
                    id="frag-col-1"
                  >
                    <Link
                      to="/products"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      All Fragrances
                    </Link>
                    <Link
                      to="/products/amber-room-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Amber Room
                    </Link>
                    <Link
                      to="products/blue-heart-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Blue Heart
                    </Link>
                    <Link
                      to="/products/carved-oud-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Carved Oud
                    </Link>
                    <Link
                      to="/products/cullinan-diamond-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Cullinan Diamond
                    </Link>
                    <Link
                      to="/products/diadem-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Diadem
                    </Link>
                    <Link
                      to="/products/fanfare-100ml-cologne-elixir"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Fanfare
                    </Link>
                    <Link
                      to="/products/green-pearl-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Green Pearl
                    </Link>
                    <Link
                      to="/products/imperial-crown-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Imperial Crown
                    </Link>
                  </div>

                  <div
                    className="flex flex-col col-start-2 col-span-1"
                    id="frag-col-2"
                  >
                    <Link
                      to="/products/insignia-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Insignia
                    </Link>
                    <Link
                      to="/products/noorolain-taif-50ml-extrait-de-parfum-1"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Noorolain Taif
                    </Link>
                    <Link
                      to="/products/patiala-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Patiala
                    </Link>
                    <Link
                      to="/products/peacock-throne-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Peacock Throne
                    </Link>
                    <Link
                      to="/products/peregrina-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Peregrina
                    </Link>
                    <Link
                      to="/products/regal-musk-10ml-extrait-dhuile-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Regal Musk
                    </Link>
                    <Link
                      to="/products/regal-oud-10ml-extrait-dhuile-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Regal Oud
                    </Link>
                    <Link
                      to="/products/regal-rose-10ml-extrait-dhuile-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Regal Rose
                    </Link>
                    <Link
                      to="/products/regent-leather-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Regent Leather
                    </Link>
                  </div>

                  <div className="flex flex-col col-start-3 col-span-1 last-frag-col">
                    <Link
                      to="/products/riviere-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Rivière
                    </Link>
                    <Link
                      to="/products/royal-sapphire-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Royal Sapphire
                    </Link>
                    <Link
                      to="/products/sceptre-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Sceptre
                    </Link>
                    <Link
                      to="/products/sparkling-opal-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Sparkling Opal
                    </Link>
                    <Link
                      to="/products/the-cora-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      The Cora
                    </Link>
                    <Link
                      to="/products/the-hope-50ml-extrait-de-parfume"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      The Hope
                    </Link>
                    <Link
                      to="/products/the-rose-50ml-extrait-de-parfum"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      The Rose
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="group mx-auto">
              <button
                className="group-hover:text-black nav-items collections-tab"
                data-target="collections"
              >
                <span className="text text__md-semibold uppercase nav-link">
                  Collections
                </span>
              </button>
              <div
                className="hidden flex-col absolute left-0 py-4 w-full text-black duration-300"
                id="collections"
                data-source="list"
              >
                <div className="menu-panel-content collections grid grid-cols-1 z-100 mx-auto collections-tab">
                  <div className="flex flex-col col-start-1 col-span-1">
                    <Link
                      to="/collections/britologne-collection"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Britologne Collection
                    </Link>
                    <Link
                      to="/collections/regal-collection"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Regal Collection
                    </Link>
                    <Link
                      to="/collections/treasure-collection"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Treasure Collection
                    </Link>
                    <Link
                      to="/collections/sovereign-collection"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Sovereign Collection
                    </Link>
                    <Link
                      to="/collections/exclusives"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Exclusives
                    </Link>
                    <Link
                      to="/collections/hair-fragrances"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Hair Collection
                    </Link>
                    <Link
                      to="/collections/baby-collection"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Baby Collection
                    </Link>
                    <Link
                      to="/collections/body-collection"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Body Collection
                    </Link>
                    <Link
                      to="/collections/home-fragrance"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Home Collection
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="group mx-auto">
              <button
                className="group-hover:text-black nav-items gifting-tab"
                data-target="gifting"
              >
                <span className="text text__md-semibold uppercase nav-link">
                  Gifting
                </span>
              </button>
              <div
                className="hidden flex-col absolute left-0 py-4 w-full text-black duration-300"
                id="gifting"
                data-source="list"
              >
                <div
                  className="menu-panel-content gifting grid grid-cols-1 z-100 mx-auto gifting-tab"
                  id="gift-panel"
                >
                  <div className="flex flex-col col-start-1 col-span-1 ">
                    <Link
                      to="/collections/essential-sets"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Essential Sets
                    </Link>
                    <Link
                      to="/collections/hair-fragrance-gift-sets"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Hair Fragrance Gift Sets
                    </Link>
                    <Link
                      to="/collections/body-lotion-gift-sets"
                      className="text-black"
                      onClick={closeOnClick}
                    >
                      Body Lotion Gift Sets
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="group-hover:text-black nav-items"
              id="journal_link"
              data-target="journal"
            >
              <span className="text text__md-semibold uppercase nav-link">
                Journal
              </span>
            </button>
            <div
              id="mega-menu"
              className="absolute -top-[25rem] left-0 w-full h-[382px] overflow-hidden -z-10 duration-700 origin-top bg-white"
            ></div>
          </div>
          {isHome || isJournal ? (
            <div className="hidden lg:flex justify-end" id="nav_icons">
              <form action={`/${countryCode ? countryCode + '/' : ''}search`}>
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
            <div className="hidden lg:flex justify-end" id="nav_icons">
              <form action={`/${countryCode ? countryCode + '/' : ''}search`}>
                <button
                  type="submit"
                  className="hidden lg:flex items-center mr-2 p-2"
                >
                  <IconSearchDark />
                </button>
              </form>
              <Link
                to="/account"
                className="items-center mr-2 relative hover:border-white p-2"
                aria-expanded="false"
                aria-label="Account"
              >
                <IconAccountDark />
              </Link>
              <button
                onClick={openCart}
                className="hidden lg:flex items-center p-2"
              >
                <IconBagDark />
                <CartBadge />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CartBadge() {
  const {totalQuantity} = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div className="relative top-1 text-base font-semibold">
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
      data-source="svg-img"
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
      data-source="svg-img"
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
      data-source="svg-img"
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
      data-source="svg-img"
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
      data-source="svg-img"
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
      data-source="svg-img"
    >
      <title>Search</title>
      <circle cx="12" cy="12.5" r="9" stroke="black" strokeWidth="2" />
      <path d="M18 18.5L21.5 22" stroke="black" strokeWidth="2" />
    </svg>
  );
}
