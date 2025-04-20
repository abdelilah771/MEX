import React from 'react';
import { Star, Clock, Users, Tag } from 'lucide-react';

export default function Experiences() {
  const experiences = [
    {
      id: 1,
      title: "Traditional Moroccan Cooking Class",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80",
      description: "Learn to cook authentic Moroccan dishes with local chefs in a traditional riad setting",
      duration: "4 hours",
      price: 75,
      rating: 4.9,
      category: "Culinary",
      groupSize: "2-8 people"
    },
    {
      id: 2,
      title: "Desert Camel Trek",
      image: "https://images.unsplash.com/photo-1585150841964-e43c3db98662?auto=format&fit=crop&q=80",
      description: "Experience the magic of the Sahara with a sunset camel trek and traditional Berber camp",
      duration: "Full day",
      price: 120,
      rating: 4.8,
      category: "Adventure",
      groupSize: "4-12 people"
    },
    {
      id: 3,
      title: "Medina Art & Craft Tour",
      image: "https://images.unsplash.com/photo-1585937422479-7819e5860ba6?auto=format&fit=crop&q=80",
      description: "Explore traditional craftsmanship in the souks with a local artisan guide",
      duration: "3 hours",
      price: 45,
      rating: 4.7,
      category: "Cultural",
      groupSize: "2-6 people"
    },
    {
      id: 4,
      title: "Atlas Mountains Hiking",
      image: "https://images.unsplash.com/photo-1585937421597-93b72565326c?auto=format&fit=crop&q=80",
      description: "Trek through stunning mountain landscapes and visit traditional Berber villages",
      duration: "Full day",
      price: 90,
      rating: 4.9,
      category: "Adventure",
      groupSize: "4-10 people"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Authentic Marrakech Experiences</h1>
        <p className="text-lg text-gray-600">
          Immerse yourself in the rich culture and traditions of Marrakech
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experiences.map((experience) => (
          <div key={experience.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative">
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-48 object-cover"
              />
              <span className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                {experience.category}
              </span>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{experience.title}</h3>
              <p className="text-gray-600 mb-4">{experience.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{experience.groupSize}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="font-semibold">{experience.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-emerald-600">
                      ${experience.price}
                    </span>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                Book Experience
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}