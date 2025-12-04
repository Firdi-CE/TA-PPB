import React, { useState, useEffect } from 'react';
import { githubApi } from '../services/github';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await githubApi.getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
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
    <div className="min-h-screen bg-gray-100 p-8 pt-20 pb-24">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="h-32 bg-gray-800"></div>
        <div className="px-8 pb-8">
          <div className="relative -top-12 mb-[-3rem]">
            <img 
              src={profile?.avatar_url} 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white"
            />
          </div>
          
          <div className="pt-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{profile?.name || profile?.login}</h1>
            <p className="text-gray-500 mb-6">@{profile?.login}</p>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Bio</h2>
                <p className="text-gray-800 font-medium">{profile?.bio || "-"}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
                  <span className="block text-2xl font-bold text-blue-600">{profile?.public_repos}</span>
                  <span className="text-xs text-gray-500 font-medium uppercase">Repositories</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
                  <span className="block text-2xl font-bold text-blue-600">{profile?.followers}</span>
                  <span className="text-xs text-gray-500 font-medium uppercase">Followers</span>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href={profile?.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-3 bg-black text-white text-center rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}