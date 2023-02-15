import React, {useState, Fragment, useEffect} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';

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

  const rotateChevron = () => {
    const chevron = document.querySelector('.chevron');
    chevron.classList.toggle('rotate-180');
  };

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  return (
    <>
      <div className="flex flex-col">
        <Listbox value={selectedCountry} onChange={setSelectedCountry}>
          <Listbox.Button className="text-left text-sm tracking-wider">
            <span className="footer-heading">Shipping to</span>
            <div className="flex space-x-8 mt-1" onClick={rotateChevron}>
              <span className="text-sm">{selectedCountry.name}</span>
              <ChevronDownIcon className="chevron w-4 h-4 transition-transform transform-gpu duration-400" />
            </div>
          </Listbox.Button>
          <Listbox.Options>
            {countries.map((country) => (
              <Listbox.Option
                key={country.id}
                value={country}
                as={Fragment}
                className="my-2"
              >
                {({selected}) => (
                  <li>
                    {selected ? (
                      <></>
                    ) : (
                      <a className="text-sm" href={country.url} target="_self">
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
    </>
  );
}
