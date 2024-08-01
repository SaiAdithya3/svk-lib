import React from 'react';

const ConfirmReturnModal = ({ book, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Confirm Return</h2>
        <p>Are you sure you want to return this book?</p>
        <p className="mt-2">Title: {book?.bookId?.[0]?.title}</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmReturnModal;
