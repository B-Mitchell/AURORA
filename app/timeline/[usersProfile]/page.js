'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/supabase';

const UserProfilePage = ({ params }) => {
  const user_id = params.usersProfile;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user data
  const fetchUserData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (error) {
      console.error('Error fetching user data:', error.message);
    } else {
      setUserData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, [user_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg className="animate-spin h-10 w-10 text-[#4A7C4A]" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8H4z" />
        </svg>
        <p className="text-center mt-4 text-[#4A7C4A]">Loading user data...</p>
      </div>
    );
  }

  if (!userData) {
    return <p className="text-center mt-7 text-[#4A7C4A]">User not found.</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">{`${userData.firstName} ${userData.lastName}`}</h2>
      <img 
        src={`https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}`} 
        alt="Avatar" 
        className="w-24 h-24 rounded-full mx-auto mb-4" 
      />
      <p className="text-gray-700 mb-2"><strong>Email:</strong> {userData.email}</p>
      <p className="text-gray-700 mb-2"><strong>Phone:</strong> {userData.phoneNumber}</p>
      <p className="text-gray-700 mb-2"><strong>Registered on:</strong> {new Date(userData.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default UserProfilePage;
