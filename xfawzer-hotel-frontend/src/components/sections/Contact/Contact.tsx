import React, { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { ContactInfo, SocialLink } from '../../../types/common.types';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactProps {
  title: string;
  contactInfo: ContactInfo;
  onSubmit?: (data: ContactFormData) => void;
}

const Contact: React.FC<ContactProps> = ({ title, contactInfo, onSubmit }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };
  
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                label="Nom"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Message"
                type="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
              />
              <Button type="submit" variant="primary">
                Envoyer
              </Button>
            </form>
          </div>
          <div>
            <div className="bg-light p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Informations</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-primary mr-3 mt-1">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <p>{contactInfo.address}</p>
                </div>
                <div className="flex items-start">
                  <div className="text-primary mr-3 mt-1">
                    <i className="fas fa-phone"></i>
                  </div>
                  <p>{contactInfo.phone}</p>
                </div>
                <div className="flex items-start">
                  <div className="text-primary mr-3 mt-1">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <p>{contactInfo.email}</p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Suivez-nous</h4>
                <div className="flex space-x-4">
                  {contactInfo.socials.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url} 
                      className="text-primary hover:text-secondary transition"
                      aria-label={social.platform}
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-lg overflow-hidden h-64">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047033371!2d2.3006659999999997!3d48.8693157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8f3049b%3A0xcbb47407434935db!2sAv.%20des%20Champs-%C3%89lys%C3%A9es%2C%20Paris%2C%20France!5e0!3m2!1sfr!2sfr!4v1635789732099!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;