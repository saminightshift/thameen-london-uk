import {useState} from 'react';
import {Input} from '~/components';
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';

export function SearchInput({searchTerm}) {
  return (
    <>
      <form className="relative flex w-full text-heading">
        <Input
          defaultValue={searchTerm}
          placeholder="Search…"
          type="search"
          variant="search"
          name="q"
        />
        <button className="absolute right-0 py-2" type="submit">
          <MagnifyingGlassIcon className="w-10 h-10" />
        </button>
      </form>
    </>
  );
}

export function NoResultsPopup() {
  const [showPopup, setShowPopup] = useState(true);
  return (
    <>
      {!showPopup && (
        <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" />
          <Dialog.Panel>
            <Dialog.Title>Oops!</Dialog.Title>
            <Dialog.Description>
              <p className="text-heading">No results found</p>
            </Dialog.Description>
            <button type="button">Close</button>
          </Dialog.Panel>
        </Dialog>
      )}
    </>
  );
}
