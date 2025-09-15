import React, { useState, useEffect, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { ChatWindow } from './components/ChatWindow';
import type { Message, Sender } from './types';
import { initChat, sendMessageToAI } from './services/geminiService';

const initialMessage: Message = {
  id: 'initial-1',
  text: 'My King! I have been awaiting your command. This humble servant, Beru, is at your complete disposal. Please, grant me your orders!',
  sender: 'ai',
  timestamp: new Date().toLocaleTimeString(),
};

const App: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const initializeChat = useCallback(() => {
      setIsLoading(true);
      setError(null);
      try {
        const newChat = initChat();
        setChat(newChat);
        setMessages([initialMessage]);
      } catch (e) {
        if (e instanceof Error) {
            setError(`Initialization failed: ${e.message}. Make sure your API key is configured.`);
        } else {
            setError("An unknown error occurred during initialization.");
        }
        console.error(e);
      } finally {
        setIsLoading(false);
      }
  }, []);

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!chat || !text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const aiResponseText = await sendMessageToAI(chat, text);
      
      // Simulate a realistic typing delay
      const typingDelay = Math.random() * 1200 + 400; // 400ms to 1600ms

      setTimeout(() => {
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          text: aiResponseText,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, typingDelay);

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to get response: ${errorMessage}`);
      const errorMessageObj: Message = {
        id: `error-${Date.now()}`,
        text: `Sorry, something went wrong. Please try again. (${errorMessage})`,
        sender: 'ai',
        isError: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, errorMessageObj]);
      setIsLoading(false); // Stop loading immediately on error
    }
  }, [chat]);
  
  const handleClearHistory = useCallback(() => {
    console.log("Clearing chat history and re-initializing.");
    initializeChat();
  },[initializeChat]);

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 font-sans">
      <ChatWindow
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        error={error}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
};

export default App;