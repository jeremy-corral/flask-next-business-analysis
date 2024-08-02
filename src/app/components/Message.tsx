import React from 'react';

interface MessageProps {
  content: string;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ content, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`m-2 max-w-2/3 px-4 py-4 rounded-xl shadow-lg ${isUser ? ' bg-gradient-to-br from-skyblue to-blue-100 text-black' : 'bg-gradient-to-br from-gray-100 to-gray-300  text-black'}`}>
        <p className="text-sm font-sans ">{content}</p>
      </div>
    </div>
  );
};

export default Message;
