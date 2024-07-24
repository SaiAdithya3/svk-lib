import React from 'react';
import { Menu, User, Bell, ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname.split('/').filter((x) => x);

  return (
    <>
      <div className="navbar sticky top-0 border-b border-zinc-200">
        <div className="navbar-start flex text-sm font-semibold px-5 breadcrumbs">
            <ul>
              <li><a>Dashboard</a></li>
              <li><a>{path}</a></li>
            </ul>
        </div>
        <div className="navbar-center">
          <div className="flex gap-1 items-center border border-slate-300 bg-zinc-50 px-3 rounded-3xl">
            <Search className='size-5'/>
            <input type="text" className="pr-8 pl-2 font- popp py-2 bg-zinc-50 rounded-r-3xl overflow-hidden focus:outline-none" placeholder="Search..." />
          </div>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <User />
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <Bell />
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>

      </div>
    </>
  )
}

export default Navbar