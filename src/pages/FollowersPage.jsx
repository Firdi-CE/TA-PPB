import React, { useState, useEffect } from 'react';
import { githubApi } from '../services/github';

export default function FollowersPage({ onNavigate }) {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await githubApi.getFollowers();
        setFollowers(data);
      } catch (error) {
        console.error("Failed to fetch followers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20 pb-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Followers</h1>
        <div className="grid grid-cols-1 gap-4">
          {followers.map(user => (
            <div 
              key={user.id} 
              onClick={() => onNavigate('follower-detail', user)} 
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all flex items-center gap-4"
            >
              <img src={user.avatar_url} className="w-12 h-12 rounded-full border border-gray-200" alt={user.login} />
              <div>
                <span className="font-semibold text-lg text-gray-800 block">{user.login}</span>
                <span className="text-xs text-gray-500">Tap to view profile</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}