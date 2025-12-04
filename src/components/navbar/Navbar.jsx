import React from 'react';
import { Home, User, Briefcase, Users } from 'lucide-react';

export default function Navbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase size={20} /> },
    { id: 'followers', label: 'Followers', icon: <Users size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
  ];

  const NavButton = ({ item }) => {
    const isActive = currentPage === item.id;
    return (
      <button
        onClick={() => onNavigate(item.id)}
        className={`flex flex-col items-center justify-center w-full py-2 px-3 transition-colors duration-200 ${
          isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        {item.icon}
        <span className="text-xs font-medium mt-1">{item.label}</span>
      </button>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-lg border-t border-gray-200 md:top-0 md:bottom-auto md:h-16 z-50">
      <div className="max-w-4xl mx-auto h-full flex justify-around items-center px-4">
        <div className="hidden md:flex w-full justify-center items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                currentPage === item.id
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="flex md:hidden w-full justify-around items-center h-full">
          {navItems.map((item) => (
            <NavButton key={item.id} item={item} />
          ))}
        </div>
      </div>
    </nav>
  );
}