import React from 'react';
import { Service } from '../../../types/common.types';

export interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="text-4xl text-secondary mb-4">
        <i className={service.icon}></i>
      </div>
      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
      <p className="text-gray-600">{service.description}</p>
    </div>
  );
};

export default ServiceCard;