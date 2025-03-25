import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminUser, NotificationType } from '../../../types/admin.types';

export interface TopHeaderProps {
  title: string;
  user: AdminUser;
  notifications: NotificationType[];
  onToggleSidebar: () => void;
  onSearch?: (query: string) => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ 
  title, 
  user, 
  notifications,
  onToggleSidebar,
  onSearch 
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  
  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current && 
        !profileMenuRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button 
            className="text-gray-500 focus:outline-none md:hidden mr-3"
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <i className="fas fa-bars"></i>
          </button>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <form onSubmit={handleSearch}>
              <input 
                type="text" 
                className="w-64 pr-10 pl-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-3 text-gray-400"
                aria-label="Search"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
          
          {/* Notifications */}
          <div className="relative">
            <button className="text-gray-500 focus:outline-none" aria-label="Notifications">
              <i className="fas fa-bell text-xl"></i>
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          </div>
          
          {/* Profile */}
          <div className="relative">
            <button 
              ref={profileButtonRef}
              className="flex items-center focus:outline-none" 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              aria-label="Profile Menu"
            >
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="hidden md:block">{user.name}</span>
              <i className="fas fa-chevron-down ml-2 text-xs"></i>
            </button>
            
            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div 
                ref={profileMenuRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <Link 
                  to="/admin/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <i className="fas fa-user mr-2"></i> Mon Profil
                </Link>
                <Link 
                  to="/admin/settings" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <i className="fas fa-cog mr-2"></i> Paramètres
                </Link>
                <div className="border-t border-gray-100"></div>
                <Link 
                  to="/logout" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Déconnexion
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;