import React, {useState, Fragment} from 'react';
import {Listbox} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {CheckIcon} from '@heroicons/react/24/outline';
import {Link} from '@shopify/hydrogen';

export default function CountrySelection() {
  const countries = [
    {
      id: 1,
      name: 'United Kingdom (£)',
      code: 'gb',
      url: '/',
    },
    {
      id: 2,
      name: 'United States ($)',
      code: 'us',
      url: 'https://us.thameenlondon.com',
    },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  return (
    <div className="flex flex-col">
      <Listbox value={selectedCountry} onChange={setSelectedCountry}>
        <Listbox.Button className="text-left text-sm tracking-wider">
          <span className="uppercase font-semibold text-sm tracking-wider">
            Shipping to <ChevronDownIcon className="inline-block w-4 h-4" />
          </span>
          {/* @ts-ignore */}
          {({open}) => (
            <span className={`${open ? 'hidden' : 'block'} mt-2`}>
              {selectedCountry.name}
            </span>
          )}
        </Listbox.Button>
        <Listbox.Options>
          {countries.map((country) => (
            <Listbox.Option key={country.id} value={country} as={Fragment}>
              {({selected}) => (
                <li className="py-2 text-sm tracking-wider hover:bg-gray-300">
                  {selected && (
                    <>
                      <a href={country.url} target="_self">
                        {country.name}
                      </a>
                      <CheckIcon className="w-4 h-4 inline text-white lg:text-black ml-2" />
                    </>
                  )}
                  {!selected && (
                    <a href={country.url} target="_self">
                      {country.name}
                    </a>
                  )}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
