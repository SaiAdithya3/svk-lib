import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <>
      <div className="w-full flex items-center">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  )
}

export default App