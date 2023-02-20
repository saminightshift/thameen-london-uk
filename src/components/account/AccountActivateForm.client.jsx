import {useState} from 'react';
import {useNavigate} from '@shopify/hydrogen/client';
import {getInputStyleClasses} from '../../lib/styleUtils';

export function AccountActivateForm({id, activationToken}) {
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState(null);

  function passwordValidation(form) {
    setPasswordError(null);
    setPasswordConfirmError(null);

    let hasError = false;

    if (!form.password.validity.valid) {
      hasError = true;
      setPasswordError(
        form.password.validity.valueMissing
          ? 'Please enter a password'
          : 'Passwords must be at least 6 characters',
      );
    }

    if (!form.passwordConfirm.validity.valid) {
      hasError = true;
      setPasswordConfirmError(
        form.password.validity.valueMissing
          ? 'Please re-enter a password'
          : 'Passwords must be at least 6 characters',
      );
    }

    if (password !== passwordConfirm) {
      hasError = true;
      setPasswordConfirmError('The two passwords entered did not match.');
    }

    return hasError;
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (passwordValidation(event.currentTarget)) {
      return;
    }

    const response = await callActivateApi({
      id,
      activationToken,
      password,
    });

    if (response.error) {
      setSubmitError(response.error);
      return;
    }

    navigate('/account');
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="title title__lg-semibold">Activate Account.</h1>
        <p className="mt-4 text text__md">
          Create your password to activate your account.
        </p>
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
          <div className="mb-4">
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
            <p
              className={`text-red-500 text-xs ${
                !passwordError ? 'invisible' : ''
              }`}
            >
              {passwordError} &nbsp;
            </p>
          </div>
          <div className="mb-4">
            <input
              className={`mb-1 ${getInputStyleClasses(passwordConfirmError)}`}
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              autoComplete="current-password"
              placeholder="Re-enter password"
              aria-label="Re-enter password"
              value={passwordConfirm}
              required
              minLength={8}
              onChange={(event) => {
                setPasswordConfirm(event.target.value);
              }}
            />
            <p
              className={`text-red-500 text-xs ${
                !passwordConfirmError ? 'invisible' : ''
              }`}
            >
              {passwordConfirmError} &nbsp;
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button className="btn lg-btn-solid-100" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

async function callActivateApi({id, activationToken, password}) {
  try {
    const res = await fetch(`/account/activate`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, activationToken, password}),
    });
    if (res.ok) {
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
