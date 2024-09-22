'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useSelector } from 'react-redux';
import PostComp from '../components/PostComp';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const user_id = useSelector((state) => state.user.user_id); // Get the logged-in user's ID from Redux
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({}); // State to hold user data for all users
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Post component

  // Fetch all posts
  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      let { data, error } = await supabase.from('posts').select('*');
      if (error) throw error;
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all users for matching names
  const fetchUsersData = async () => {
    setLoading(true); // Set loading to true
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      console.error('Error fetching user data:', error.message);
    } else {
      const usersMap = data.reduce((acc, user) => {
        acc[user.user_id] = `${user.firstName} ${user.lastName}`; // Create a map of user_id to full name
        return acc;
      }, {});
      setUsers(usersMap); // Set users state
    }
    setLoading(false); // Set loading to false
  };

  // Toggle like functionality
  const toggleLike = async (postId, likedBy) => {
    if (!user_id) {
      return alert('You are not logged in.');
    }
    const userHasLiked = likedBy && likedBy.includes(user_id);

    // Update the liked_by array
    const updatedLikedBy = userHasLiked
      ? likedBy.filter((id) => id !== user_id) // Remove user from liked_by
      : [...(likedBy || []), user_id]; // Add user to liked_by, ensure it's an array

    // Update the post in the database
    await supabase
      .from('posts')
      .update({ liked_by: updatedLikedBy, likes_count: updatedLikedBy.length })
      .eq('id', postId);

    fetchAllPosts(); // Refetch the posts after updating
  };

  useEffect(() => {
    fetchUsersData(); // Fetch users data on component mount
    fetchAllPosts();
  }, [isModalOpen]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg className="animate-spin h-10 w-10 text-[#4A7C4A]" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8H4z" />
        </svg>
        <p className="text-center mt-4 text-[#4A7C4A]">Loading posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return <p className="text-center mt-7 text-[#4A7C4A]">There are no posts at the moment.</p>;
  }

  return (
    <div className="p-4">
      <p className="text-3xl font-bold text-gray-800 mb-6 text-center">Timeline</p>
      {posts.map((post) => {
        const likedByArray = post.liked_by || []; // Ensure liked_by is an array
        const userHasLiked = likedByArray.includes(user_id); // Check if the logged-in user has liked the post
        const userName = users[post.user_id] || 'Loading...'; // Get the corresponding user's name

        return (
          <div
            key={post.id}
            className="border rounded-lg p-6 mb-6 bg-gradient-to-br from-green-100 via-white to-white shadow-lg hover:shadow-xl flex flex-col z-10"
          >
            {/* User info */}
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push(`/timeline/${post.user_id}`)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 mr-3 text-green-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2a6 6 0 100 12 6 6 0 000-12zM4 18a8 8 0 1116 0v1H4v-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-gray-800 underline cursor-pointer font-semibold text-lg" onClick={() => router.push(`/timeline/${post.user_id}`)}>{userName}</p>
            </div>
            {/* Post content */}
            <p className="text-gray-700 text-base mb-6 leading-relaxed">{post.content}</p>
            {/* Divider */}
            <hr className="border-gray-300 my-3" />
          
            {/* Likes */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleLike(post.id, likedByArray)}
                  className="focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={userHasLiked ? 'red' : 'white'}
                    className={`w-8 h-8 ${userHasLiked ? 'text-red-500' : 'text-gray-300'} transition-colors duration-200 ease-in-out`}
                    style={{ stroke: 'red', strokeWidth: '1' }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <p className="text-gray-600 text-sm">{post.likes_count}</p>
              </div>
          
              {/* Timestamp */}
              <p className="text-gray-500 text-sm">
                {new Date(post.created_at).toLocaleTimeString()}
                <a className='pl-2'>{new Date(post.created_at).toLocaleDateString()}</a>
              </p>
            </div>
          </div>
        );
      })}

      {/* POST COMPONENT */}
      <PostComp isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-700 text-white px-4 py-2 rounded-md fixed bottom-20 right-10 opacity-80 hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default Page;
