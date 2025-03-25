import React from 'react';
import { FilterOptions } from '../../../types/admin.types';

export interface RoomFiltersProps {
  filters: FilterOptions;
  onFilterChange: (name: string, value: string) => void;
}

const RoomFilters: React.FC<RoomFiltersProps> = ({ filters, onFilterChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
              Type de Chambre
            </label>
            <select 
              id="roomType" 
              name="roomType"
              value={filters.roomType}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            >
              <option value="">Tous les types</option>
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
              <option value="family">Familiale</option>
              <option value="presidential">Présidentielle</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="roomStatus" className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select 
              id="roomStatus" 
              name="roomStatus"
              value={filters.roomStatus}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            >
              <option value="">Tous les statuts</option>
              <option value="available">Disponible</option>
              <option value="occupied">Occupée</option>
              <option value="maintenance">En maintenance</option>
              <option value="cleaning">En nettoyage</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="floor" className="block text-sm font-medium text-gray-700 mb-1">
              Étage
            </label>
            <select 
              id="floor" 
              name="floor"
              value={filters.floor}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            >
              <option value="">Tous les étages</option>
              <option value="1">1er étage</option>
              <option value="2">2ème étage</option>
              <option value="3">3ème étage</option>
              <option value="4">4ème étage</option>
              <option value="5">5ème étage</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomFilters;