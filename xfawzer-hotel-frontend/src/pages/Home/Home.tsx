import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Hero from '../../components/sections/Hero';
import Reservation from '../../components/sections/Reservation';
import Services from '../../components/sections/Services';
import Rooms from '../../components/sections/Rooms';
import Testimonials from '../../components/sections/Testimonials';
import Contact from '../../components/sections/Contact';
import { MenuItem, Service, Room, Testimonial, ContactInfo, SocialLink } from '../../types/common.types';
import { ReservationFormData } from '../../components/sections/Reservation';
import { ContactFormData } from '../../components/sections/Contact';

import { dimmyDataRooms } from '../../DimmyData/roomsFakeData';

const Home: React.FC = () => {

    // Rooms
    const rooms : Room[] = dimmyDataRooms();
  // Menu items
  const menuItems: MenuItem[] = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Chambres', href: '#chambres' },
    { label: 'Services', href: '#services' },
    { label: 'Témoignages', href: '#temoignages' },
    { label: 'Contact', href: '#contact' },
  ];
  
  // Service links for footer
  const serviceLinks: MenuItem[] = [
    { label: 'Restaurant', href: '#' },
    { label: 'Spa & Bien-être', href: '#' },
    { label: 'Salle de Fitness', href: '#' },
    { label: 'Événements', href: '#' },
    { label: 'Conciergerie', href: '#' },
  ];
  
  // Social links
  const socialLinks: SocialLink[] = [
    { platform: 'Facebook', url: '#', icon: 'fab fa-facebook-f' },
    { platform: 'Twitter', url: '#', icon: 'fab fa-twitter' },
    { platform: 'Instagram', url: '#', icon: 'fab fa-instagram' },
    { platform: 'LinkedIn', url: '#', icon: 'fab fa-linkedin-in' },
  ];
  
  // Services
  const services: Service[] = [
    {
      id: 'wifi',
      title: 'Wi-Fi Gratuit',
      description: 'Restez connecté avec notre Wi-Fi haut débit disponible dans tout l\'hôtel.',
      icon: 'fas fa-wifi',
    },
    {
      id: 'restaurant',
      title: 'Restaurant Gastronomique',
      description: 'Savourez des plats exquis préparés par nos chefs renommés.',
      icon: 'fas fa-utensils',
    },
    {
      id: 'spa',
      title: 'Spa & Bien-être',
      description: 'Détendez-vous dans notre spa de luxe avec une gamme complète de soins.',
      icon: 'fas fa-spa',
    },
    {
      id: 'pool',
      title: 'Piscine Intérieure',
      description: 'Profitez de notre piscine chauffée avec vue panoramique.',
      icon: 'fas fa-swimming-pool',
    },
    {
      id: 'concierge',
      title: 'Service de Conciergerie',
      description: 'Notre équipe est disponible 24/7 pour répondre à tous vos besoins.',
      icon: 'fas fa-concierge-bell',
    },
    {
      id: 'valet',
      title: 'Service de Voiturier',
      description: 'Arrivez en toute simplicité avec notre service de voiturier gratuit.',
      icon: 'fas fa-car',
    },
  ];
  

  
  // Testimonials
  const testimonials: Testimonial[] = [
    {
      id: 'testimonial1',
      name: 'Sophie Martin',
      rating: 5,
      comment: '"Un séjour exceptionnel ! Le personnel était attentionné et la chambre était impeccable. Je recommande vivement cet hôtel pour un week-end romantique."',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    },
    {
      id: 'testimonial2',
      name: 'Thomas Dubois',
      rating: 4.5,
      comment: '"Le restaurant de l\'hôtel propose une cuisine raffinée et le spa est un véritable havre de paix. J\'ai passé un séjour très relaxant."',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 'testimonial3',
      name: 'Marie Leroy',
      rating: 5,
      comment: '"La vue depuis notre suite était à couper le souffle et le service de conciergerie nous a aidés à organiser des visites fantastiques. Nous reviendrons !"',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
  ];
  
  // Contact info
  const contactInfo: ContactInfo = {
    address: '123 Avenue des Champs-Élysées, 75008 Paris, France',
    phone: '+33 1 23 45 67 89',
    email: 'contact@luxstay.com',
    socials: socialLinks,
  };
  
  // Form handlers
  const handleReservationSubmit = (data: ReservationFormData) => {
    console.log('Reservation form submitted:', data);
    // Implement your reservation logic here
  };
  
  const handleContactSubmit = (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
    // Implement your contact form logic here
  };
  
  return (
    <div className="font-sans text-gray-800">
      <Header menuItems={menuItems} />
      
      <main>
        <Hero 
          title="Découvrez le luxe et le confort"
          subtitle="Réservez votre séjour de rêve dans notre hôtel de luxe et profitez d'une expérience inoubliable."
          imageUrl="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        />
        
        <Reservation onSubmit={handleReservationSubmit} />
        
        <Services 
          title="Nos Services Premium"
          services={services}
        />
        
        <Rooms 
          title="Nos Chambres"
          rooms={rooms}
        />
        
        <Testimonials 
          title="Ce que disent nos clients"
          testimonials={testimonials}
        />
        
        <Contact 
          title="Contactez-nous"
          contactInfo={contactInfo}
          onSubmit={handleContactSubmit}
        />
      </main>
      
      <Footer 
        menuItems={menuItems}
        services={serviceLinks}
        socials={socialLinks}
      />
    </div>
  );
};

export default Home;