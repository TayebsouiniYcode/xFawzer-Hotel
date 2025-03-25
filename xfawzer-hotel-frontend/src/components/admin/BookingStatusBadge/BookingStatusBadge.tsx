import React from 'react';
import { BookingStatus } from '../../../types/booking.types';

export interface BookingStatusBadgeProps {
  status: BookingStatus;
}

const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          label: 'Confirmée'
        };
      case 'pending':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          label: 'En attente'
        };
      case 'checked-in':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          label: 'Enregistrée'
        };
      case 'checked-out':
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          label: 'Terminée'
        };
      case 'cancelled':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          label: 'Annulée'
        };
      case 'no-show':
        return {
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-800',
          label: 'Non présentée'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          label: 'Inconnu'
        };
    }
  };
  
  const { bgColor, textColor, label } = getStatusConfig(status);
  
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
      {label}
    </span>
  );
};

export default BookingStatusBadge;