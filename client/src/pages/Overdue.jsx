import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const Overdue = () => {
  // Example overdue books data
  const [overdueBooks, setOverdueBooks] = useState([
    {
      serialNumber: 1,
      isbn: '978-0131103627',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      borrowedBy: 'John Doe',
      borrowDate: '2023-06-01',
      dueDate: '2023-06-15',
      status: 'Overdue',
    },
    {
      serialNumber: 2,
      isbn: '978-0132350884',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      borrowedBy: 'Jane Smith',
      borrowDate: '2023-05-20',
      dueDate: '2023-06-10',
      status: 'Overdue',
    },
    // Add more overdue books as needed
  ]);

  // Function to handle exporting data to Excel
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(overdueBooks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Overdue Books');
    XLSX.writeFile(workbook, 'OverdueBooks.xlsx');
  };

  return (
    <div className="w-full py-6 flex flex-col px-6 items-center">
      <h1 className="text-2xl text-start w-full font-bold text-gray-800 mb-4">Overdue Books</h1>
      
      {overdueBooks.length === 0 ? (
        <p className="text-gray-600">No overdue books at the moment.</p>
      ) : (
        <>
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
            onClick={handleExportToExcel}
          >
            Export to Excel
          </button>

          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className='popp'>
                  <th className="px-3 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">S.No</th>
                  <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">ISBN</th>
                  <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Title</th>
                  <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Author</th>
                  <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Borrowed By</th>
                  <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Borrow Date</th>
                  <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Due Date</th>
                  <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {overdueBooks.map((book, index) => (
                  <tr key={index} className="hover:bg-gray-50 popp">
                    <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.serialNumber}</td>
                    <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.isbn}</td>
                    <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.title}</td>
                    <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.author}</td>
                    <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.borrowedBy}</td>
                    <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.borrowDate}</td>
                    <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{book.dueDate}</td>
                    <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">
                      <span className="bg-red-200 text-red-700 font-semibold py-1 px-2 rounded-full text-xs">
                        {book.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Overdue;
