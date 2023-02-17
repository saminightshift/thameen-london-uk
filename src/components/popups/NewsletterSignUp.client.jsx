import React, {useEffect, useState, Fragment, useRef} from 'react';
import {Dialog, Transition} from '@headlessui/react';

import {Encryptor} from '../../lib/utils';
import {XMarkIcon} from '@heroicons/react/24/outline';

export function NewsletterSignUpPopup(isLoggedIn) {
  const [showPopup, setShowPopup] = useState(false);

  // only show popup if user is not logged in or if its the first time they visit the site (no cookie) after 5 seconds
  useEffect(() => {
    if (isLoggedIn?.data === false) {
      setTimeout(() => {
        setShowPopup(true);
      }, 5000);
    }
  }, []);

  // const formBtn = document.querySelector('[]');

  const emailRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current?.value;

    const data = {
      g: 'YkFEJV',
      email: email ?? '',
      $source: 'Website',
    };
    const urlData = new URLSearchParams(data);
    fetch(`https://manage.kmail-lists.com/ajax/subscriptions/subscribe`, {
      method: 'POST',
      body: urlData,
    });
  };

  return (
    <Transition.Root show={showPopup} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShowPopup}>
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-overlay" />

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="modal_newsletter">
                  <div>
                    <div className="flex justify-between">
                      <div className="font-semibold text-base leading-6 super-tracking">
                        ENJOY 10% OFF YOUR FIRST ORDER
                      </div>
                      <button
                        className="form-close"
                        onClick={() => setShowPopup(false)}
                      >
                        <IconX className="flex align-middle" />
                      </button>
                    </div>
                    <div className="mt-5">
                      <span className="form__p">
                        Sign up to the Thameen newsletter and receive a personal
                        discount code saving you 10% off your next purchase.
                      </span>
                    </div>
                    <div className="klaviyo-form-YkFEJV forms"></div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}

function IconX() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 4L4 16"
        stroke="black"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4 4L16 16"
        stroke="black"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/*

<form
  action="https://manage.kmail-lists.com/ajax/subscriptions/subscribe/YkFEJV"
  method="POST"
  id="kmail-subscribe-form-YkFEJV"
  className="k-form k-form-embed forms"
  onSubmit={handleSubmit}
>
  <div className="k-form-fields">
    <div className="k-field k-field-email">
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="minimal-input"
        required
        ref={emailRef}
      />
    </div>
    <div className="k-field k-field-submit">
      <button
        className="primary-submit mt-5"
        type="submit"
        onSubmit={handleSubmit}
      >
        SEND 10% DISCOUNT CODE
      </button>
    </div>
  </div>
</form>;


*/
