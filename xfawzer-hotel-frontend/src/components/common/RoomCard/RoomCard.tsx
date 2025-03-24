import React from 'react';
import { Room } from '../../../types/common.types';
import Button from '../Button';

export interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={room.imageUrl} alt={room.title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{room.title}</h3>
        <p className="text-gray-600 mb-4">{room.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold text-xl">€{room.price} / nuit</span>
          <Button href="#reserver" variant="primary" size="sm">
            Réserver
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;