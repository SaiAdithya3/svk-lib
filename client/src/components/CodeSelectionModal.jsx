// components/CodeSelectionModal.jsx
import React, { useState } from 'react';

const CodeSelectionModal = ({ book, onClose, onSelectCode }) => {
  const [selectedCode, setSelectedCode] = useState('');

  const handleCodeChange = (e) => {
    setSelectedCode(e.target.value);
  };

  const handleConfirm = () => {
    onSelectCode(selectedCode);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">
          Select Copy Code for {book.title}
        </h2>
        <div>
          <ul className="space-y-2 select-none">
            {book.copies.map((copy) => (
              <li key={copy.code} className={`border p-2 rounded-md flex gap-4 relative ${copy.status === 'borrowed' ? 'bg-gray-200' : ''}`}>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="copyCode"
                    value={copy.code}
                    checked={selectedCode === copy.code}
                    onChange={handleCodeChange}
                    className="mr-2"
                    disabled={copy.status === 'borrowed'}
                  />
                  {copy.code}
                </label>
                {copy.status === 'available' && (
                  <div>                  
                    {/* <span className="text-sm text-green-500">– Available</span> */}
                    <span className='size-2 bg-green-500 rounded-full absolute right-1 top-1 ring-green-200 ring-2'></span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeSelectionModal;
