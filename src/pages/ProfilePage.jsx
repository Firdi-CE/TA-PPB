import React from 'react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-20">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Profil Pengguna
          </h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Nama</h2>
              <p className="text-lg font-semibold text-gray-800">
                [Muhammad Alam Firdaus]
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">NIM</h2>
              <p className="text-lg font-semibold text-gray-800">
                [21120119140147]
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Kelompok</h2>
              <p className="text-lg font-semibold text-gray-800">
                [Kelompok 26]
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}