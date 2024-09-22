'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Page = () => {
  const router = useRouter();
  const user_id = useSelector((state) => state.user.user_id);
  const email = useSelector((state) => state.user.user_email);
  const firstName = useSelector((state) => state.user.first_name);
  const lastName = useSelector((state) => state.user.last_name);
  const phoneNumber = useSelector((state) => state.user.phone_number);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user_id) {
      router.push('/auth/login');
    } else {
      setLoading(false);
    }
  }, [user_id, router]);

  const handleCopy = () => {
    navigator.clipboard.writeText(user_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copy state after 2 seconds
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg className="animate-spin h-10 w-10 text-[#4A7C4A]" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8H4z" />
        </svg>
        <p className="text-center mt-4 text-[#4A7C4A]">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full md:w-[90%] lg:w-[60%] mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Profile</h1>
      
      <div className="w-full bg-gradient-to-br from-green-100 via-white to-white p-6 rounded-lg shadow-md space-y-4">
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-gray-700">Email:</span>
          <span className="text-lg text-gray-600">{email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-gray-700">First Name:</span>
          <span className="text-lg text-gray-600">{firstName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-gray-700">Last Name:</span>
          <span className="text-lg text-gray-600">{lastName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-gray-700">Phone Number:</span>
          <span className="text-lg text-gray-600">{phoneNumber}</span>
        </div>

        {/* Display user_id and make it copiable */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold text-gray-700">User ID:</span>
          <div className="flex items-center">
            <span className="text-lg text-gray-600 mr-2">{user_id}</span>
            <button
              onClick={handleCopy}
              className=" text-white px-2 py-1 rounded hover:bg-green-600 transition duration-200 bg-black"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Show message when user_id is copied */}
        {copied && (
          <p className="text-green-500 mt-2 text-center">User ID copied to clipboard!</p>
        )}
      </div>

      <div className="mt-6 flex flex-col space-y-3 w-full">
        <button 
          onClick={() => router.push('/profile/projects')}
          className="bg-[#4A7C4A] text-white px-6 py-3 rounded-md hover:bg-[#3A6C3A] transition duration-200 transform hover:scale-105"
        >
          View My Projects
        </button>
        <button 
          onClick={() => router.push('/profile/posts')}
          className="bg-[#4A7C4A] text-white px-6 py-3 rounded-md hover:bg-[#3A6C3A] transition duration-200 transform hover:scale-105"
        >
          View My Posts
        </button>
      </div>
    </div>
  );
};

export default Page;
