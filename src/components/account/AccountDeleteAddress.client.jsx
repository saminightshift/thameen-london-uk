import {Text, Button} from '~/components/elements';
import {useRenderServerComponents} from '~/lib/utils';

export function AccountDeleteAddress({addressId, close}) {
  // Necessary for edits to show up on the main page
  const renderServerComponents = useRenderServerComponents();

  async function deleteAddress(id) {
    const response = await callDeleteAddressApi(id);
    if (response.error) {
      alert(response.error);
      return;
    }
    renderServerComponents();
    close();
  }

  return (
    <>
      <Text className="mb-4 title title__md-semibold" as="h3" size="lead">
        Confirm removal
      </Text>
      <Text as="p" className="text text__md">
        Are you sure you wish to remove this address?
      </Text>
      <div className="mt-6">
        <button
          className="btn lg-btn-solid"
          onClick={() => {
            deleteAddress(addressId);
          }}
        >
          Confirm
        </button>
        <button className="btn lg-btn-outline mt-2" onClick={close}>
          Cancel
        </button>
      </div>
    </>
  );
}

export async function callDeleteAddressApi(id) {
  try {
    const res = await fetch(`/account/address/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    });
    if (res.ok) {
      return {};
    } else {
      return res.json();
    }
  } catch (_e) {
    return {
      error: 'Error removing address. Please try again.',
    };
  }
}
