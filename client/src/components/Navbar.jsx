import React from 'react';
import { Menu, User, Bell } from 'lucide-react';

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-zinc-50 shadow border border-zinc-100 rounded-3xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <Menu />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a>Homepage</a></li>
              <li><a>Portfolio</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">SKU Library</a>
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