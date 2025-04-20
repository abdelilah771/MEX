import React, { useEffect, useState } from 'react';
import { useFirebaseAuth } from '../contexts/FirebaseAuthContext';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { 
  Shield, Calendar, MapPin, CreditCard, Award, Globe, 
  User, Mail, Plane, Clock, CheckCircle, XCircle,
  ChevronRight, AlertCircle, Edit, Camera
} from 'lucide-react';

interface ProfileData {
  full_name?: string;
  nationality?: string;
  address?: string;
  document_type?: string;
  document_number?: string;
  date_of_birth?: string;
  selfie_verified?: boolean;
  document_verified?: boolean;
  reward_points?: number;
  planned_trips?: string[];
  created_at?: string;
  updated_at?: string;
}

export default function Profile() {
  const { user, loading } = useFirebaseAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const res = await fetch(`/api/profiles/${user.uid}`);
        if (!res.ok) throw new Error('Profile not found');
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        toast.error('No profile found.');
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, [user]);

  if (loading || loadingProfile) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20">
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-emerald-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-emerald-700 font-medium">Loading your profile details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-16 bg-red-50 rounded-xl overflow-hidden shadow-lg">
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-red-700 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access your profile information.</p>
          <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors shadow-md">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Calculate completion percentage
  const profileFields = ['full_name', 'nationality', 'address', 'document_type', 'document_number', 'date_of_birth'];
  const completedFields = profileFields.filter(field => profile && profile[field as keyof ProfileData]);
  const completionPercentage = Math.round((completedFields.length / profileFields.length) * 100);

  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-b-3xl shadow-lg mb-8">
        <div className="px-8 pt-12 pb-16 text-white">
          <h1 className="text-3xl font-bold mb-2 text-center">My Travel Profile</h1>
          <p className="text-emerald-100 text-center mb-8">Manage your identity and travel preferences</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="relative">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                  {profile?.selfie_verified ? (
                    <img src="/api/placeholder/80/80" alt="User avatar" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-8 h-8 text-emerald-300" />
                  )}
                </div>
                {profile?.selfie_verified && (
                  <div className="absolute -bottom-1 -right-1 bg-emerald-100 rounded-full p-1 border-2 border-white">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                )}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold">{profile?.full_name || 'Traveler'}</h2>
                <p className="text-emerald-100">{user.email}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center sm:items-end">
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg mb-2">
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  <span className="font-bold text-lg">{profile?.reward_points || 0}</span>
                  <span className="ml-1">points</span>
                </div>
              </div>
              <button className="flex items-center text-sm bg-white text-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-50 transition-colors shadow-sm">
                <Edit className="w-3 h-3 mr-1" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Completion */}
      <div className="px-6 -mt-12 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-700">Profile Completion</h3>
            <span className="text-sm font-bold text-emerald-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-emerald-600 h-2.5 rounded-full" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          
          {completionPercentage < 100 && (
            <p className="text-sm text-gray-500 mt-2">
              Complete your profile to unlock all features and personalized travel recommendations.
            </p>
          )}
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="px-6 mb-6">
        <div className="flex space-x-2 border-b border-gray-200">
          <button 
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === 'profile' 
                ? 'text-emerald-600 border-b-2 border-emerald-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === 'verification' 
                ? 'text-emerald-600 border-b-2 border-emerald-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('verification')}
          >
            Verification
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === 'travel' 
                ? 'text-emerald-600 border-b-2 border-emerald-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('travel')}
          >
            Travel Plans
          </button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="px-6">
        {activeTab === 'profile' && (
          <div className="grid md:grid-cols-2 gap-6">
            <ProfileCard 
              title="Personal Information"
              icon={<User className="text-emerald-600" />}
              items={[
                { 
                  icon: <User className="text-emerald-600" />, 
                  label: "Full Name", 
                  value: profile?.full_name 
                },
                { 
                  icon: <Mail className="text-emerald-600" />, 
                  label: "Email", 
                  value: user.email,
                  verified: true
                },
                { 
                  icon: <Globe className="text-emerald-600" />, 
                  label: "Nationality", 
                  value: profile?.nationality 
                },
                { 
                  icon: <MapPin className="text-emerald-600" />, 
                  label: "Address", 
                  value: profile?.address 
                },
                { 
                  icon: <Calendar className="text-emerald-600" />, 
                  label: "Date of Birth", 
                  value: profile?.date_of_birth && profile.date_of_birth !== 'Not set' 
                    ? format(new Date(profile.date_of_birth), 'PPP') 
                    : undefined
                }
              ]}
            />
            
            <ProfileCard 
              title="Account Information"
              icon={<Clock className="text-emerald-600" />}
              items={[
                { 
                  icon: <Clock className="text-emerald-600" />, 
                  label: "Created", 
                  value: profile?.created_at ? format(new Date(profile.created_at), 'PPP') : undefined
                },
                { 
                  icon: <Clock className="text-emerald-600" />, 
                  label: "Last Updated", 
                  value: profile?.updated_at ? format(new Date(profile.updated_at), 'PPP') : undefined
                }
              ]}
              footer={
                <div className="mt-2 pt-4 border-t border-gray-100">
                  <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                    Request Data Export
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              }
            />
          </div>
        )}
        
        {activeTab === 'verification' && (
          <div className="space-y-6">
            <VerificationCard 
              title="Identity Verification"
              description="Verify your identity to unlock exclusive benefits and faster check-ins"
              items={[
                {
                  title: "Document Verification",
                  description: "Upload a government-issued ID",
                  status: profile?.document_verified ? "complete" : "incomplete",
                  metadata: profile?.document_type && profile.document_number ? 
                    `${profile.document_type}: ${profile.document_number}` : undefined
                },
                {
                  title: "Selfie Verification",
                  description: "Take a photo to confirm your identity",
                  status: profile?.selfie_verified ? "complete" : "incomplete"
                }
              ]}
            />
            
            <div className="bg-blue-50 p-4 rounded-lg flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mt-1">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-blue-800">Enhanced Security</h3>
                <p className="text-sm text-blue-600">
                  Your verification data is encrypted and securely stored. We never share your personal information with third parties without your consent.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'travel' && (
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-emerald-600" />
                  Rewards & Loyalty
                </h3>
                <button className="text-sm text-emerald-600 font-medium">View History</button>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Available Points</p>
                    <p className="text-3xl font-bold text-emerald-600">{profile?.reward_points || 0}</p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors rounded-lg text-sm font-medium">
                    Redeem Points
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    Your next tier: <span className="font-medium">Silver Status</span>
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2 mb-1">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500">350 more points needed</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <Plane className="w-5 h-5 mr-2 text-emerald-600" />
                  Planned Trips
                </h3>
                <button className="text-sm text-emerald-600 font-medium">Add Trip</button>
              </div>
              <div className="p-6">
                {profile?.planned_trips && profile.planned_trips.length > 0 ? (
                  <div className="space-y-4">
                    {profile.planned_trips.map((trip, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="bg-emerald-100 rounded-full p-2">
                          <Plane className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-800">{trip}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <Plane className="h-8 w-8 text-gray-400" />
                    </div>
                    <h4 className="text-gray-700 font-medium mb-2">No trips planned yet</h4>
                    <p className="text-gray-500 text-sm mb-4">Start planning your next adventure!</p>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                      Plan a Trip
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper Components
function ProfileCard({ title, icon, items, footer }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800 flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-5">
          {items.map((item, index) => (
            <InfoItem 
              key={index}
              icon={item.icon}
              label={item.label}
              value={item.value}
              verified={item.verified}
            />
          ))}
        </div>
        {footer}
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value, verified = false }) {
  return (
    <div className="flex items-start">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-50 mr-3">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">{label}</p>
          {verified && (
            <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </span>
          )}
        </div>
        {value ? (
          <p className="font-medium text-gray-800">{value}</p>
        ) : (
          <div className="flex items-center mt-1">
            <p className="text-gray-400 italic text-sm mr-2">Not set</p>
            <button className="text-xs text-emerald-600 hover:text-emerald-700">Add</button>
          </div>
        )}
      </div>
    </div>
  );
}

function VerificationCard({ title, description, items }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="flex">
              <div className="mr-4">
                {item.status === "complete" ? (
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-800">{item.title}</h4>
                  {item.status === "complete" ? (
                    <span className="text-xs font-medium text-emerald-600">Complete</span>
                  ) : (
                    <button className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium px-3 py-1 rounded-full transition-colors">
                      Complete Now
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                {item.metadata && (
                  <p className="text-sm bg-gray-50 px-3 py-1 rounded mt-2 text-gray-600">
                    {item.metadata}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}