import React, { useState, useEffect } from 'react';
import { githubApi } from '../services/github'; 

export default function ProjectsPage({ onNavigate }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data dari GitHub saat halaman dibuka
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await githubApi.getRepos();
        setProjects(data); // Simpan data repo ke state
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. Tampilan Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Proyek GitHub (Live API)
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((repo) => (
            <div 
              key={repo.id} 
              // 3. Event Navigasi ke Halaman Detail
              onClick={() => onNavigate('project-detail', repo)} 
              className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {repo.name}
                </h3>
                <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded border border-blue-100">
                  {repo.visibility || 'Public'}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
                {repo.description || "Tidak ada deskripsi tersedia untuk repositori ini."}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-50">
                {repo.language && (
                  <span className="flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  ⭐ {repo.stargazers_count} Stars
                </span>
                <span className="text-xs text-gray-400 ml-auto self-center">
                  Klik untuk detail →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}