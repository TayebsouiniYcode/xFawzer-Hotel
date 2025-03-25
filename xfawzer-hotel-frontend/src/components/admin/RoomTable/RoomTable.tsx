import React from 'react';
import StatusBadge from '../StatusBadge';
import AmenityIcons from '../AmenityIcons';
import { RoomDetails } from '../../../types/admin.types';

export interface RoomTableProps {
  rooms: RoomDetails[];
  onView: (roomId: string) => void;
  onEdit: (roomId: string) => void;
  onDelete: (roomId: string) => void;
}

const RoomTable: React.FC<RoomTableProps> = ({ 
  rooms,
  onView,
  onEdit,
  onDelete 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chambre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacité
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prix/Nuit
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Équipements
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-primary">
                      <i className="fas fa-door-open"></i>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Chambre {room.number}</div>
                      <div className="text-sm text-gray-500">{room.floor}ème étage</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{room.capacity} personnes</div>
                  <div className="text-xs text-gray-500">{room.bedConfigurationText}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">€{room.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={room.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <AmenityIcons amenities={room.amenities} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-900" 
                      title="Voir détails"
                      onClick={() => onView(room.id)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      className="text-yellow-600 hover:text-yellow-900" 
                      title="Modifier"
                      onClick={() => onEdit(room.id)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900" 
                      title="Supprimer"
                      onClick={() => onDelete(room.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomTable;