import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Components
import Navbar from './components/navbar/Navbar';
import PWABadge from './PWABadge'; 

// Pages
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProfilePage from './pages/ProfilePage';
import FollowersPage from './pages/FollowersPage'; // Import from file
import DetailPage from './pages/DetailPage';     // Import from file

function AppRoot() {
  const [currentPage, setCurrentPage] = useState('home');
  const [detailData, setDetailData] = useState(null);

  const handleNavigation = (page, data = null) => {
    window.scrollTo(0, 0);
    if (data) setDetailData(data);
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'projects':
        return <ProjectsPage onNavigate={handleNavigation} />;
      case 'followers':
        return <FollowersPage onNavigate={handleNavigation} />;
      case 'profile':
        return <ProfilePage />;
      
      // Detail Pages
      case 'project-detail':
        return <DetailPage data={detailData} type="repo" onBack={() => handleNavigation('projects')} />;
      case 'follower-detail':
        return <DetailPage data={detailData} type="user" onBack={() => handleNavigation('followers')} />;
        
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {!['project-detail', 'follower-detail'].includes(currentPage) && (
        <Navbar currentPage={currentPage} onNavigate={handleNavigation} />
      )}

      <main className="md:pt-0">
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