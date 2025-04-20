import React, { useState } from 'react';
import { Gift, Star, Trophy } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Reward } from '../types';
import toast from 'react-hot-toast';

export default function Rewards() {
  const [rewards, setRewards] = useState<Reward | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    loadRewards();
  }, []);

  const loadRewards = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setRewards(data);
    } catch (error) {
      toast.error('Error loading rewards');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">My Rewards</h1>

      {/* Points Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
            <Trophy className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{rewards?.points || 0} Points</h2>
            <p className="text-gray-600">Keep exploring to earn more rewards!</p>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Available Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards?.available_rewards.map((reward) => (
            <div key={reward.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{reward.title}</h3>
                  <p className="text-sm text-gray-600">{reward.description}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4" />
                    <span>{reward.points_required}</span>
                  </div>
                  <button
                    className="mt-2 text-sm text-emerald-600 hover:text-emerald-700"
                    onClick={() => {/* Handle reward redemption */}}
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earned Rewards */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Earned Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards?.rewards_earned.map((reward) => (
            <div key={reward.id} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{reward.title}</h3>
                  <p className="text-sm text-gray-600">{reward.description}</p>
                  {reward.expires_at && (
                    <p className="text-xs text-gray-500 mt-1">
                      Expires: {new Date(reward.expires_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}