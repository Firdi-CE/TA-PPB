import React from 'react';

export default function HomePage({ onNavigate }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-6 pt-20 pb-20">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Selamat Datang di Portofolio Saya
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Ini adalah aplikasi PWA yang dibuat dengan React, Vite, dan Tailwind CSS.
        </p>
        <button 
          onClick={() => onNavigate('projects')}
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Lihat Proyek Saya
        </button>
      </div>
    </div>
  );
}