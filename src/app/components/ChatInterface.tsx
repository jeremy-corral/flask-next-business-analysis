"use client"
import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import { AiOutlineSend } from 'react-icons/ai';
import Image from 'next/image';
import logo from '../assets/strai-logo.png';
import Loading from './Loading';
import Link from 'next/link';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

const numberDotSpacePattern = /\d+\.\s/;

function addNewLine(inputString) {
  // Split the input string based on the pattern
  let splitString = inputString.split(numberDotSpacePattern);

  // Join the split parts with a new line character
  let formattedString = splitString.join('\n');

  return formattedString;
}


  
  const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newMessage.trim() !== '') {
      setMessages([...messages, { prompt: newMessage, response: '' }]);
      setNewMessage('');
      setLoading(true);

      try {
        const response = await fetch('http://127.0.0.1:5000/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: newMessage })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch response from the server');
        }

        const data = await response.json();
        const botResponse = data.response;

        setMessages([...messages, { prompt: newMessage, response: botResponse }]);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch messages from the server when the component mounts
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/messages');
        if (!response.ok) {
          throw new Error('Failed to fetch messages from the server');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);
function Popup() {

  return (
    <div className={`absolute top-16 right-0 bg-white shadow-md p-4 rounded-full ${isOpen ? 'block' : 'hidden'}`}>
      <Link href='/insights'><span>Generate your company brand value document and insights from data</span></Link>
    </div>
  );
  }
  
  return (
    <div className="flex bg-black flex-col h-screen justify-between">
 <div className="flex bg-black items-center flex-row justify-between relative">
      <Link href="/">
        <Image className="p-2" src={logo} alt="Logo" width={100} height={100} />
      </Link>
              <Link href="/insights">

      <button
        className="px-3 py-1 m-4 font-bold bg-gradient-to-b from-skyblue to-blue-400 text-white rounded-full hover:bg-blue-400 transition-colors duration-500 ease-in-out focus:outline-none focus:bg-gray-600 inline-block transform hover:scale-105"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        Generate
      </button>
      </Link>
      <Popup />
    </div>

      <div className="flex-1 overflow-y-auto p-4" style={{ scrollbarWidth: 'thin' }}>
{messages.map((message, index) => (
  <React.Fragment key={index}>
    <Message content={message.prompt} isUser={true} />
    {/* Render the Message component only if message.response exists */}
    {message.response && (
      <Message content={addNewLine(message.response)} isUser={false} />
    )}
    {/* Display loading component on the opposite side of the last message */}
    {loading && index === messages.length - 1 && (
      <Loading className={`ml-auto`} /> // Use 'ml-auto' to align loading component to the right
    )}
  </React.Fragment>
))}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleMessageSend}>
        <div className="w-full p-4 flex justify-between items-center">
          <input
            type="text"
            className="border w-full rounded-lg px-4 py-2 w-3/4"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className={`px-3 py-3 m-2 space-x-2 bg-blue-500 text-white rounded`}
            disabled={loading}
          >
            <AiOutlineSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
