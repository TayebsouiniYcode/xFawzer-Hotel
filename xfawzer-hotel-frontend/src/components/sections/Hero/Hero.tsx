import React from 'react';
import Button from '../../common/Button';

export interface HeroProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <section id="accueil" className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{title}</h2>
          <p className="text-lg text-gray-600 mb-8">{subtitle}</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button href="#reserver" variant="primary" size="lg">
              Réserver maintenant
            </Button>
            <Button href="#chambres" variant="secondary" size="lg">
              Voir les chambres
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img 
            src={imageUrl} 
            alt="Chambre d'hôtel luxueuse" 
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;