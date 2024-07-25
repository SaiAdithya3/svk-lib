import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Disc2, Search } from 'lucide-react';
import { toast } from 'sonner';
import BookModal from '../components/BookModal';


const BorrowBooks = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [studentDetails, setStudentDetails] = useState({ name: '', id: '' });
  const [isBorrowing, setIsBorrowing] = useState(false);
  const navigate = useNavigate();
  const [viewBook, setViewBook] = useState(null);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchText.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleBorrow = () => {
    if (selectedBooks.length === 0) {
      toast.error("Please select at least one book to borrow.");
      return;
    }
    console.log(selectedBooks);
    setIsBorrowing(true);
  };
  const handleConfirmBorrow = () => {
    toast.success(`Books borrowed by ${studentDetails.name} (ID: ${studentDetails.id})`);
    setSelectedBooks([]);
    setStudentDetails({ name: '', id: '' });
    setIsBorrowing(false);
  };

  const handleBookDetails = (book) => {
    setView(`/book-details/${book.isbn}`);
  };

  const handleSelectBook = (book) => {
    if (selectedBooks.includes(book)) {
      setSelectedBooks(selectedBooks.filter(b => b !== book));
    } else {
      setSelectedBooks([...selectedBooks, book]);
    }
  };

  return (
    <div className="w-full py-6 flex flex-col px-6 items-center">
      <h1 className="text-2xl px-3 text-start w-full font-bold text-gray-800 mb-4">Borrow Books</h1>
      <div className="w-full px-3 flex mb-4  justify-between">
        <div className="w-2/3 px-4 flex bg-zinc-100 items-center gap-2 border border-gray-300 rounded-lg">
        <Search className=''/>
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
          onClick={handleBorrow}
        >
          Borrow
          <Disc2 className='size-5' />
        </button>
      </div>
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
            {filteredBooks.map((book, index) => (
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
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.serialNumber}</td>
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


      {isBorrowing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
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
                  <p className='px-2 py-1 popp' key={book.isbn}> 	&rArr;	{book.title} ({book.author})</p>
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
    </div>
  );
};

const books = [
  {
    serialNumber: 1,
    isbn: '978-0131103627',
    title: 'Introduction to Algorithms',
    location: 'Shelf A1',
    author: 'Thomas H. Cormen',
    description: 'A comprehensive book on algorithms.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRI7feo6_qem1JTMuRBotK7a4rzMlHK-tc9Q&s',
    totalCount: 5,
    availableCount: 3,
  },
  {
    serialNumber: 2,
    isbn: '978-0132350884',
    title: 'Clean Code',
    location: 'Shelf B3',
    author: 'Robert C. Martin',
    description: 'A handbook of agile software craftsmanship.',
    image: 'path_to_image',
    totalCount: 3,
    availableCount: 1,
  },
  {
    serialNumber: 3,
    isbn: '978-0132350884',
    title: 'Clean Code',
    location: 'Shelf B3',
    author: 'Robert C. Martin',
    description: 'A handbook of agile software craftsmanship.',
    image: 'path_to_image',
    totalCount: 3,
    availableCount: 1,
  },
  {
    serialNumber: 4,
    isbn: '978-0132350884',
    title: 'Clean Code',
    location: 'Shelf B3',
    author: 'Robert C. Martin',
    description: 'A handbook of agile software craftsmanship.',
    image: 'path_to_image',
    totalCount: 3,
    availableCount: 1,
  },
  {
    serialNumber: 5,
    isbn: '978-0132350884',
    title: 'Clean Code',
    location: 'Shelf B3',
    author: 'Robert C. Martin',
    description: 'A handbook of agile software craftsmanship.',
    image: 'path_to_image',
    totalCount: 3,
    availableCount: 1,
  },
  {
    serialNumber: 6,
    isbn: '978-0132350884',
    title: 'Clean Code',
    location: 'Shelf B3',
    author: 'Robert C. Martin',
    description: 'A handbook of agile software craftsmanship.',
    image: 'path_to_image',
    totalCount: 3,
    availableCount: 1,
  },
];

export default BorrowBooks;
