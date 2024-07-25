import React, { useState } from 'react';
import { toast } from 'sonner';
import { Disc2, Search } from 'lucide-react';

const ReturnBooks = () => {
  const [unreturnedBooks, setUnreturnedBooks] = useState(unreturnedBooksData);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isReturning, setIsReturning] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleReturn = () => {
    if (!selectedBook) {
      toast.error("Please select a book to return.");
      return;
    }
    setIsReturning(true);
  };

  const handleConfirmReturn = () => {
    toast.success(`Book returned: ${selectedBook.title}`);
    setUnreturnedBooks(unreturnedBooks.filter(book => book !== selectedBook));
    setSelectedBook(null);
    setIsReturning(false);
  };

  const calculateStatus = (borrowDate) => {
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 14);
    const currentDate = new Date();
    return currentDate > dueDate ? 'Overdue' : 'Before Due';
  };

  const filteredBooks = unreturnedBooks.filter(book =>
    book.title.toLowerCase().includes(searchText.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="w-full py-6 flex flex-col  items-center">
      <div className="w-full px-9 border-b sticky top-14 bg-white/60 backdrop-blur-sm pb-4 z-20 flex flex-col items-center justify-between">
        <h1 className="text-2xl text-start w-full font-bold text-gray-800">Return Books</h1>
        <div className="w-full py-3 flex justify-between">
          <div className="w-2/3 px-4 flex bg-zinc-100 items-center gap-2 border border-gray-300 rounded-lg">
            <Search className='' />
            <input
              type="text"
              className="px py-2 popp rounded-lg bg-zinc-100 w-full focus:outline-none"
              placeholder="Search by title or ISBN"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <button
            className="px-8 py-2 bg-zinc-900 shadow flex items-center gap-3 text-white rounded-lg"
            onClick={handleReturn}
          >
            Return
            <Disc2 className='size-5' />
          </button>
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
            <p className=" w-full text-center text-gray-600">No overdue books at the moment.</p>
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
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.serialNumber}</td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.isbn}</td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.title}</td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.borrower.name} (ID: {book.borrower.id})</td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.borrowDate}</td>
                  <td className="px-4 py-4 border-b border-gray-200 text-xs text-gray-700">
                    <span className={`border w-full  rounded-full py-1 ${calculateStatus(book.borrowDate) === 'Overdue' ? 'border-red-500 px-4 bg-red-200 text-red-800' : 'border-green-500 bg-green-200 px-3 text-green-800'
                      }`}>
                      {calculateStatus(book.borrowDate)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>


      {
        isReturning && selectedBook && (
          <div className="fixed inset-0 flex items-center z-50 backdrop-blur-sm justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full">
              <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700">Confirm Return</h2>
                <button
                  className="text-red-700 font-semibold bg-red-200 px-2 rounded-lg hover:text-red-800"
                  onClick={() => setIsReturning(false)}
                >
                  Close
                </button>
              </div>
              <div className="px-4 py-3 popp flex flex-col gap-2">
                <p>Are you sure you want to return the book: <strong>{selectedBook.title}</strong>?</p>
                <p className='w-full flex justify-between'>Borrower: <strong>{selectedBook.borrower.name} (ID: {selectedBook.borrower.id}) </strong> </p>
                <p className='w-full flex justify-between'>Borrow Date: <strong>{selectedBook.borrowDate}</strong></p>
                <p className='w-full flex justify-between'>Status: <strong>{calculateStatus(selectedBook.borrowDate)}</strong></p>
                <button
                  className="mt-4 px-4 py-2 bg-zinc-800 shadow text-white rounded-lg"
                  onClick={handleConfirmReturn}
                >
                  Confirm Return
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

const unreturnedBooksData = [
  {
    serialNumber: 1,
    isbn: '978-0131103627',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    borrower: { name: 'John Doe', id: '12345' },
    borrowDate: '2024-07-01',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    borrower: { name: 'Jane Smith', id: '67890' },
    borrowDate: '2024-07-15',
  },
  // Add more unreturned books as needed
];

export default ReturnBooks;
