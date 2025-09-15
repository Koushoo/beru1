import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
       <div className="flex items-end max-w-xs md:max-w-md lg:max-w-lg">
          <img src="https://picsum.photos/seed/ai_bot/24/24" alt="Beru" className="w-6 h-6 rounded-full mr-3" />
          <div className="px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-r-2xl rounded-tl-2xl shadow-md">
            <div className="flex items-center space-x-1.5">
              <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
       </div>
    </div>
  );
};