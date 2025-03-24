import React from 'react';
import ServiceCard from '../../common/ServiceCard';
import { Service } from '../../../types/common.types';

export interface ServicesProps {
  title: string;
  services: Service[];
}

const Services: React.FC<ServicesProps> = ({ title, services }) => {
  return (
    <section id="services" className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;