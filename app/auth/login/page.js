'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '@/app/supabase';
import { setUserId, setEmail, setFirstName, setLastName, setPhoneNumber } from '../../globalRedux/slices/userSlice';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.user.user_id);
  
  // Form states
  const [email, setLoginEmail] = useState('');
  const [password, setLoginPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    if (user_id) {
      router.push('/profile'); // Redirect to user profile
    }
  }, [user_id, router]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log('Supabase error: ', error);
        alert(error.message);
      } else {
        const user = data.user;
        const userMetadata = user.user_metadata;

        // Save logged-in user to state
        dispatch(setUserId(user.id));
        dispatch(setEmail(userMetadata.email));
        dispatch(setFirstName(userMetadata.first_name));
        dispatch(setLastName(userMetadata.last_name));
        dispatch(setPhoneNumber(userMetadata.phone_number));
        
        // Redirect to profile
        router.push('/profile');
      }
    } catch (error) {
      console.error('Login error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[40rem] bg-[#F9FAF9]">
      <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow-lg p-10 max-w-sm w-full'>
        <h1 className='text-3xl font-bold text-center text-[#4A7C4A] mb-6'>Login to Your Account</h1>
        
        <label className='block mb-2 font-bold text-gray-700'>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setLoginEmail(e.target.value)}
          placeholder="eg: johnDoe@gmail.com"
          required
          className='block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A7C4A] transition mb-3'
        />
        
        <label className='block font-bold mb-2 text-gray-700'>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setLoginPassword(e.target.value)}
          placeholder="eg: *********"
          required
          className='block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A7C4A] transition'
        />
        
        <button type="submit" className='w-full p-3 mt-4 bg-[#4A7C4A] text-white rounded-md hover:bg-[#3A6C3A] transition duration-200'>
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>
        
        <p className='text-center mt-5'>
        {`Don't`} have an account? <span className='text-[#4A7C4A] cursor-pointer' onClick={() => router.push('/auth/create_account')}>Sign up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
