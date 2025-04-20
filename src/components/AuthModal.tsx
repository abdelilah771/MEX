import React, { useState } from 'react';
import { X } from 'lucide-react';
import FirebaseLogin from './auth/FirebaseLogin';
import FirebaseRegister from './auth/firebaseregister';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div className="mb-4 flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded font-medium transition ${
              isLogin ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button
            className={`px-4 py-2 rounded font-medium transition ${
              !isLogin ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <div className="mt-4">
          {isLogin ? (
            <FirebaseLogin />
          ) : (
            <FirebaseRegister onSuccess={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
