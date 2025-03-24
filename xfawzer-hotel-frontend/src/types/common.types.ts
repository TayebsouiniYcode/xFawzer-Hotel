export interface Room {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
  }
  
  export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
  }
  
  export interface Testimonial {
    id: string;
    name: string;
    rating: number;
    comment: string;
    avatar: string;
  }
  
  export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
  }
  
  export interface MenuItem {
    label: string;
    href: string;
  }
  
  export interface ContactInfo {
    address: string;
    phone: string;
    email: string;
    socials: SocialLink[];
  }