import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div 
        className="relative h-[500px] rounded-xl overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-5xl font-bold">Discover Marrakech</h1>
            <p className="text-xl">Experience luxury riads and hotels in the heart of Morocco</p>
            <Link
              to="/hotels"
              className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Find Your Stay
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Riad Al Makan",
              image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80",
              location: "Medina",
              price: 200,
              rating: 4.8
            },
            {
              name: "La Mamounia Palace",
              image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80",
              location: "Hivernage",
              price: 500,
              rating: 4.9
            },
            {
              name: "Dar El Souk",
              image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80",
              location: "Kasbah",
              price: 150,
              rating: 4.7
            }
          ].map((property, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{property.name}</h3>
                <div className="flex items-center gap-1 text-gray-600 mt-2">
                  <MapPin size={16} />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400" />
                    <span>{property.rating}</span>
                  </div>
                  <div className="text-emerald-600 font-semibold">
                    ${property.price}/night
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}