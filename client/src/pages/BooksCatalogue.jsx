import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookModal from '../components/BookModal'; 

const BooksCatalogue = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  const navigate = useNavigate();

  const books = [
    {
      serialNumber: 1,
      isbn: '978-0131103627',
      title: 'Introduction to Algorithms',
      location: 'Shelf A1',
      author: 'Thomas H. Cormen',
      description: 'A comprehensive book on algorithms.',
      image: 'path_to_image',
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
    // Add more books as needed
  ];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchText.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchText.toLowerCase())
  );
  //, author, location

  return (
    <div className="w-full py-6 flex flex-col px-6 items-center">
      <h1 className="text-2xl text-start w-full font-bold text-gray-800 mb-4">Available Books</h1>
      <div className="w-full flex mb-4 justify-between">
        <input
          type="text"
          className="px-4 py-2 border popp border-gray-300 rounded-lg w-2/3"
          placeholder="Search by title or ISBN"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-zinc-800 shadow text-white rounded-lg"
          onClick={() => navigate('/addnew')}
        >
          Add a New Book
        </button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className='popp'>
              <th className="px-3 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">S.No</th>
              <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">ISBN</th>
              <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Title</th>
              <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Author</th>
              <th className="px-2 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Copies</th>
              <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, index) => (
              <tr key={index} className="hover:bg-gray-50 popp cursor-pointer" onClick={() => setSelectedBook(book)}>
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.serialNumber}</td>
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.isbn}</td>
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.title}</td>
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.author}</td>
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.availableCount} / {book.totalCount}</td>
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
};

export default BooksCatalogue;
