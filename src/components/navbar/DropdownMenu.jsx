import React, {useState} from 'react';

export default function DropdownMenu(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a href="#">{props.children}</a>
      {isOpen && (
        <div className="absolute bg-white top-32 left-0 w-full">
          <a href="#" className="block p-3">
            Menu Item 1
          </a>
          <a href="#" className="block p-3">
            Menu Item 2
          </a>
          <a href="#" className="block p-3">
            Menu Item 3
          </a>
        </div>
      )}
    </div>
  );
}
