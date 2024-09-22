'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#4A7C4A]">Welcome to Aurora</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mb-8">
        {/* Feature One: User Authentication */}
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
          <svg className="w-16 h-16 text-[#4A7C4A] mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0a12 12 0 0 0-8.485 20.485c1.342-1.14 2.827-1.926 4.485-2.309a8.495 8.495 0 0 1 8.508-8.508A12 12 0 0 0 12 0zm0 4a8 8 0 0 1 8 8 7.99 7.99 0 0 1-5.384 7.696C14.96 17.396 14 18 12 18s-2.96-.604-2.616-1.304A7.99 7.99 0 0 1 4 12a8 8 0 0 1 8-8z"/>
          </svg>
          <h2 className="text-xl font-semibold">User Authentication</h2>
          <p className="text-gray-600 text-center">Securely log in and manage your account.</p>
        </div>

        {/* Feature Two: Team Collaboration */}
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
          <svg className="w-16 h-16 text-[#4A7C4A] mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 9h-4V5h-6v4H5v6h4v4h6v-4h4V9zm-2 2v4h-4v4h-6v-4H5v-4h4V7h6v4h4z"/>
          </svg>
          <h2 className="text-xl font-semibold">Team Collaboration</h2>
          <p className="text-gray-600 text-center">Work together with your team seamlessly.</p>
        </div>

        {/* Feature Three: Individual Progress Tracking */}
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
          <svg className="w-16 h-16 text-[#4A7C4A] mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 20H3V4h18v16zM8 8h8v2H8zm0 4h8v2H8zm-3 6h14v2H5z"/>
          </svg>
          <h2 className="text-xl font-semibold">Progress Tracking</h2>
          <p className="text-gray-600 text-center">Keep track of your individual contributions.</p>
        </div>

        {/* Feature Four: Private Messaging */}
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
          <svg className="w-16 h-16 text-[#4A7C4A] mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"/>
          </svg>
          <h2 className="text-xl font-semibold">Private Messaging</h2>
          <p className="text-gray-600 text-center">Chat securely with your teammates.</p>
        </div>

        {/* Feature Five: Timeline Feed */}
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
          <svg className="w-16 h-16 text-[#4A7C4A] mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 2h20v20H2V2zm2 2v16h16V4H4z"/>
          </svg>
          <h2 className="text-xl font-semibold">Timeline Feed</h2>
          <p className="text-gray-600 text-center">Stay updated with a dynamic timeline.</p>
        </div>

        {/* Feature Six: User-Friendly Interface */}
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
          <svg className="w-16 h-16 text-[#4A7C4A] mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 2h20v20H2V2zm2 2v16h16V4H4z"/>
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

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="text-gray-600 mb-6">Join us today and start your journey with Aurora!</p>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => router.push('/auth/create_account')}>
          Sign Up Now
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-4 bg-white p-4 shadow-md text-center">
        <p className="text-gray-600">© {new Date().getFullYear()} Aurora. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
