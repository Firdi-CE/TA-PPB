import { useState } from 'react'
import PWABadge from './PWABadge.jsx'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-600">
          Hello World
        </h1>
        <p className="text-gray-600">
          App.jsx berhasil dipulihkan.
        </p>
        
       
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => alert("Interaksi Berjalan!")}
        >
          Tes Klik
        </button>
      </div>

     
      <PWABadge />
    </div>
  )
}

export default App