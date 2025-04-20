import React, { useState } from 'react';
import { Calendar, MapPin, DollarSign, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Trip } from '../types';
import toast from 'react-hot-toast';

export default function TripPlanner() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTrips(data || []);
    } catch (error) {
      toast.error('Error loading trips');
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
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Trip Planner</h1>
        <button
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          onClick={() => {/* Handle new trip */}}
        >
          Plan New Trip
        </button>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Trips Planned Yet</h3>
          <p className="text-gray-600">Start planning your Marrakech adventure!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{trip.title}</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    <span>Budget: ${trip.budget}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="capitalize">{trip.status}</span>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 flex justify-between">
                <button
                  className="text-emerald-600 hover:text-emerald-700"
                  onClick={() => {/* Handle view details */}}
                >
                  View Details
                </button>
                <button
                  className="text-gray-600 hover:text-gray-700"
                  onClick={() => {/* Handle edit trip */}}
                >
                  Edit Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}