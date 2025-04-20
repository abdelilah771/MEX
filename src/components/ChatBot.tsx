import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Camera, Mic, Paperclip, Award, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { ChatMessage } from '../types';

interface ChatBotProps {
  onClose: () => void;
}

export default function ChatBot({ onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I can help you find the perfect stay in Marrakech. What\'s your budget and when are you planning to visit?',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions] = useState([
    "What are the best riads in Marrakech?",
    "I need a luxury hotel with a pool",
    "Budget-friendly options for families"
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      generateResponse(input);
    }, 1500);
  };

  const generateResponse = (userInput: string) => {
    const lowercaseInput = userInput.toLowerCase();
    let response = '';
    
    // Generate contextual responses based on user input
    if (lowercaseInput.includes('budget')) {
      response = 'For budget travelers, I recommend staying in the Medina area. There are many affordable riads starting from $30-50 per night. Would you like me to suggest some specific options?';
    } else if (lowercaseInput.includes('luxury') || lowercaseInput.includes('expensive')) {
      response = 'Marrakech offers incredible luxury experiences! Consider La Mamounia or Royal Mansour for world-class service. The palm grove area also has beautiful resort properties with pools and spas. What amenities are most important for your luxury stay?';
    } else if (lowercaseInput.includes('family') || lowercaseInput.includes('kid')) {
      response = 'For families, I suggest staying in Gueliz (the new town) or a resort in the palm grove area. These areas offer more space and amenities for children. Many riads also welcome families and can arrange special activities. How many family members will be traveling?';
    } else {
      response = 'I understand you\'re interested in visiting Marrakech. Could you tell me more about your preferences? For example, are you interested in traditional riads in the Medina or modern hotels? And what activities are you most excited about?';
    }
    
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString(),
    };
    
    setIsTyping(false);
    setMessages(prev => [...prev, assistantMessage]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden shadow-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="bg-emerald-600 p-4 flex justify-between items-center text-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Award size={24} className="text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold">Marrakech Travel Assistant</h3>
            <div className="text-xs flex items-center text-emerald-100">
              <div className="h-2 w-2 rounded-full bg-green-300 mr-2"></div>
              Online
            </div>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="p-1 hover:bg-emerald-700 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Chat area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex flex-col max-w-[80%] gap-1 ${message.role === 'user' ? '' : 'items-start'}`}>
              {message.role === 'assistant' && (
                <div className="flex items-center space-x-2 ml-2">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <Award size={16} className="text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">Assistant</span>
                </div>
              )}
              
              <div
                className={`rounded-2xl p-3 ${
                  message.role === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-sm'
                    : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'
                }`}
              >
                {message.content}
                <div className={`text-xs mt-1 flex justify-end ${
                  message.role === 'user' ? 'text-emerald-100' : 'text-gray-400'
                }`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
              
              {message.role === 'assistant' && (
                <div className="flex space-x-2 mt-1 ml-12">
                  <button 
                    className="text-gray-400 hover:text-emerald-600 transition-colors"
                    aria-label="Thumbs up"
                  >
                    <ThumbsUp size={14} />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Thumbs down"
                  >
                    <ThumbsDown size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-full px-4 py-2 flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Suggestions */}
      {messages.length < 3 && (
        <div className="px-4 py-2 bg-gray-50 flex gap-2 overflow-x-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1 text-xs bg-white border border-gray-200 rounded-full text-gray-600 whitespace-nowrap hover:bg-gray-100 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      
      {/* Input area */}
      <div className="border-t p-4 bg-white">
        <div className="flex gap-2 items-center">
          <button 
            className="text-gray-400 hover:text-emerald-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Attach file"
          >
            <Paperclip size={20} />
          </button>
          <button 
            className="text-gray-400 hover:text-emerald-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Camera"
          >
            <Camera size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-gray-50"
          />
          <button 
            className="text-gray-400 hover:text-emerald-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Voice message"
          >
            <Mic size={20} />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            aria-label="Send message"
            className={`${
              input.trim() 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : 'bg-gray-200 cursor-not-allowed'
            } text-white p-3 rounded-full transition-colors`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}