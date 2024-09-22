'use client'; 
import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useSelector } from 'react-redux'; 

const PostComp = ({ isOpen, onClose }) => {
    const user_id = useSelector(state => state.user.user_id);
    
    // Hooks
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    // Send post function
    const sendPost = async () => {
        setLoading(true);
        try {
            const formData = {
                content: content,
                user_id: user_id,
            };
            const { data, error } = await supabase
                .from('posts')
                .insert([formData])
                .select();
            if (error) {
                console.log(error);
            } else {
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            onClose();
        }
    };

    // Only render the modal content if `isOpen` is true
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition">
            <div className="bg-white w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] p-6 rounded-lg shadow-lg relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <h2 className="text-xl font-semibold mb-4 text-[#4A7C4A]">Make a post</h2>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="block w-full p-3 border border-gray-300 text-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder='Type something...'
                />

                {/* Display spinner while loading */}
                {loading ? (
                    <div className="flex justify-center mt-3">
                        <svg className="animate-spin h-6 w-6 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                    </div>
                ) : (
                    <button
                        onClick={sendPost}
                        className="bg-green-700 text-white px-6 mt-3 block float-end py-2 rounded-md opacity-80 hover:opacity-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M2.3 10.3l19-7a.75.75 0 0 1 1 .94l-7 19a.75.75 0 0 1-1.4.06l-4.5-9.01-4.5-4.5a.75.75 0 0 1 .06-1.4zm7.54 5.14l3.02 6.04 5.27-14.35-8.29 8.3z" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default PostComp;
