import React from 'react';
import { MenuItem, SocialLink } from '../../../types/common.types';

export interface FooterProps {
  menuItems: MenuItem[];
  services: MenuItem[];
  socials: SocialLink[];
  year?: number;
}

const Footer: React.FC<FooterProps> = ({ 
  menuItems, 
  services, 
  socials,
  year = new Date().getFullYear()
}) => {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">LuxStay</h3>
            <p className="mb-4">Votre destination de luxe pour un séjour inoubliable au cœur de Youssoufia.</p>
            <div className="flex space-x-4">
              {socials.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  className="text-white hover:text-secondary transition"
                  aria-label={social.platform}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="hover:text-secondary transition">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a href={service.href} className="hover:text-secondary transition">
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="mb-4">Inscrivez-vous pour recevoir nos offres spéciales</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-800"
              />
              <button 
                type="submit" 
                className="bg-secondary text-white px-4 py-2 rounded-r-md hover:bg-yellow-600 transition"
                aria-label="S'inscrire"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p>&copy; {year} xFawzer | Tayeb SOUINI. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;