import React from 'react';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const isError = message.isError ?? false;

  const bubbleClasses = isUser
    ? 'bg-blue-500 text-white self-end rounded-l-2xl rounded-tr-2xl'
    : isError
    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 self-start rounded-r-2xl rounded-tl-2xl'
    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 self-start rounded-r-2xl rounded-tl-2xl';

  const containerClasses = isUser ? 'flex justify-end' : 'flex justify-start';

  return (
    <div className={containerClasses}>
      <div className="flex items-end max-w-xs md:max-w-md lg:max-w-lg">
        {!isUser && (
            <img src="https://picsum.photos/seed/ai_bot/24/24" alt="Beru" className="w-6 h-6 rounded-full mr-3" />
        )}
        <div className={`px-4 py-3 shadow-md transition-all duration-300 ${bubbleClasses}`}>
          <p className="text-base whitespace-pre-wrap">{message.text}</p>
          <p className={`text-xs mt-1 text-right ${isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
            {message.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
};