import {Drawer} from './Drawer.client';
import {Link} from '@shopify/hydrogen';
import {Listbox, Transition} from '@headlessui/react';
import {v4 as uuid} from 'uuid';
import BrandLogo from '../brand/BrandLogo';

export function MenuDrawer({isOpen, onClose, menu}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left">
      <div className="flex">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({menu, onClose}) {
  return (
    <nav className="flex flex-col gap-2 p-2 sm:gap-6 sm:px-12 sm:py-8 justify-center relative top-0 mx-auto w-full">
      <div className="w-48 mx-auto">
        <BrandLogo />
      </div>
      <div className="flex flex-col h-screen overflow-y-auto overflow-hidden mt-10 space-y-6">
        {/* Top level menu items */}
        {(menu?.items).map((item) => (
          <Listbox key={uuid()}>
            {({open}) => (
              <div className="text-center">
                <Listbox.Button>
                  {/* Check if items have children */}
                  {(item?.items || []).length > 0 ? (
                    <span className="uppercase tracking-wider font-semibold">
                      {item.title}
                    </span>
                  ) : (
                    <Link to={item.to} target={item.target} onClick={onClose}>
                      <span className="uppercase tracking-wider font-semibold">
                        {item.title}
                      </span>
                    </Link>
                  )}
                </Listbox.Button>
                <Transition
                  show={open}
                  enter="transform transition ease-in-out duration-700"
                  enterFrom="translate-y-0 opacity-0"
                  enterTo="translate-y-1 opacity-100"
                  leave="transform transition ease-in-out duration-700"
                  leaveFrom="translate-y-1 opacity-100"
                  leaveTo="translate-y-0 opacity-0"
                >
                  <Listbox.Options className="text-center mb-4 flex flex-col gap-2 justify-center relative top-0 mx-auto ">
                    <>
                      {(item?.items || []).map((subItem) => (
                        <div id={uuid()}>
                          {subItem.title === 'All Fragrances' ? (
                            <li className="hidden h-0" />
                          ) : (
                            <Link
                              to={subItem.to}
                              target={subItem.target}
                              onClick={onClose}
                            >
                              <span className="uppercase tracking-wider text-xs">
                                {subItem.title}
                              </span>
                            </Link>
                          )}
                        </div>
                      ))}
                    </>
                  </Listbox.Options>
                </Transition>
              </div>
            )}
          </Listbox>
        ))}
      </div>
    </nav>
  );
}
