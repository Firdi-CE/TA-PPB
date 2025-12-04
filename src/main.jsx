import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Components
import Navbar from './components/navbar/Navbar';
import PWABadge from './PWABadge'; 

// Pages
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProfilePage from './pages/ProfilePage';


const FollowersPage = ({ onNavigate }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Dynamic import untuk menghindari circular dependency
    import('./services/github').then(({ githubApi }) => {
      githubApi.getFollowers().then(data => {
        setFollowers(data);
        setLoading(false);
      });
    });
  }, []);

  if (loading) return <div className="pt-20 text-center">Loading...</div>;

  return (
    <div className="pt-20 px-6 pb-20">
      <h1 className="text-2xl font-bold mb-4">Followers</h1>
      <div className="grid grid-cols-1 gap-4">
        {followers.map(user => (
          <div 
            key={user.id} 
            onClick={() => onNavigate('follower-detail', user)} 
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50 flex items-center gap-4"
          >
            <img src={user.avatar_url} className="w-10 h-10 rounded-full" alt={user.login} />
            <span className="font-semibold">{user.login}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DetailPage = ({ data, type, onBack }) => {
  // detail follower
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

  // detail repo 
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
            {data.visibility || 'Public'}
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
};

// main logic nya

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
      
      // Halaman Detail
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
      {/* Navbar disembunyikan saat di halaman detail*/}
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