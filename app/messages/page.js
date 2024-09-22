'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/supabase';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const MessagingPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const currentUserId = useSelector((state) => state.user.user_id); // Get the current user's ID

  // Fetch all users
  const fetchUsers = async () => {
    if (!currentUserId) {
      router.push('/auth/login'); 
      return
    } 
    const { data, error } = await supabase.from('users').select('*');
    if (!error) setUsers(data);
    setLoading(false); // Set loading to false after fetching
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#4A7C4A]">Available Users</h1>
      
      {loading ? ( // Show loading spinner while fetching
        <div className="flex flex-col justify-center items-center min-h-[300px]">
          <svg className="animate-spin h-10 w-10 text-[#4A7C4A]" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8H4z" />
          </svg>
          <p className="text-center mt-4 text-[#4A7C4A]">Loading users...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {users.map((user) => (
            user.user_id !== currentUserId && ( // Exclude the current logged-in user
              <div
                key={user.user_id} 
                className="flex items-center p-4 border rounded-lg shadow-md bg-white transition hover:shadow-lg cursor-pointer"
                onClick={() => router.push(`messages/${user.user_id}`)}
              >
                <div className="flex-shrink-0">
                  <img src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`} alt="Avatar" className="w-12 h-12 rounded-full" />
                </div>
                <div className="ml-6">
                  <h2 className="font-semibold text-lg">{user.firstName} {user.lastName}</h2>
                  <p className="text-gray-600">Email: {user.email}</p>
                  <p className="text-gray-600">Phone: {user.phoneNumber}</p>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagingPage;
