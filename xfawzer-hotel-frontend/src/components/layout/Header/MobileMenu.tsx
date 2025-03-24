import React from 'react';
import { MenuItem } from '../../../types/common.types';

interface MobileMenuProps {
  isOpen: boolean;
  menuItems: MenuItem[];
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, menuItems, onClose }) => {
  return (
    <div className={`md:hidden bg-white w-full py-4 px-4 shadow-md ${isOpen ? 'block' : 'hidden'}`}>
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item, index) => (
          <a 
            key={index} 
            href={item.href} 
            className="text-gray-700 hover:text-primary transition"
            onClick={onClose}
          >
            {item.label}
          </a>
        ))}
        <a 
          href="#reserver" 
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-900 transition text-center"
          onClick={onClose}
        >
          Réserver
        </a>
      </nav>
    </div>
  );
};

export default MobileMenu;