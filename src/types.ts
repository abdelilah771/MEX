export interface Profile {
  id: string;
  full_name: string;
  date_of_birth: string;
  nationality: string;
  document_type: 'passport' | 'id_card';
  document_number: string;
  document_verified: boolean;
  selfie_verified: boolean;
  address: string;
  created_at?: string;
  updated_at?: string;
}

export interface Interest {
  id: string;
  user_id: string;
  travel_purpose: string[];
  activity_preferences: string[];
  budget_range: [number, number];
  shopping_interests: string[];
  cuisine_preferences: string[];
  accommodation_type: string[];
  physical_activity_level: 'low' | 'moderate' | 'high';
  created_at?: string;
  updated_at?: string;
}

export interface Trip {
  id: string;
  user_id: string;
  title: string;
  start_date: string;
  end_date: string;
  budget: number;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  route_data: Record<string, any>;
  ai_suggestions: Record<string, any>;
  completed_activities: string[];
  created_at?: string;
  updated_at?: string;
}

export interface SocialPost {
  id: string;
  user_id: string;
  trip_id?: string;
  content: string;
  photos: string[];
  location: [number, number];
  likes_count: number;
  comments_count: number;
  created_at?: string;
  updated_at?: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

export interface Reward {
  id: string;
  user_id: string;
  points: number;
  rewards_earned: RewardItem[];
  available_rewards: RewardItem[];
  created_at?: string;
  updated_at?: string;
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  points_required: number;
  type: 'discount' | 'upgrade' | 'experience';
  value: number;
  expires_at?: string;
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}