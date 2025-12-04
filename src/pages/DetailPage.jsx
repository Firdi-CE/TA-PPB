import React from 'react';

export default function DetailPage({ data, type, onBack }) {
  // --- LAYOUT UNTUK USER (FOLLOWER) ---
  if (type === 'user') {
    return (
      <div className="pt-20 px-6 pb-20 max-w-lg mx-auto">
        <button 
          onClick={onBack} 
          className="mb-6 flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
          <span className="mr-2 text-xl">←</span> Kembali
        </button>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          
          <div className="px-6 relative pb-6">
            <div className="absolute -top-16 left-6 p-1.5 bg-white rounded-full shadow-md">
              <img 
                src={data.avatar_url} 
                alt={data.login} 
                className="w-32 h-32 rounded-full bg-gray-200" 
              />
            </div>
            
            <div className="pt-20">
              <h1 className="text-3xl font-bold text-gray-900">{data.login}</h1>
              <p className="text-sm text-gray-500 font-mono mt-1">ID: {data.id}</p>
              
              <div className="mt-6">
                <a 
                  href={data.html_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block w-full text-center bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-all shadow-md active:scale-95"
                >
                  Kunjungi Profil GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- LAYOUT UNTUK REPO (PROJECT) ---
  return (
    <div className="pt-20 px-6 pb-20 max-w-2xl mx-auto">
      <button 
        onClick={onBack} 
        className="mb-6 flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors"
      >
        <span className="mr-2 text-xl">←</span> Kembali
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
            {data.visibility}
          </span>
        </div>
        
        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
          {data.description || "Tidak ada deskripsi."}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-xl">
            <span className="text-xs text-gray-500 uppercase font-bold">Bahasa</span>
            <p className="text-lg font-semibold text-gray-800">{data.language || "-"}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <span className="text-xs text-gray-500 uppercase font-bold">Stars</span>
            <p className="text-lg font-semibold text-yellow-600">★ {data.stargazers_count}</p>
          </div>
        </div>

        <a 
          href={data.html_url} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md"
        >
          Lihat Source Code
        </a>
      </div>
    </div>
  );
}