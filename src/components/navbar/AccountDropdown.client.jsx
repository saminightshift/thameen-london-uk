import React from 'react';
import {Link} from '@shopify/hydrogen';

/* Revisit this after go live */

export function AccountDropdown({isHome, isJournal, userLoggedIn}) {
  const AccountStatus = () => {
    if (userLoggedIn === true) {
      return (
        <>
          <Link className="px-5 py-3 hover:bg-gray-200" to="/account/login">
            My Account
          </Link>
          <Link className="px-5 py-3 hover:bg-gray-200" to="/account/logout">
            Logout
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link className="px-5 py-3 hover:bg-gray-200" to="/account/login">
            Sign In
          </Link>
          <Link className="px-5 py-3 hover:bg-gray-200" to="/account/register">
            Create Account
          </Link>
        </>
      );
    }
  };

  return (
    <>
      <button className="peer px-5 py-2">
        {isHome || isJournal ? <IconAccount /> : <IconAccountDark />}
      </button>
      <div className="hidden peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg">
        <AccountStatus />
      </div>
    </>
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
