import React from 'react';
import { RoomStatus } from '../../../types/admin.types';

export interface StatusBadgeProps {
  status: RoomStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: RoomStatus) => {
    switch (status) {
      case 'available':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          label: 'Disponible'
        };
      case 'occupied':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          label: 'Occupée'
        };
      case 'maintenance':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          label: 'En maintenance'
        };
      case 'cleaning':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          label: 'En nettoyage'
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

export default StatusBadge;