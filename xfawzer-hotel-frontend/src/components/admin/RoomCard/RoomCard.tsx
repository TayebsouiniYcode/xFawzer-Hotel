import React from 'react';
import StatusBadge from '../StatusBadge';
import AmenityIcons from '../AmenityIcons';
import { RoomDetails } from '../../../types/admin.types';

export interface RoomCardProps {
  room: RoomDetails;
  onView: (roomId: string) => void;
  onEdit: (roomId: string) => void;
  onDelete: (roomId: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ 
  room,
  onView,
  onEdit,
  onDelete 
}) => {
  // Image par défaut si aucune image n'est fournie
  const defaultImage = "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative">
        <img 
          src={room.imageUrl || defaultImage} 
          alt={`Chambre ${room.number}`} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <StatusBadge status={room.status} />
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Chambre {room.number}</h3>
          <p className="text-lg font-bold text-primary">€{room.price}</p>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          {room.type.charAt(0).toUpperCase() + room.type.slice(1)} - {room.floor}ème étage
        </p>
        <div className="flex items-center mb-3">
          <i className="fas fa-user-friends text-gray-400 mr-1"></i>
          <span className="text-sm text-gray-600">
            {room.capacity} personnes - {room.bedConfigurationText}
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          <AmenityIcons amenities={room.amenities} />
        </div>
        <div className="flex justify-between">
          <button 
            className="text-primary hover:text-blue-800"
            onClick={() => onView(room.id)}
          >
            <i className="fas fa-eye mr-1"></i> Détails
          </button>
          <div className="flex space-x-2">
            <button 
              className="text-yellow-600 hover:text-yellow-900"
              onClick={() => onEdit(room.id)}
            >
              <i className="fas fa-edit"></i>
            </button>
            <button 
              className="text-red-600 hover:text-red-900"
              onClick={() => onDelete(room.id)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;