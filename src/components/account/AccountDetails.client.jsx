import {Seo} from '@shopify/hydrogen';
import {useState} from 'react';
import {Modal} from '../index';
import {AccountDetailsEdit} from './AccountDetailsEdit.client';

export function AccountDetails({firstName, lastName, phone, email}) {
  const [isEditing, setIsEditing] = useState(false);

  const close = () => setIsEditing(false);

  return (
    <>
      {isEditing ? (
        <Modal close={close}>
          <Seo type="noindex" data={{title: 'Account details'}} />
          <AccountDetailsEdit
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            email={email}
            close={close}
          />
        </Modal>
      ) : null}
      <div className="grid w-full gap-4 p-4 py-6 ">
        <h3 className="title title__md-semibold">Account Details</h3>
        <div className="lg:p-8 p-6 border border-gray-200 rounded">
          <div className="flex">
            <h3 className="title title__sm-semibold flex-1">
              Profile & Security
            </h3>
            <button
              className="underline text-sm font-normal"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>

          <div className="grid grid-cols-2 text text__md mt-4">
            <div className="font-semibold space-y-4">
              <div>Name</div>
              <div>Contact</div>
              <div>Email</div>
              <div>Password</div>
            </div>
            <div className="font-normal space-y-4">
              <div>
                {firstName || lastName
                  ? (firstName ? firstName + ' ' : '') + lastName
                  : 'Add name'}{' '}
              </div>
              <div>{phone ?? 'Add mobile'}</div>
              <div>{email}</div>
              <div>**************</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
