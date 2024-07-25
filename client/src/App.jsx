import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import BooksCatalogue from './pages/BooksCatalogue';
import BorrowBooks from './pages/BorrowBooks';
import ReturnBooks from './pages/ReturnBooks';
import Overdue from './pages/Overdue';
import ActivityLog from './pages/ActivityLog';
import Navbar from './components/Navbar';
import AddNewBook from './components/AddNewBook';

const App = () => {
  return (
    <>
      <div className="w-full flex flex-row items-start">
        <Sidebar />
        <div className="w-full flex flex-col">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/books" element={<BooksCatalogue />} />
            <Route path="/borrow" element={<BorrowBooks />} />
            <Route path="/returnbooks" element={<ReturnBooks />} />
            <Route path="/overdues" element={<Overdue />} />
            <Route path="/acitvity" element={<ActivityLog />} />
            <Route path="/addnew" element={<AddNewBook />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App;