'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../globalRedux/slices/userSlice';

const Navbar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.user.user_id);
    const [isOpen, setIsOpen] = useState(false); // State to handle mobile menu

    // Check if user is logged out
    useEffect(() => {
      if (!user_id) {
        router.push('/auth/login');
      }
    }, [user_id, router]);

    const handleLogout = () => {
      dispatch(logoutUser());
    };

    const handleNavigation = (path) => {
      router.push(path);
      setIsOpen(false); // Close mobile menu after navigation
    };

    return (
      <nav className="bg-white shadow-md fixed top-0 w-full z-10">
        <div className="max-w-6xl mx-auto px-4 md:py-4 flex py-7 justify-between items-center">
          <h1 className="text-xl font-bold text-[#4A7C4A] cursor-pointer" onClick={() => router.push('/')}>
            AURORA
          </h1>
          <div className="hidden md:flex space-x-6">
          <button className="text-[#4A7C4A] hover:text-[#3A6C3A] text-lg py-2" onClick={() => handleNavigation('/')}>Home</button>
            <button className="text-[#4A7C4A] hover:text-[#3A6C3A] text-lg py-2" onClick={() => handleNavigation('/profile')}>Profile</button>
            <button className="text-[#4A7C4A] hover:text-[#3A6C3A] text-lg py-2" onClick={() => handleNavigation('/profile/projects')}>Projects</button>
            <button className="text-[#4A7C4A] hover:text-[#3A6C3A] text-lg py-2" onClick={() => handleNavigation('/messages')}>Messages</button>
            <button className="text-[#4A7C4A] hover:text-[#3A6C3A] text-lg py-2" onClick={() => handleNavigation('/timeline')}>Timeline</button>
            {user_id ? (
              <button onClick={handleLogout} className="bg-[#4A7C4A] text-white px-6 py-2 rounded-md hover:bg-[#3A6C3A] text-lg">Logout</button>
            ) : (
              <>
                <button className="text-[#4A7C4A] text-lg py-2" onClick={() => handleNavigation('/auth/login')}>Login</button>
                <button className="bg-[#4A7C4A] text-white px-6 py-2 rounded-md text-lg">Sign Up</button>
              </>
            )}
          </div>
          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center" 
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6 text-[#4A7C4A] scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white z-50 absolute w-full shadow-lg`}>
          <div className="flex flex-col space-y-2 px-4 py-2">
            <button className="text-[#4A7C4A] hover:text-[#3A6C3A] text-lg py-2" onClick={() => { handleNavigation('/'); }}>Home</button>
            <button className="text-[#4A7C4A] hover:text-[#3A6C3A] text-lg py-2" onClick={() => { handleNavigation('/profile'); }}>Profile</button>
            <button className="text-[#4A7C4A] hover:text-[#3A6C3A] text-lg py-2" onClick={() => { handleNavigation('/profile/projects'); }}>Projects</button>
            <button className="text-[#4A7C4A] hover:text-[#3A6C3A] text-lg py-2" onClick={() => { handleNavigation('/messages'); }}>Messages</button>
            <button className="text-[#4A7C4A] hover:text-[#3A6C3A] text-lg py-2" onClick={() => { handleNavigation('/timeline'); }}>Timeline</button>
            {user_id ? (
              <button onClick={handleLogout} className="bg-[#4A7C4A] text-white px-6 py-2 rounded-md hover:bg-[#3A6C3A] text-lg">Logout</button>
            ) : (
              <>
                <button className="text-[#4A7C4A] text-lg py-2" onClick={() => { handleNavigation('/auth/login'); }}>Login</button>
                <button className="bg-[#4A7C4A] text-white px-6 py-2 rounded-md text-lg">Sign Up</button>
              </>
            )}
          </div>
        </div>
      </nav>
    );
};

export default Navbar;
