'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/supabase';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const SignIn = () => {
  const router = useRouter();
  const user_id = useSelector(state => state.user.user_id);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
        },
      },
    };

    try {
      let { data, error } = await supabase.auth.signUp(formData);
      if (error) {
        console.log('supabase error: ' + error);
      } else {
        console.log(data)
        const user_id = data.user.id;
        await addToUsersTable(user_id);
        alert('proceed to login!');
        router.push('/auth/login');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToUsersTable = async (user_id) => {
    const datas = {
      email,
      firstName,
      lastName,
      phoneNumber,
      user_id
    };
    try {
      const { data, error } = await supabase.from('users').insert([datas]).select();
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (user_id) {
      router.push('/profile'); // Redirect to user profile
    }
  }, [user_id, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9FAF9]">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-[#4A7C4A] mb-6">Sign Up</h1>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="eg: johnDoe@gmail.com"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A7C4A] transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="eg: John"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A7C4A] transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="eg: Doe"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A7C4A] transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="eg: 070********79"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A7C4A] transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="eg: *******"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A7C4A] transition"
          />
        </div>

        <button type="submit" className="w-full p-3 bg-[#4A7C4A] text-white rounded-md hover:bg-[#3A6C3A] transition duration-200">
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <span onClick={() => router.push('/auth/login')} className="text-[#4A7C4A] cursor-pointer hover:underline">Login</span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
