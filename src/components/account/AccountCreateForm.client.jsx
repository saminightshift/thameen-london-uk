import {useState} from 'react';
import {useNavigate, Link} from '@shopify/hydrogen/client';

import {emailValidation, passwordValidation} from '~/lib/utils';

import {callLoginApi} from './AccountLoginForm.client';
import {getInputStyleClasses} from '../../lib/styleUtils';

export function AccountCreateForm() {
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();

    setEmailError(null);
    setPasswordError(null);
    setSubmitError(null);

    const newEmailError = emailValidation(event.currentTarget.email);
    if (newEmailError) {
      setEmailError(newEmailError);
    }

    const newPasswordError = passwordValidation(event.currentTarget.password);
    if (newPasswordError) {
      setPasswordError(newPasswordError);
    }

    if (newEmailError || newPasswordError) {
      return;
    }

    const accountCreateResponse = await callAccountCreateApi({
      email,
      password,
    });

    if (accountCreateResponse.error) {
      setSubmitError(accountCreateResponse.error);
      return;
    }

    // this can be avoided if customerCreate mutation returns customerAccessToken
    await callLoginApi({
      email,
      password,
    });

    navigate('/account');
  }

  return (
    <div className="flex justify-center my-24 px-4">
      <div className="max-w-md w-full">
        <h1 className="title title__lg-semibold">Create an Account</h1>
        <form noValidate className="pt-6 pb-8 mt-4 mb-4" onSubmit={onSubmit}>
          {submitError && (
            <div
              className="flex items-center justify-center mb-6 bg-gray-200"
              role="alert"
            >
              <svg
                className="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
              </svg>
              <p className="m-4 text text__sm">{submitError}</p>
            </div>
          )}
          <div className="mb-3">
            <input
              className={`mb-1 ${getInputStyleClasses(emailError)}`}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              aria-label="Email address"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            {!emailError ? (
              ''
            ) : (
              <p className={`text-red-500 text-xs`}>{emailError} &nbsp;</p>
            )}
          </div>
          <div className="mb-3">
            <input
              className={`mb-1 ${getInputStyleClasses(passwordError)}`}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              aria-label="Password"
              value={password}
              minLength={8}
              required
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {!passwordError ? (
              ''
            ) : (
              <p className={`text-red-500 text-xs`}>{passwordError} &nbsp;</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button className="btn lg-btn-solid-100" type="submit">
              Create Account
            </button>
          </div>
          <div className="flex items-center mt-6">
            <p className="align-baseline text text__md">
              Already have an account? &nbsp;
              <Link className="inline underline" to="/account">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function callAccountCreateApi({
  email,
  password,
  firstName,
  lastName,
}) {
  try {
    const res = await fetch(`/account/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password, firstName, lastName}),
    });
    if (res.status === 200) {
      return {};
    } else {
      return res.json();
    }
  } catch (error) {
    return {
      error: error.toString(),
    };
  }
}
