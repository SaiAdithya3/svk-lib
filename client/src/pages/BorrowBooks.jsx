import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Disc2, LoaderPinwheel, Search } from 'lucide-react';
import { toast } from 'sonner';
import BookModal from '../components/BookModal';
import { searchBooks } from '../services/services';

const BorrowBooks = () => {
  const [searchText, setSearchText] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [studentDetails, setStudentDetails] = useState({ name: '', id: '' });
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [viewBook, setViewBook] = useState(null);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchBooks = async (query) => {
    setLoading(true);
    try {
      const response = await searchBooks(query);
      setBooks(response.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchText(query);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    setDebounceTimeout(
      setTimeout(() => {
        fetchBooks(query);
      }, 2000)
    );
  };

  const handleBorrow = () => {
    if (selectedBooks.length === 0) {
      toast.error('Please select at least one book to borrow.');
      return;
    }
    if (selectedBooks.length > 5) {
      toast.error('You cannot borrow more than 5 books at a time.');
      return;
    }
    setIsBorrowing(true);
  };
  

  const handleConfirmBorrow = () => {
    toast.success(`Books borrowed by ${studentDetails.name} (ID: ${studentDetails.id})`);
    setSelectedBooks([]);
    setStudentDetails({ name: '', id: '' });
    setIsBorrowing(false);
  };

  const handleSelectBook = (book) => {
    if (selectedBooks.includes(book)) {
      setSelectedBooks(selectedBooks.filter((b) => b !== book));
    } else {
      if (selectedBooks.length < 5) {
        setSelectedBooks([...selectedBooks, book]);
      } else {
        toast.error('You can only select up to 5 books.');
      }
    }
  };


  const handleRemoveBook = (book) => {
    setSelectedBooks(selectedBooks.filter((b) => b !== book));
  };

  return (
    <div className="w-full py-6 flex flex-col px-6 items-center relative">
      <h1 className="text-2xl px-3 text-start w-full font-bold text-gray-800 mb-4">Borrow Books</h1>
      <div className="w-full px-3 flex mb-4 justify-between">
        <div className="w-2/3 px-4 flex bg-zinc-100 items-center gap-2 border border-gray-300 rounded-lg">
          <Search className='' />
          <input
            type="text"
            className="px py-2 popp rounded-lg bg-zinc-100 w-full focus:outline-none"
            placeholder="Search by title or ISBN"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
        <button
          className="px-8 py-2 bg-zinc-900 shadow flex items-center gap-3 text-white rounded-lg"
          onClick={handleBorrow}
        >
          Borrow
          <Disc2 className='size-5' />
        </button>
      </div>

      {loading ? (
        <div className="w-full flex items-center justify-center py-6">
          <LoaderPinwheel className="w-10 h-10 text-gray-600 animate-spin" />
        </div>
      ) : books.length === 0 ? (
        <div className="w-full flex items-center justify-center py-6">
          <p className="text-gray-600">No books found matching your criteria.</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className='popp'>
                <th className="px-3 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Select</th>
                <th className="px-3 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">S.No</th>
                <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">ISBN</th>
                <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Title</th>
                <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Author</th>
                <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Count</th>
                <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 popp cursor-pointer ${selectedBooks.includes(book) ? 'bg-gray-200' : ''}`}
                  onClick={() => handleSelectBook(book)}
                >
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedBooks.includes(book)}
                      onChange={() => handleSelectBook(book)}
                    />
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.bookid}</td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.isbn}</td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.title}</td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.author}</td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.availableCount} / {book.totalCount}</td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">
                    <button
                      className="px-3 py-1 bg-zinc-700 text-white rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewBook(book);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isBorrowing && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full">
            <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Student Details</h2>
              <button
                className="text-red-700 font-semibold bg-red-200 px-2 rounded-lg hover:text-red-800"
                onClick={() => setIsBorrowing(false)}
              >
                Close
              </button>
            </div>
            <div className="px-4 py-3 flex flex-col gap-2">
              <input
                type="text"
                className="px-4 py-2 border font popp border-gray-300 rounded-lg"
                placeholder="Student Name"
                value={studentDetails.name}
                onChange={(e) => setStudentDetails({ ...studentDetails, name: e.target.value })}
              />
              <input
                type="text"
                className="px-4 py-2 popp border font border-gray-300 rounded-lg"
                placeholder="Student ID"
                value={studentDetails.id}
                onChange={(e) => setStudentDetails({ ...studentDetails, id: e.target.value })}
              />
              <div className="w-full flex flex-col">
                <h1 className='text-md font-semibold px-2 py-2'>Review books</h1>
                {selectedBooks && selectedBooks.map((book) => (
                  <p className='px-2 py-1 popp' key={book.isbn}>
                    &rArr; {book.title} ({book.author})
                  </p>
                ))}
              </div>
              <button
                className="mt-4 px-4 py-2 bg-zinc-800 shadow text-white rounded-lg"
                onClick={handleConfirmBorrow}
              >
                Confirm Borrow
              </button>
            </div>
          </div>
        </div>
      )}

      {viewBook && (
        <BookModal book={viewBook} onClose={() => setViewBook(null)} />
      )}

      {/* Floating Card */}
      <div className="fixed bottom-4 right-4 bg-white border z-0 border-gray-200 shadow-lg rounded-lg p-4 ">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Selected Books</h3>
        {selectedBooks.length === 0 ? (
          <p className="text-gray-600">No books selected.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {selectedBooks.map((book) => (
              <li key={book.isbn} className="border-b py-1 text-sm flex justify-between items-center">
                {book.title} ({book.author})
                <button
                  className="ml-2 px-2 py-1 bg-red-600 text-white rounded-lg text-xs"
                  onClick={() => handleRemoveBook(book)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BorrowBooks;
