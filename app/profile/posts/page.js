'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/supabase';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const user_id = useSelector((state) => state.user.user_id); // Get the logged-in user's ID from Redux
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all posts
  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      let { data, error } = await supabase.from('posts').select('*').eq('user_id', user_id);
      if (error) throw error;
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle like functionality
  const toggleLike = async (postId, likedBy) => {
    if (!user_id) {
        return alert('you are not logged in.')
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
    fetchAllPosts();
  }, []);

  if (loading) {
    return <p className="text-center mt-5 text-[#4A7C4A]">Loading posts...</p>;
  }

  if (posts.length === 0) {
    return <div ><p className='text-[#4A7C4A] text-center mt-5'>you don't have a post yet, <a className='font-extrabold hover:cursor-pointer text-[#a1d8a1]' onClick={() => router.push('/timeline')}>send one.</a></p></div>;
  }

  return (
    <div className="p-4 ">
      <p className="text-center mt-0 font-bold text-[1.3rem] mb-2">Timeline</p>
      {posts.map((post) => {
        const likedByArray = post.liked_by || []; // Ensure liked_by is an array
        const userHasLiked = likedByArray.includes(user_id); // Check if the logged-in user has liked the post

        return (
            <div
            key={post.id}
            className="border rounded-lg p-6 mb-6 bg-gradient-to-br from-green-100 via-white to-white shadow-lg  hover:shadow-xl flex flex-col z-10"
          >
            {/* User info */}
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0">
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
              <p className="text-gray-800 font-semibold text-lg">{post.user_id}</p>
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
                    className={`w-8 h-8 ${
                      userHasLiked ? 'text-red-500' : 'text-gray-300'
                    } transition-colors duration-200 ease-in-out`}
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
      
    </div>
  );
};

export default Page;
