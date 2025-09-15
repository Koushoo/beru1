import React from 'react';
import type { Message } from '../types';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  error: string | null;
  onClearHistory: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, isLoading, error, onClearHistory }) => {
  return (
    <div className="flex flex-col h-full max-h-[95vh] w-full max-w-2xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">
      <ChatHeader onClearHistory={onClearHistory} />
      <MessageList messages={messages} isLoading={isLoading} />
      {error && (
        <div className="px-4 py-2 text-center text-sm text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-300">
          {error}
        </div>
      )}
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};