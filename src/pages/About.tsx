import React from 'react';
import { Users, Map, Shield, Award, ChevronRight, Instagram, Facebook, Twitter } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <span className="inline-block bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full mb-4">Discover Marrakech</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">About MEX</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover authentic Moroccan hospitality with our curated selection of hotels and riads in the magical city of Marrakech
        </p>
      </div>

      {/* Story Section with Enhanced Design */}
      <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
        <div className="order-2 md:order-1">
          <span className="text-emerald-600 font-medium mb-2 block">OUR JOURNEY</span>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Founded in 2025, MEX was born from a passion for authentic travel experiences
              and a deep appreciation for Moroccan culture. We bridge the gap between travelers and
              exceptional accommodations in the heart of Marrakech.
            </p>
            <p>
              Our platform combines traditional hospitality with modern technology, making it easier
              than ever to discover and book your perfect stay in Marrakech.
            </p>
            <p>
              Each property in our collection has been personally visited and verified by our local team,
              ensuring an authentic and high-quality experience for every guest.
            </p>
          </div>
          <button className="mt-8 flex items-center font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
            Learn more about our mission
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-64 h-64 bg-emerald-100 rounded-lg -z-10"></div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="/api/placeholder/600/400"
                alt="Marrakech cityscape"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-200 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 rounded-2xl p-10 mb-24">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-medium">THE NUMBERS</span>
          <h2 className="text-3xl font-bold mt-2 text-gray-900">Our Impact</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "500+", label: "Happy Travelers" },
            { value: "50+", label: "Verified Properties" },
            { value: "12+", label: "Local Partners" },
            { value: "4.9", label: "Average Rating" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-emerald-600 mb-2">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section with Enhanced Icons */}
      <div className="mb-24">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-medium">WHY CHOOSE US</span>
          <h2 className="text-3xl font-bold mt-2 mb-4 text-gray-900">The MEX Difference</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We go beyond just bookings to create memorable experiences for every traveler
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Users,
              title: "Expert Local Team",
              description: "Our team of local experts personally verifies each property and provides insider tips"
            },
            {
              icon: Map,
              title: "Perfect Locations",
              description: "Carefully selected properties in prime Marrakech locations for authentic experiences"
            },
            {
              icon: Shield,
              title: "Secure Booking",
              description: "Safe and secure payment process with 24/7 customer support throughout your stay"
            },
            {
              icon: Award,
              title: "Quality Assured",
              description: "High standards maintained through regular quality checks and guest feedback"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-16 h-16 mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-24">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-medium">OUR PEOPLE</span>
          <h2 className="text-3xl font-bold mt-2 mb-4 text-gray-900">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Passionate locals and travel experts committed to showcasing the best of Marrakech
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              name: "Aziz",
              role: "CEO",
              bio: "Visionary leader driving MEX's mission to transform travel experiences in Marrakech"
            },
            {
              name: "Aissam",
              role: "Manager",
              bio: "Overseeing operations and ensuring the highest quality standards for our customers"
            },
            {
              name: "Abdelilah",
              role: "Full Stack Developer",
              bio: "Creating innovative technical solutions that power our seamless booking platform"
            }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 bg-emerald-100 rounded-full mx-auto mb-6 overflow-hidden">
                <img
                  src="/api/placeholder/128/128"
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900">{member.name}</h3>
              <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section with Enhanced Design */}
      <div className="relative bg-emerald-600 rounded-2xl p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full -mr-20 -mt-20 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500 rounded-full -ml-10 -mb-10 opacity-50"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Join Our Community</h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
            Be part of our growing community of travelers discovering the magic of Marrakech. 
            Special offers, local insights, and personalized recommendations await.
          </p>
          <div className="mb-8">
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors shadow-md mx-2 mb-3 sm:mb-0">
              Sign Up Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors mx-2">
              Learn More
            </button>
          </div>
          <div className="flex justify-center mt-8">
            <a href="#" className="mx-3 text-white hover:text-emerald-200 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="mx-3 text-white hover:text-emerald-200 transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="mx-3 text-white hover:text-emerald-200 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}