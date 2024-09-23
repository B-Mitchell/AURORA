'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/supabase';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const MessagingPage = ({ params }) => {
  const router = useRouter();
  const user_id = params.user; // The ID of the user you want to message
  const currentUserId = useSelector((state) => state.user.user_id); // Current user ID from Redux
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [userData, setUserData] = useState(null); // Initialize as null for better loading state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user data
  const fetchUserData = async () => {
    setLoading(true); // Set loading to true
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
    setLoading(false); // Set loading to false
  };

  // Fetch messages for the current chat
  const fetchMessages = async () => {
    setLoading(true); // Set loading to true
    const { data: messagesSent, error: errorSent } = await supabase
      .from('messages')
      .select('*')
      .eq('sender_id', currentUserId)
      .eq('receiver_id', user_id);

    const { data: messagesReceived, error: errorReceived } = await supabase
      .from('messages')
      .select('*')
      .eq('sender_id', user_id)
      .eq('receiver_id', currentUserId);

    if (errorSent || errorReceived) {
      console.error('Error fetching messages:', errorSent || errorReceived);
    } else {
      setMessages([...messagesSent, ...messagesReceived].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
    }
    setLoading(false); // Set loading to false
  };

  useEffect(() => {
    if (!currentUserId) {
      router.push('/auth/login');
      return
    }
    fetchMessages();
    fetchUserData();
  }, [currentUserId, user_id]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return; // Don't send empty messages

    const { error } = await supabase
      .from('messages')
      .insert([{ sender_id: currentUserId, receiver_id: user_id, content: text }]);

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setText(''); // Clear input field after sending
      fetchMessages(); // Refresh messages after sending
    }
  };

  return (
    <div className="flex flex-col max-h-[35rem] bg-gray-100">
      <div className="bg-white shadow-md p-4">
        <h2 className="text-xl font-bold text-center">
          {userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}
        </h2>
      </div>
      <div className="flex-grow overflow-auto bg-white rounded shadow p-4 mb-4">
        {loading ? (
          <div className="text-center p-4">
            <svg className="animate-spin h-10 w-10 text-[#4A7C4A]" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8H4z" />
            </svg>
            <p>Loading messages...</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`p-2 mb-2 rounded ${msg.sender_id === currentUserId ? 'bg-green-200 self-end' : 'bg-gray-200 self-start'}`}>
              <strong>{msg.sender_id === currentUserId ? 'You' : userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}:</strong>
              <p>{msg.content}</p>
            </div>
          ))
        )}
      </div>
      <form className="p-4 flex items-center justify-between bg-white w-full" onSubmit={sendMessage}>
        <input
          type="text"
          className="flex-grow border rounded p-2 mr-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded px-4">Send</button>
      </form>
    </div>
  );
};

export default MessagingPage;


