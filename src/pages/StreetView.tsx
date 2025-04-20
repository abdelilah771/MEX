import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import { Viewer } from 'mapillary-js';
import L, { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface StreetViewProps {}

const StreetView: React.FC<StreetViewProps> = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState({ lat: 40.712776, lng: -74.005974 });

  const MAPILLARY_TOKEN = 'MLY|29015807051397051|47612067bce2751ecae46ec3809cd5b0';

  useEffect(() => {
    initializeMap();
  }, [location]);

  const initializeMap = () => {
    if (!mapContainerRef.current || !viewerContainerRef.current) return;

    setIsLoading(true);

    try {
      if (mapRef.current) {
        mapRef.current.remove();
      }

      const map = L.map(mapContainerRef.current).setView([location.lat, location.lng], 16);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const marker = L.marker([location.lat, location.lng]).addTo(map);

      const mly = new Viewer({
        container: viewerContainerRef.current,
        accessToken: MAPILLARY_TOKEN,
        component: { cover: false }
      });

      findClosestImage(location.lat, location.lng)
        .then(imageId => {
          if (imageId) {
            mly.moveTo(imageId);
          } else {
            setError('No imagery found at this location.');
          }
        })
        .catch(err => {
          console.error('Mapillary error:', err);
          setError('Could not load street view image.');
        })
        .finally(() => setIsLoading(false));

      map.on('click', (e: LeafletMouseEvent) => {
        const newLat = e.latlng.lat;
        const newLng = e.latlng.lng;
        setLocation({ lat: newLat, lng: newLng });
        marker.setLatLng([newLat, newLng]);
      });
    } catch (err) {
      console.error('Map init failed:', err);
      setError('Failed to initialize map.');
      setIsLoading(false);
    }
  };

  const findClosestImage = async (lat: number, lng: number): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://graph.mapillary.com/images?fields=id&limit=1&closeto=${lng},${lat}&access_token=${MAPILLARY_TOKEN}`
      );
      if (!response.ok) throw new Error('Mapillary API request failed');

      const data = await response.json();
      return data?.data?.[0]?.id ?? null;
    } catch (err) {
      console.error('Error fetching Mapillary image:', err);
      return null;
    }
  };

  const SearchBox = () => {
    const [searchInput, setSearchInput] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchInput)}`
        );
        if (!response.ok) throw new Error('Geocoding failed');

        const data = await response.json();
        if (data?.length > 0) {
          const newLat = parseFloat(data[0].lat);
          const newLng = parseFloat(data[0].lon);
          setLocation({ lat: newLat, lng: newLng });
        } else {
          setError('Location not found.');
        }
      } catch (err) {
        console.error('Search error:', err);
        setError('Search failed.');
      }
    };

    return (
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a location"
            className="flex-grow p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Search
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Street View Explorer</h1>
        <SearchBox />
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
        {isLoading && (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div ref={mapContainerRef} className="w-full h-64 md:h-96 rounded-lg shadow-lg bg-gray-100"></div>
          <div ref={viewerContainerRef} className="w-full h-64 md:h-96 rounded-lg shadow-lg bg-gray-100"></div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Current Location</h2>
          <p>Latitude: {location.lat.toFixed(6)}, Longitude: {location.lng.toFixed(6)}</p>
        </div>
      </div>
    </div>
  );
};

export default StreetView;
