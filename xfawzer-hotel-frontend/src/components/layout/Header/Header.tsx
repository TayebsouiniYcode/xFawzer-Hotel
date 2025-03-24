import React, { useState, useEffect } from 'react';
import Button from '../../common/Button';
import MobileMenu from './MobileMenu';
import { MenuItem } from '../../../types/common.types';

export interface HeaderProps {
  menuItems: MenuItem[];
}

const Header: React.FC<HeaderProps> = ({ menuItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <header className={`bg-white shadow-md fixed w-full z-10 transition-all ${isScrolled ? 'py-2' : 'py-3'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">xFawzer</h1>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          {menuItems.map((item, index) => (
            <a 
              key={index} 
              href={item.href} 
              className="text-gray-700 hover:text-primary transition"
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        <div className="hidden md:block">
          <div className='flex gap-4'>
          <div>
          <Button href="#reserver" variant="primary">
            Réserver
          </Button>
          </div>
          
          <div>
          <Button href="/logn" variant="primary">
            Login
          </Button>
          </div>

          <div>
          <Button href="/register" variant="outline">
            Register
          </Button>
          </div>
          </div>

        </div>
        
        <button 
          className="md:hidden text-gray-700" 
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        menuItems={menuItems} 
        onClose={handleMobileMenuClose}
      />
    </header>
  );
};

export default Header;