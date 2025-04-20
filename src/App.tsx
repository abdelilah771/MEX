import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Experiences from './pages/Experiences';
import About from './pages/About';
import Contact from './pages/Contact';
import Onboarding from './pages/Onboarding';
import Profile from './pages/Profile';
import TripPlanner from './pages/TripPlanner';
import ExplorerHub from './pages/ExplorerHub';
import Rewards from './pages/Rewards';
import StreetView from './pages/StreetView';
import { FirebaseAuthProvider } from './contexts/FirebaseAuthContext';

function App() {
  return (
    <BrowserRouter>
      <FirebaseAuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/trip-planner" element={<TripPlanner />} />
              <Route path="/explorer-hub" element={<ExplorerHub />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/street-view" element={<StreetView />} />
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </FirebaseAuthProvider>
    </BrowserRouter>
  );
}

export default App;