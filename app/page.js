'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const router = useRouter();
  const user_id = useSelector(state => state.user.user_id);

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col">
      <section className="bg-[#f0fdf4] py-20 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#4A7C4A]">
          Welcome to Aurora, The platform for seamless collaboration
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#4A7C4A]">
          Let's build together
        </h2>
        {
          !user_id ? <><p className="text-lg text-gray-600 mb-8">
          Join us today and start your journey with Aurora!
        </p>
        <button 
          className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700"
          onClick={() => router.push('/auth/create_account')}
        >
          Sign Up Now
        </button></> : null
        }
      </section>

      <h2 className='text-center text-[1.3rem] font-semibold text-[#4A7C4A] underline py-3'>Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mb-8">
        {/* Feature One: User Authentication */}
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
        <svg className="w-16 h-16 text-[#4A7C4A] mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C8.134 0 5 3.134 5 7v3H4c-1.105 0-2 .895-2 2v8c0 1.105.895 2 2 2h16c1.105 0 2-.895 2-2v-8c0-1.105-.895-2-2-2h-1V7c0-3.866-3.134-7-7-7zm0 2c2.761 0 5 2.239 5 5v3H7V7c0-2.761 2.239-5 5-5zm-7 10h14v8H5v-8zm7 1a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
        </svg>
          <h2 className="text-xl font-semibold">User Authentication</h2>
          <p className="text-gray-600 text-center">Securely log in and manage your account.</p>
        </div>

        {/* Feature Two: Team Collaboration */}
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
          <svg className="w-16 h-16 text-[#4A7C4A] mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14c-3.87 0-7 2.91-7 6.5C0 21.33 0.67 22 1.5 22h11c.83 0 1.5-.67 1.5-1.5 0-3.59-3.13-6.5-7-6.5zm-5.07 6a4.505 4.505 0 0 1 4.57-4c2.28 0 4.14 1.61 4.57 4H1.93zM7 13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm10 6c-2.67 0-5 2.1-5 4.5 0 .28.22.5.5.5h9c.28 0 .5-.22.5-.5 0-2.4-2.33-4.5-5-4.5zm-4.07 4a4.505 4.505 0 0 1 4.57-4c2.28 0 4.14 1.61 4.57 4h-9.14zM17 13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>
          </svg>
          <h2 className="text-xl font-semibold">Team Collaboration</h2>
          <p className="text-gray-600 text-center">Work together with your team seamlessly.</p>
        </div>

        {/* Feature Three: Individual Progress Tracking */}
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
        <svg class="w-16 h-16 text-[#4A7C4A] mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1a11 11 0 1 0 11 11A11.012 11.012 0 0 0 12 1zm-1 16h-1V10h1zm2 0h-1v-4h1zm2 0h-1v-7h1z"/>
          <path d="M22 21H2v-2h20z"/>
        </svg>
          <h2 className="text-xl font-semibold">Progress Tracking</h2>
          <p className="text-gray-600 text-center">Keep track of your individual contributions.</p>
        </div>

        {/* Feature Four: Private Messaging */}
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
        <svg class="w-16 h-16 text-[#4A7C4A] mb-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M20 2H4a2 2 0 00-2 2v16l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zM5 10h10v2H5v-2zm8-3H5V5h8v2zm2 9h-4v-1c0-1.7 3-1.7 3 0v1z"/>
          <path d="M17 14h-3v-1a1.5 1.5 0 013 0v1z"/>
        </svg>
          <h2 className="text-xl font-semibold">Private Messaging</h2>
          <p className="text-gray-600 text-center">Chat securely with your teammates.</p>
        </div>

        {/* Feature Five: Timeline Feed */}
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
        <svg class="w-16 h-16 text-[#4A7C4A] mb-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M5 5a2 2 0 110-4 2 2 0 010 4zM5 9a2 2 0 110-4 2 2 0 010 4zM5 13a2 2 0 110-4 2 2 0 010 4zM5 17a2 2 0 110-4 2 2 0 010 4zM9 4h10v2H9V4zm0 4h10v2H9V8zm0 4h10v2H9v-2zm0 4h10v2H9v-2z"/>
        </svg>
          <h2 className="text-xl font-semibold">Timeline Feed</h2>
          <p className="text-gray-600 text-center">Stay updated with a dynamic timeline.</p>
        </div>

        {/* Feature Six: User-Friendly Interface */}
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
        <svg class="w-16 h-16 text-[#4A7C4A] mb-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zM20 8h2v2h-2V8zm-4 8h6v2h-6v-2zM20 12h2v2h-2v-2z"/>
        </svg>
          <h2 className="text-xl font-semibold">User-Friendly Interface</h2>
          <p className="text-gray-600 text-center">Navigate easily with our sleek design.</p>
        </div>
      </div>

      {/* Phases of Project Development Section */}
      <div className="p-8 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Project Development Phases</h1>
        <Link href="/phases">
          <span className="text-green-500 underline hover:text-green-700 text-lg font-semibold" onClick={() => router.push('/phases')}>
            Learn about the Phases of Project Development
          </span>
        </Link>
      </div> 


      {/* Footer */}
      <footer className="mt-4 bg-gray-100 py-4 shadow-inner">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            {/* Aurora Logo or Title */}
            <div>
              <h1 className="text-2xl font-bold text-green-600">Aurora</h1>
            </div>

            {/* FAQ and Contact Support Links */}
            <div className="space-x-8 text-gray-700">
              <a href="/faq" className="hover:underline text-sm">FAQ</a>
              <a href="mailto:aurorahelpdesk@gmail.com" className="hover:underline text-sm">Contact Support</a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500">
            <p>© {new Date().getFullYear()} Aurora. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
