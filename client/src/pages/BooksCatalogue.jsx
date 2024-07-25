import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookModal from '../components/BookModal';
import { getBooks } from '../services/services';

const BooksCatalogue = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks(currentPage, searchText);
  }, [currentPage, searchText]);

  const fetchBooks = async (page, search) => {
    try {
      const response = await getBooks(page, search);
      setBooks(response.books);
      console.log(response.books);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  

  return (
    <div className="w-full py-6 flex flex-col px-6 items-center">
      <h1 className="text-2xl text-start w-full font-bold text-gray-800 mb-4">Available Books</h1>
      <div className="w-full flex mb-4 justify-between">
        <input
          type="text"
          className="px-4 py-2 border popp border-gray-300 rounded-lg w-2/3"
          placeholder="Search by title, ISBN, author, or location"
          value={searchText}
          onChange={handleSearchChange}
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
            <tr className="popp">
              <th className="px-3 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">S.No</th>
              <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">ISBN</th>
              <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Title</th>
              <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Author</th>
              <th className="px-2 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Copies</th>
              <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Location</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index} className="hover:bg-gray-50 popp cursor-pointer" onClick={() => setSelectedBook(book)}>
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.bookid}</td>
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.isbn}</td>
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.title}</td>
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.author}</td>
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.availableCopies} / {book.totalCopies}</td>
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-300 shadow text-black rounded-lg"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="px-4 py-2 bg-gray-300 shadow text-black rounded-lg"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
};

export default BooksCatalogue;
