import React from 'react';

interface ChatHeaderProps {
  onClearHistory: () => void;
}

const RefreshIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4a8 8 0 0113.536 4.793M20 20a8 8 0 00-13.536-4.793" />
    </svg>
);


export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClearHistory }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-sm">
      <div className="flex items-center">
        <div className="relative">
            <img
            src="https://picsum.photos/seed/ai_bot/40/40"
            alt="Beru"
            className="w-10 h-10 rounded-full"
            />
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
        </div>
        <div className="ml-4">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">Beru</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Active now</p>
        </div>
      </div>
      <button 
        onClick={onClearHistory} 
        title="Clear conversation history"
        className="p-2 text-gray-500 rounded-full hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
        aria-label="Clear conversation history"
        >
          <RefreshIcon className="w-6 h-6" />
      </button>
    </div>
  );
};