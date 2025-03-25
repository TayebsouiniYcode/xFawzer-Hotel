import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarCategory } from '../../../types/admin.types';

export interface MobileSidebarProps {
  categories: SidebarCategory[];
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ 
  categories, 
  isOpen, 
  onClose 
}) => {
  const location = useLocation();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:hidden">
      <div className="bg-primary text-white w-64 h-full overflow-y-auto">
        <div className="p-4 border-b border-blue-800 flex justify-between items-center">
          <h1 className="text-2xl font-bold">LuxStay Admin</h1>
          <button className="text-white" onClick={onClose} aria-label="Fermer">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <nav className="mt-6">
          {categories.map((category, index) => (
            <div key={index}>
              <div className="px-4 py-2 text-xs text-blue-300 uppercase tracking-wider">
                {category.title}
              </div>
              {category.items.map((item, itemIndex) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={itemIndex}
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-white hover:bg-blue-800 transition ${
                      isActive ? 'bg-blue-800' : ''
                    }`}
                    onClick={onClose}
                  >
                    <i className={`${item.icon} w-5 h-5 mr-3`}></i>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileSidebar;