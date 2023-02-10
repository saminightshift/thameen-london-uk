import React, {useState} from 'react';
import {Input} from '../index';

export default function SearchInput() {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="relative">
      <button
        className="focus:outline-none"
        onClick={() => setShowInput(!showInput)}
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
      </button>
      {showInput && (
        <div
          className="absolute top-0 right-0 mt-3 p-2 w-full shadow-lg"
          style={{transition: 'all 500ms east-out'}}
        >
          <Input
            className="w-full p-2 bg-transparent border-bottom border-gray-300"
            type="search"
            placeholder="Search"
            name="q"
          />
        </div>
      )}
    </div>
  );
}
