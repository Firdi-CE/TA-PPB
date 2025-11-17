import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Pastikan CSS diimpor

// Impor Halaman
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProfilePage from './pages/ProfilePage';

// Impor Navigasi
import Navbar from './components/navbar/Navbar';


import PWABadge from './PWABadge'; 


function AppRoot() {
  
  const [currentPage, setCurrentPage] = useState('home');

  
  const handleNavigation = (page) => {
    setCurrentPage(page);
  };


 const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'projects':
        return <ProjectsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar (Gabungan Desktop/Mobile)*/}
      <Navbar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Konten Halaman Utama [cite: 515] */}
      <main className="min-h-screen pb-16 md:pb-0 md:pt-16">
        {renderCurrentPage()}
      </main>

  
      <PWABadge />
    </div>
  );
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
);