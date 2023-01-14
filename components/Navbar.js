import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className='w-full fixed top-5 z-30'>
      <div className='navbar bg-base-100 w-11/12 mx-auto rounded-2xl'>
        <div className='flex-1'>
          <a className='btn btn-ghost normal-case text-xl'>Stash</a>
        </div>
        <div className='flex-none'>
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
              {user && (
                <div className='w-10 rounded-full'>
                  <img src={user.reloadUserInfo.photoUrl} />
                </div>
              )}
            </label>
            <ul
              tabIndex={0}
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <Link href='/ehteshaxm'>
                  <div className='justify-between'>Profile</div>
                </Link>
              </li>

              <li onClick={() => logout()}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
