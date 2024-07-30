import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Disc2, Search } from 'lucide-react';
import { unreturnedBooks1 } from '../services/services';
import QrReader from 'modern-react-qr-reader';

const ReturnBooks = () => {
  const [unreturnedBooks, setUnreturnedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isReturning, setIsReturning] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);

  const handleReturn = () => {
    if (!selectedBook) {
      toast.error("Please select a book to return.");
      return;
    }
    setIsReturning(true);
  };

  useEffect(() => {
    const fetchUnreturnedBooks = async () => {
      try {
        const books = await unreturnedBooks1();
        setUnreturnedBooks(books);
      } catch (error) {
        console.error('Error fetching unreturned books:', error);
        toast.error('An error occurred while fetching unreturned books.');
      }
    };

    fetchUnreturnedBooks();
  }, []);

  const handleConfirmReturn = () => {
    if (!selectedBook) return;

    // Here you would typically call an API to update the return status
    toast.success(`Book returned: ${selectedBook.title}`);
    setUnreturnedBooks(unreturnedBooks.filter(book => book !== selectedBook));
    setSelectedBook(null);
    setIsReturning(false);
  };

  const handleQRScan = (data) => {
    if (data) {
      const book = unreturnedBooks.find(book => book.isbn === data);
      if (book) {
        setSelectedBook(book);
        toast.success(`Book found: ${book.title}`);
      } else {
        toast.error("No matching book found for the scanned QR code.");
      }
      setShowQRScanner(false);
    }
  };
  // console.log(unreturnedBooks);

  const handleQRScanError = (error) => {
    console.error(error);
    toast.error("Error scanning QR code. Please try again.");
    setShowQRScanner(false);
  };

  const calculateStatus = (borrowDate) => {
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 14);
    const currentDate = new Date();
    return currentDate > dueDate ? 'Overdue' : 'Before Due';
  };

  const filteredBooks = unreturnedBooks.filter(book => {
    const title = book?.title?.toLowerCase() || '';
    const isbn = book?.isbn?.toLowerCase() || '';
    const searchLower = searchText.toLowerCase();

    return title.includes(searchLower) || isbn.includes(searchLower);
  });

  return (
    <div className="w-full py-6 flex flex-col items-center">
      <div className="w-full px-6 border-b sticky top-14 bg-white/60 backdrop-blur-sm pb-4 z-20 flex flex-col items-center justify-between">
        <h1 className="text-2xl text-start w-full font-bold text-gray-800">Return Books</h1>
        <div className="w-full py-3 gap-3 flex justify-between">
          <div className="w-2/3 px-4 flex bg-zinc-100 items-center gap-2 border border-gray-300 rounded-lg">
            <Search className="text-gray-600" />
            <input
              type="text"
              className="px-2 py-2 rounded-lg bg-zinc-100 w-full focus:outline-none"
              placeholder="Search by title or ISBN"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              className="px-8 py-2 bg-zinc-900 shadow flex items-center gap-3 text-white rounded-lg"
              onClick={handleReturn}
            >
              Return
              <Disc2 className='size-5' />
            </button>
            <button
              className="px-8 py-2 bg-blue-600 shadow flex items-center gap-3 text-white rounded-lg"
              onClick={() => setShowQRScanner(true)}
            >
              ScanQR
              {/* <QRCode className='size-5' /> */}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full px-6 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className='popp'>
              <th className="px-3 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Select</th>
              <th className="px-3 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">S.No</th>
              <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">ISBN</th>
              <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Title</th>
              <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Borrower</th>
              <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Borrow Date</th>
              <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Status</th>
            </tr>
          </thead>
          {filteredBooks.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="7" className="px-4 py-4 text-center text-gray-600">No unreturned books at the moment.</td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 popp cursor-pointer ${selectedBook === book ? 'bg-gray-200' : ''}`}
                  onClick={() => setSelectedBook(book)}
                >
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedBook === book}
                      onChange={() => setSelectedBook(book)}
                    />
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.isbn}</td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">
                   {book.bookId && book.bookId[0].title}
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.studentId && book.studentId.name} (ID: {book.studentId && book.studentId.studentId})</td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{new Date(book.date).toLocaleDateString()}</td>
                  <td className="px-4 py-4 border-b border-gray-200 text-xs text-gray-700">
                    <span className={`border w-full rounded-full py-1 ${calculateStatus(book.borrowDate) === 'Overdue' ? 'border-red-500 px-4 bg-red-200 text-red-800' : 'border-green-500 bg-green-200 px-3 text-green-800'}`}>
                      {calculateStatus(book.borrowDate)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {isReturning && (
        <div className="fixed inset-0 flex z-50 backdrop-blur-sm items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Return</h2>
            <p>Are you sure you want to return the book titled "{selectedBook?.title}"?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={() => setIsReturning(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                onClick={handleConfirmReturn}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showQRScanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Uncomment QR code reader when integrated */}
            <QrReader
              onScan={handleQRScan}
              onError={handleQRScanError}
              style={{ width: '100%' }}
            />
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
              onClick={() => setShowQRScanner(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnBooks;
