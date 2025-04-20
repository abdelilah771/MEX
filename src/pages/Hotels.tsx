import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Hotel } from '../types';

export default function Hotels() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select('*');
      
      if (error) throw error;
      
      setHotels(data || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = hotel.price_per_night >= priceRange[0] && 
                        hotel.price_per_night <= priceRange[1];
    const matchesLocation = selectedLocation === 'All Locations' || 
                           hotel.location === selectedLocation;
    const matchesCategory = selectedCategory === 'all' || 
                           hotel.category === selectedCategory;
    
    return matchesSearch && matchesPrice && matchesLocation && matchesCategory;
  });

  const locations = [...new Set(hotels.map(hotel => hotel.location))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search hotels and riads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <select 
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option>All Locations</option>
                {locations.map(location => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <select 
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Properties</option>
                <option value="hotel">Hotels Only</option>
                <option value="riad">Riads Only</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-600 whitespace-nowrap">Price Range:</span>
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1"
              />
              <span className="whitespace-nowrap">${priceRange[0]} - ${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={hotel.image_url}
                alt={hotel.name}
                className="w-full h-56 object-cover"
              />
              <span className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                {hotel.category === 'hotel' ? 'Hotel' : 'Riad'}
              </span>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{hotel.name}</h3>
                <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
                  <Star size={16} className="text-yellow-500" />
                  <span className="font-semibold">{hotel.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{hotel.description}</p>
              <div className="flex items-center gap-1 text-gray-600 mb-4">
                <MapPin size={16} />
                <span>{hotel.location}</span>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      +{hotel.amenities.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-emerald-600 font-semibold text-lg">
                    ${hotel.price_per_night}
                    <span className="text-gray-500 text-sm font-normal">/night</span>
                  </div>
                  <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}