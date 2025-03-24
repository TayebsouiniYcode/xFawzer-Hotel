import React from 'react';
import RoomCard from '../../common/RoomCard';
import Button from '../../common/Button';
import { Room } from '../../../types/common.types';

export interface RoomsProps {
  title: string;
  rooms: Room[];
  viewAllLink?: string;
}

const Rooms: React.FC<RoomsProps> = ({ title, rooms, viewAllLink = '#' }) => {
  return (
    <section id="chambres" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
        {viewAllLink && (
          <div className="text-center mt-10">
            <Button href={viewAllLink} variant="outline" size="lg">
              Voir toutes les chambres
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Rooms;