import {useState, useMemo} from 'react';

import {Text, Button} from '~/components/elements';
import {Modal} from '../index';
import {AccountAddressEdit, AccountDeleteAddress} from '../index';

export function AccountAddressBook({addresses, defaultAddress}) {
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingAddress, setDeletingAddress] = useState(null);

  const {fullDefaultAddress, addressesWithoutDefault} = useMemo(() => {
    const defaultAddressIndex = addresses.findIndex(
      (address) => address.id === defaultAddress,
    );
    return {
      addressesWithoutDefault: [
        ...addresses.slice(0, defaultAddressIndex),
        ...addresses.slice(defaultAddressIndex + 1, addresses.length),
      ],
      fullDefaultAddress: addresses[defaultAddressIndex],
    };
  }, [addresses, defaultAddress]);

  function close() {
    setEditingAddress(null);
    setDeletingAddress(null);
  }

  function editAddress(address) {
    setEditingAddress(address);
  }

  return (
    <>
      {deletingAddress ? (
        <Modal close={close}>
          <AccountDeleteAddress addressId={deletingAddress} close={close} />
        </Modal>
      ) : null}
      {editingAddress ? (
        <Modal close={close}>
          <AccountAddressEdit
            address={editingAddress}
            defaultAddress={fullDefaultAddress === editingAddress}
            close={close}
          />
        </Modal>
      ) : null}
      <div className="grid w-full gap-4 p-4 py-6 ">
        <h3 className="title title__md-semibold">Address Book</h3>
        <button
          className="text text__md underline text-left"
          onClick={() => {
            editAddress({
              /** empty address */
            });
          }}
        >
          Add an Address
        </button>
        <div>
          {!addresses?.length ? (
            <Text className="mb-1 text text__md" as="p">
              You haven&apos;t saved any addresses yet.
            </Text>
          ) : null}

          {addresses?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {fullDefaultAddress ? (
                <Address
                  address={fullDefaultAddress}
                  defaultAddress
                  setDeletingAddress={setDeletingAddress.bind(
                    null,
                    fullDefaultAddress.originalId,
                  )}
                  editAddress={editAddress}
                />
              ) : null}
              {addressesWithoutDefault.map((address) => (
                <Address
                  key={address.id}
                  address={address}
                  setDeletingAddress={setDeletingAddress.bind(
                    null,
                    address.originalId,
                  )}
                  editAddress={editAddress}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

function Address({address, defaultAddress, editAddress, setDeletingAddress}) {
  return (
    <div className="lg:p-8 p-6 border border-gray-200  flex flex-col">
      {defaultAddress ? (
        <div className="mb-3 flex flex-row">
          <span className="text text__sm">Default</span>
        </div>
      ) : null}
      <ul className="flex-1 flex-row text text__md">
        {address.firstName || address.lastName ? (
          <li>
            {(address.firstName && address.firstName + ' ') + address.lastName}
          </li>
        ) : (
          <></>
        )}
        {address.formatted ? (
          address.formatted.map((line) => <li key={line}>{line}</li>)
        ) : (
          <></>
        )}
      </ul>

      <div className="flex flex-row font-medium mt-6">
        <button
          onClick={() => {
            editAddress(address);
          }}
          className="text-left underline text text__sm"
        >
          Edit
        </button>
        <button
          onClick={setDeletingAddress}
          className="text-left text-primary/50 ml-6 text text__sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
