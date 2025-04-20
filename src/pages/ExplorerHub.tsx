import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, Image } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { SocialPost } from '../types';
import toast from 'react-hot-toast';

export default function ExplorerHub() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('social_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      toast.error('Error loading posts');
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
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Explorer Hub</h1>
        <button
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          onClick={() => {/* Handle new post */}}
        >
          Share Experience
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Posts Yet</h3>
          <p className="text-gray-600">Be the first to share your Marrakech experience!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {post.photos.length > 0 && (
                <img
                  src={post.photos[0]}
                  alt="Post"
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6">
                <p className="text-gray-800 mb-4">{post.content}</p>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-1 hover:text-emerald-600">
                      <Heart className="w-5 h-5" />
                      <span>{post.likes_count}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-emerald-600">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments_count}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-emerald-600">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                  <span className="text-sm">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}