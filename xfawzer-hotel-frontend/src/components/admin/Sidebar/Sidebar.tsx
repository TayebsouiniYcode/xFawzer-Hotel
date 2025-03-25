import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarCategory } from '../../../types/admin.types';

export interface SidebarProps {
  categories: SidebarCategory[];
}

const Sidebar: React.FC<SidebarProps> = ({ categories }) => {
  const location = useLocation();
  
  return (
    <aside className="bg-blue-900 text-white w-64 flex-shrink-0 hidden md:block overflow-y-auto h-full">
      <div className="p-4 border-b border-blue-800">
        <h1 className="text-2xl font-bold">LuxStay Admin</h1>
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
                >
                  <i className={`${item.icon} w-5 h-5 mr-3`}></i>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;