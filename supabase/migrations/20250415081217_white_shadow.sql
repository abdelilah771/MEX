/*
  # Create hotels table

  1. New Tables
    - `hotels`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price_per_night` (integer)
      - `location` (text)
      - `image_url` (text)
      - `amenities` (text[])
      - `rating` (decimal)
      - `room_count` (integer)
      - `created_at` (timestamp)
      - `category` (text) - either 'hotel' or 'riad'
      - `features` (text[])

  2. Security
    - Enable RLS on `hotels` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS hotels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price_per_night integer NOT NULL,
  location text NOT NULL,
  image_url text NOT NULL,
  amenities text[] NOT NULL DEFAULT '{}',
  rating decimal NOT NULL DEFAULT 0,
  room_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  category text NOT NULL CHECK (category IN ('hotel', 'riad')),
  features text[] NOT NULL DEFAULT '{}'
);

-- Enable Row Level Security
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Hotels are viewable by everyone" 
ON hotels FOR SELECT 
TO public 
USING (true);

-- Insert sample data
INSERT INTO hotels (name, description, price_per_night, location, image_url, amenities, rating, room_count, category, features) VALUES
(
  'Riad Le Jardin Secret',
  'A stunning 19th-century palace with a secret garden, this riad offers an authentic Moroccan experience with modern comforts. Features include a rooftop terrace with Atlas Mountains views.',
  280,
  'Medina',
  'https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&q=80',
  ARRAY['Pool', 'WiFi', 'Restaurant', 'Garden', 'Rooftop Terrace'],
  4.9,
  12,
  'riad',
  ARRAY['Traditional Architecture', 'Mountain Views', 'Courtyard Garden']
),
(
  'Royal Mansour Marrakech',
  'The epitome of luxury, Royal Mansour offers private riads, world-class spa services, and Michelin-starred dining experiences within its palatial grounds.',
  1200,
  'Hivernage',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80',
  ARRAY['Spa', 'Pool', 'Fine Dining', 'Butler Service', 'Private Pool Villas'],
  5.0,
  53,
  'hotel',
  ARRAY['Private Riads', 'Luxury Spa', 'Michelin Restaurant']
),
(
  'Riad Yasmine',
  'An Instagram-famous riad featuring a stunning green-tiled pool and traditional Moroccan architecture. Intimate atmosphere with personalized service.',
  220,
  'Medina',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80',
  ARRAY['Pool', 'WiFi', 'Breakfast', 'Rooftop Lounge'],
  4.8,
  8,
  'riad',
  ARRAY['Iconic Pool', 'Traditional Design', 'Intimate Setting']
),
(
  'Four Seasons Resort Marrakech',
  'Modern luxury meets Moroccan tradition in this expansive resort featuring manicured gardens, multiple pools, and family-friendly amenities.',
  800,
  'Hivernage',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80',
  ARRAY['Spa', 'Multiple Pools', 'Kids Club', 'Tennis Courts', 'Restaurants'],
  4.9,
  139,
  'hotel',
  ARRAY['Resort Style', 'Family Friendly', 'Extensive Gardens']
),
(
  'Riad BE Marrakech',
  'A boutique riad combining contemporary design with traditional Moroccan elements. Known for its exceptional service and peaceful atmosphere.',
  190,
  'Kasbah',
  'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&q=80',
  ARRAY['Plunge Pool', 'WiFi', 'Breakfast', 'Airport Transfer'],
  4.7,
  6,
  'riad',
  ARRAY['Design Focus', 'Peaceful Setting', 'Personalized Service']
),
(
  'La Mamounia',
  'An iconic palace hotel that has hosted royalty and celebrities, featuring stunning gardens, multiple restaurants, and a legendary spa.',
  950,
  'Medina',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80',
  ARRAY['Luxury Spa', 'Historic Gardens', 'Fine Dining', 'Indoor Pool', 'Tennis'],
  4.9,
  209,
  'hotel',
  ARRAY['Historic Property', 'Luxury Experience', 'Famous Gardens']
);