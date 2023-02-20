import {useState} from 'react';

import {Text, Button} from '~/components';
import {
  emailValidation,
  passwordValidation,
  useRenderServerComponents,
} from '~/lib/utils';
import {getInputStyleClasses} from '../../lib/styleUtils';

export function AccountDetailsEdit({
  firstName: _firstName = '',
  lastName: _lastName = '',
  phone: _phone = '',
  email: _email = '',
  close,
}) {
  const [saving, setSaving] = useState(false);
  const [firstName, setFirstName] = useState(_firstName);
  const [lastName, setLastName] = useState(_lastName);
  const [phone, setPhone] = useState(_phone);
  const [email, setEmail] = useState(_email);
  const [emailError, setEmailError] = useState(null);
  const [currentPasswordError, setCurrentPasswordError] = useState(null);
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [newPassword2Error, setNewPassword2Error] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // Necessary for edits to show up on the main page
  const renderServerComponents = useRenderServerComponents();

  async function onSubmit(event) {
    event.preventDefault();

    setEmailError(null);
    setCurrentPasswordError(null);
    setNewPasswordError(null);
    setNewPassword2Error(null);

    const emailError = emailValidation(event.currentTarget.email);
    if (emailError) {
      setEmailError(emailError);
    }

    let currentPasswordError, newPasswordError, newPassword2Error;

    // Only validate the password fields if the current password has a value
    if (event.currentTarget.currentPassword.value) {
      currentPasswordError = passwordValidation(
        event.currentTarget.currentPassword,
      );
      if (currentPasswordError) {
        setCurrentPasswordError(currentPasswordError);
      }

      newPasswordError = passwordValidation(event.currentTarget.newPassword);
      if (newPasswordError) {
        setNewPasswordError(newPasswordError);
      }

      newPassword2Error =
        event.currentTarget.newPassword.value !==
        event.currentTarget.newPassword2.value
          ? 'The two passwords entered did not match'
          : null;
      if (newPassword2Error) {
        setNewPassword2Error(newPassword2Error);
      }
    }

    if (
      emailError ||
      currentPasswordError ||
      newPasswordError ||
      newPassword2Error
    ) {
      return;
    }

    setSaving(true);

    const accountUpdateResponse = await callAccountUpdateApi({
      email,
      newPassword: event.currentTarget.newPassword.value,
      currentPassword: event.currentTarget.currentPassword.value,
      phone,
      firstName,
      lastName,
    });

    setSaving(false);

    if (accountUpdateResponse.error) {
      setSubmitError(accountUpdateResponse.error);
      return;
    }

    renderServerComponents();
    close();
  }

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <Text className="mt-4 mb-6 title title__md-semibold " as="h3" size="lead">
        Update your profile
      </Text>
      <form noValidate onSubmit={onSubmit}>
        {submitError && (
          <div className="flex items-center justify-center mb-6 bg-red-100">
            <p className="m-4 text-sm text-red-900">{submitError}</p>
          </div>
        )}
        <div className="mt-3">
          <input
            className={getInputStyleClasses()}
            id="firstname"
            name="firstname"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            aria-label="First name"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </div>
        <div className="mt-3">
          <input
            className={getInputStyleClasses()}
            id="lastname"
            name="lastname"
            type="text"
            autoComplete="family-name"
            placeholder="Last name"
            aria-label="Last name"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </div>
        <div className="mt-3">
          <input
            className={getInputStyleClasses()}
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone number"
            aria-label="Mobile"
            value={phone}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => {
              setShowTooltip(false);
            }}
            onClick={() => setShowTooltip(true)}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          {showTooltip && (
            <div className="absolute z-100 left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-100  shadow-lg">
              <svg
                className="absolute z-10  bottom-[112px] rotate-180 "
                width={16}
                height={10}
                viewBox="0 0 16 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 10L0 0L16 1.41326e-06L8 10Z"
                  fill="rgb(243, 244, 246)"
                />
              </svg>
              <span className="text text__sm">
                Enter a valid phone number with your area code. <br /> E.g. +44
                1234 567890
              </span>
            </div>
          )}
        </div>
        <div className="mt-3">
          <input
            className={getInputStyleClasses(emailError)}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email address"
            aria-label="Email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <p
            className={`text-red-500 text-xs ${!emailError ? 'invisible' : ''}`}
          >
            {emailError} &nbsp;
          </p>
        </div>
        <Text
          className="mb-6 mt-6 title title__md-semibold"
          as="h3"
          size="lead"
        >
          Change your password
        </Text>
        <Password
          name="currentPassword"
          label="Current password"
          passwordError={currentPasswordError}
        />
        <Password
          name="newPassword"
          label="New password"
          passwordError={newPasswordError}
        />
        <Password
          name="newPassword2"
          label="Re-enter new password"
          passwordError={newPassword2Error}
        />
        <Text
          className={`mt-2 text text__sm ${
            currentPasswordError || newPasswordError ? 'text-red-500' : ''
          }`}
        >
          Passwords must be at least 6 characters.
        </Text>
        {newPassword2Error ? <br /> : null}
        <Text
          size="fine"
          className={`mt-1 text-red-500 ${
            newPassword2Error ? '' : 'invisible'
          }`}
        >
          {newPassword2Error} &nbsp;
        </Text>
        <div className="mt-6">
          <button
            className="btn lg-btn-solid mb-2"
            type="submit"
            disabled={saving}
          >
            Save
          </button>
        </div>
        <div className="mb-4">
          <button type="button" className="btn lg-btn-outline" onClick={close}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

function Password({name, passwordError, label}) {
  const [password, setPassword] = useState('');

  return (
    <div className="mt-3">
      <input
        className={getInputStyleClasses(passwordError)}
        id={name}
        name={name}
        type="password"
        autoComplete={
          name === 'currentPassword' ? 'current-password' : undefined
        }
        placeholder={label}
        aria-label={label}
        value={password}
        minLength={8}
        required
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
    </div>
  );
}

export async function callAccountUpdateApi({
  email,
  phone,
  firstName,
  lastName,
  currentPassword,
  newPassword,
}) {
  try {
    const res = await fetch(`/account`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        phone,
        firstName,
        lastName,
        currentPassword,
        newPassword,
      }),
    });
    if (res.ok) {
      return {};
    } else {
      return res.json();
    }
  } catch (_e) {
    return {
      error: 'Error saving account. Please try again.',
    };
  }
}
