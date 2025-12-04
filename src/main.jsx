import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Navbar from './components/navbar/Navbar';
import PWABadge from './PWABadge'; 


import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProfilePage from './pages/ProfilePage';

// Placeholder Components for new pages
const FollowersPage = ({ onNavigate }) => {
  const [followers, setFollowers] = useState([]);
  const [loading,SF_Loading] = useState(true);
  
  
  useEffect(() => {
    import('./services/github').then(({ githubApi }) => {
      githubApi.getFollowers().then(data => {
        setFollowers(data);
        SF_Loading(false);
      });
    });
  }, []);

  if (loading) return <div className="pt-20 text-center">Loading...</div>;

  return (
    <div className="pt-20 px-6 pb-20">
      <h1 className="text-2xl font-bold mb-4">Followers</h1>
      <div className="grid grid-cols-1 gap-4">
        {followers.map(user => (
          <div key={user.id} onClick={() => onNavigate('follower-detail', user)} className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50 flex items-center gap-4">
            <img src={user.avatar_url} className="w-10 h-10 rounded-full" />
            <span className="font-semibold">{user.login}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DetailPage = ({ data, type, onBack }) => (
  <div className="pt-20 px-6 pb-20">
    <button onClick={onBack} className="mb-4 text-blue-600 font-bold">← Kembali</button>
    <div className="bg-white p-6 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-2">{type === 'repo' ? data.name : data.login}</h1>
      {type === 'user' && <img src={data.avatar_url} className="w-32 h-32 rounded-full mb-4" />}
      <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  </div>
);

function AppRoot() {
  const [currentPage, setCurrentPage] = useState('home');
  const [detailData, setDetailData] = useState(null);

  const handleNavigation = (page, data = null) => {
    window.scrollTo(0,0);
    if (data) setDetailData(data);
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={handleNavigation} />;
      case 'projects': return <ProjectsPage onNavigate={handleNavigation} />; // ProjectsPage needs update to handle clicks
      case 'followers': return <FollowersPage onNavigate={handleNavigation} />;
      case 'profile': return <ProfilePage />;
      
      // Detail Pages
      case 'project-detail': return <DetailPage data={detailData} type="repo" onBack={() => handleNavigation('projects')} />;
      case 'follower-detail': return <DetailPage data={detailData} type="user" onBack={() => handleNavigation('followers')} />;
      
      default: return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!['project-detail', 'follower-detail'].includes(currentPage) && (
        <Navbar currentPage={currentPage} onNavigate={handleNavigation} />
      )}
      <main>{renderCurrentPage()}</main>
      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
);