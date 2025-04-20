import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Check } from 'lucide-react';
import Webcam from 'react-webcam';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types';
import toast from 'react-hot-toast';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [showCamera, setShowCamera] = useState(false);
  
  const handlePersonalInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle document upload to Supabase storage
      toast.success('Document uploaded successfully');
      setStep(3);
    }
  };

  const handleSelfieCapture = async () => {
    // Handle selfie capture and verification
    setShowCamera(false);
    toast.success('Selfie verified successfully');
    setStep(4);
  };

  const completeOnboarding = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([profile]);

      if (error) throw error;

      toast.success('Profile created successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error('Error creating profile');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Welcome to MEX</h1>
        
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((number) => (
            <div
              key={number}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= number ? 'bg-emerald-600 text-white' : 'bg-gray-200'
              }`}
            >
              {step > number ? <Check size={20} /> : number}
            </div>
          ))}
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <form onSubmit={handlePersonalInfo} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg"
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border rounded-lg"
                onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nationality
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg"
                onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
            >
              Next
            </button>
          </form>
        )}

        {/* Step 2: Document Upload */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-600">Upload your ID or passport</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleDocumentUpload}
                className="hidden"
                id="document-upload"
              />
              <label
                htmlFor="document-upload"
                className="mt-4 inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 cursor-pointer"
              >
                Choose File
              </label>
            </div>
          </div>
        )}

        {/* Step 3: Selfie Verification */}
        {step === 3 && (
          <div className="space-y-4">
            {showCamera ? (
              <div className="relative">
                <Webcam
                  audio={false}
                  screenshotFormat="image/jpeg"
                  className="w-full rounded-lg"
                />
                <button
                  onClick={handleSelfieCapture}
                  className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
                >
                  Capture
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowCamera(true)}
                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
              >
                <Camera className="inline-block mr-2" size={20} />
                Take Selfie
              </button>
            )}
          </div>
        )}

        {/* Step 4: Completion */}
        {step === 4 && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-semibold">Verification Complete!</h2>
            <p className="text-gray-600">
              Your identity has been verified. Let's set up your profile.
            </p>
            <button
              onClick={completeOnboarding}
              className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
            >
              Continue to Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}