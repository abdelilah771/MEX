import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserCircle, Menu, X, MessageCircle } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useFirebaseAuth } from '../contexts/FirebaseAuthContext';
import AuthModal from './AuthModal';
import ChatBot from './ChatBot';

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useFirebaseAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out!');
    } catch (error) {
      toast.error('Sign-out failed');
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/hotels', label: 'Hotels & Riads' },
    { path: '/experiences', label: 'Experiences' },
    { path: '/street-view', label: 'Street View' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="bg-white/70 backdrop-blur-lg shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-emerald-600 tracking-tight">
            MEX
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors font-medium ${
                  location.pathname === link.path
                    ? 'text-emerald-600'
                    : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsChatOpen(true)}
              className="text-gray-600 hover:text-emerald-600"
              title="Open Assistant"
            >
              <MessageCircle size={22} />
            </button>

            {!loading && user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
                <UserCircle className="text-emerald-600" size={24} />
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-full shadow hover:bg-emerald-700 transition"
              >
                Sign In
              </button>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-emerald-600 transition"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden px-6 py-4 bg-white border-t shadow-sm space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block transition-colors ${
                  location.pathname === link.path
                    ? 'text-emerald-600 font-medium'
                    : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {!loading && user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition"
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-full max-w-md h-[500px] bg-white rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="flex items-center justify-between bg-emerald-600 text-white p-4">
            <span className="font-semibold">Travel Assistant</span>
            <button onClick={() => setIsChatOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <ChatBot onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </>
  );
}