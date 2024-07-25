import React from 'react';

const BookModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 backdrop-blur-sm bg-opacity-75">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full">
        <div className="bg-zinc-100 px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">{book.title}</h2>
          <button
            className="text-red-700 font-semibold bg-red-200 px-2 rounded-lg hover:text-red-800"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="px-4 py-3 flex flex-col gap-2">
          <div className="w-full flex justify-center">
            <img src={book.image} alt={book.title} className="w-1/2 object-cover mb-4" />
          </div>
          <p className="text-md text-gray-700"><strong>Author:</strong> {book.author}</p>
          <p className="text-md text-gray-700"><strong>ISBN:</strong> {book.isbn}</p>
          <p className="text-md text-gray-700"><strong>Location:</strong> {book.location}</p>
          <p className="text-md text-gray-700"><strong>Description:</strong> {book.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
