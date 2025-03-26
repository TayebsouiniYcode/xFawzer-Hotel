import React, { useState } from 'react';
import { SidebarCategory, AdminUser, NotificationType } from '../../../types/admin.types';
import Sidebar from '../Sidebar';
import MobileSidebar from '../MobileSidebar';
import TopHeader from '../TopHeader';

export interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  user: AdminUser;
  notifications: NotificationType[];
  onSearch?: (query: string) => void;
}

// Catégories du sidebar par défaut
const defaultCategories: SidebarCategory[] = [
  {
    title: 'Principal',
    items: [
      { label: 'Dashboard', icon: 'fas fa-tachometer-alt', href: '/admin/dashboard' },
      { label: 'Réservations', icon: 'fas fa-calendar-check', href: '/admin/bookings' },
      { label: 'Chambres', icon: 'fas fa-door-open', href: '/admin/rooms' },
      { label: 'Clients', icon: 'fas fa-users', href: '/admin/clients' },
    ]
  },
  {
    title: 'Gestion',
    items: [
      { label: 'Personnel', icon: 'fas fa-user-tie', href: '/admin/employees' },
      { label: 'Services', icon: 'fas fa-concierge-bell', href: '/admin/services' },
      { label: 'Rapports', icon: 'fas fa-chart-line', href: '/admin/reports' },
    ]
  },
  {
    title: 'Paramètres',
    items: [
      { label: 'Configuration', icon: 'fas fa-cog', href: '/admin/settings' },
      { label: 'Déconnexion', icon: 'fas fa-sign-out-alt', href: '/logout' },
    ]
  }
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  title, 
  user, 
  notifications,
  onSearch
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar categories={defaultCategories} />
      
      {/* Mobile Sidebar */}
      <MobileSidebar 
        categories={defaultCategories} 
        isOpen={isMobileSidebarOpen} 
        onClose={closeMobileSidebar} 
      />
      
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button 
          className="bg-primary text-white p-3 rounded-full shadow-lg"
          onClick={toggleMobileSidebar}
          aria-label="Toggle Sidebar"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <TopHeader 
          title={title} 
          user={user} 
          notifications={notifications}
          onToggleSidebar={toggleMobileSidebar}
          onSearch={onSearch}
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;